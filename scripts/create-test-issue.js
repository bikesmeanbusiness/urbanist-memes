const fs = require('fs');
const path = require('path');
const https = require('https');

const envPath = path.join(__dirname, '../.env.local');

try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = {};
    envContent.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            envVars[match[1]] = match[2].trim();
        }
    });

    const token = envVars.GITHUB_TOKEN;
    const owner = envVars.GITHUB_REPO_OWNER;
    const repo = envVars.GITHUB_REPO_NAME;

    if (!token || !owner || !repo) {
        console.error('Missing GITHUB_TOKEN, GITHUB_REPO_OWNER, or GITHUB_REPO_NAME in .env.local');
        process.exit(1);
    }

    const issueData = JSON.stringify({
        title: 'Test Meme',
        body: `---
attribution: "Test User"
type: "image"
mediaUrl: "https://images.unsplash.com/photo-1542361345-89e58247f2d5?auto=format&fit=crop&w=800&q=80"
---
This is a test meme description.`,
        labels: ['meme', 'type:image']
    });

    const options = {
        hostname: 'api.github.com',
        path: `/repos/${owner}/${repo}/issues`,
        method: 'POST',
        headers: {
            'User-Agent': 'node.js',
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(issueData)
        }
    };

    const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            if (res.statusCode === 201) {
                const issue = JSON.parse(data);
                console.log(`✓ Successfully created issue #${issue.number}: ${issue.title}`);
                console.log(`  URL: ${issue.html_url}`);
            } else {
                console.error(`Failed to create issue. Status code: ${res.statusCode}`);
                console.error(`Response: ${data}`);
            }
        });
    });

    req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
    });

    req.write(issueData);
    req.end();

} catch (err) {
    console.error('Error reading .env.local:', err);
}
