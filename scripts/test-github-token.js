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

  const options = {
    hostname: 'api.github.com',
    path: `/repos/${owner}/${repo}`,
    headers: {
      'User-Agent': 'node.js',
      'Authorization': `token ${token}`
    }
  };

  const req = https.get(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log(`Successfully connected to repo: ${owner}/${repo}`);
        const repoInfo = JSON.parse(data);
        console.log(`Repo description: ${repoInfo.description}`);
        console.log('Token is valid!');
      } else {
        console.error(`Failed to connect. Status code: ${res.statusCode}`);
        console.error(`Response: ${data}`);
      }
    });
  });

  req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

} catch (err) {
  console.error('Error reading .env.local:', err);
}
