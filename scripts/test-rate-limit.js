const http = require('http');

const data = JSON.stringify({
    title: 'Rate Limit Test',
    type: 'image',
    mediaUrl: 'https://example.com/image.jpg',
    attribution: 'Tester',
    tags: ['test'],
    description: 'Testing rate limit'
});

function submitMeme(i) {
    return new Promise((resolve) => {
        const req = http.request({
            hostname: 'localhost',
            port: 3000,
            path: '/api/submit',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                console.log(`Attempt ${i}: Status ${res.statusCode}`);
                if (res.statusCode === 429) {
                    console.log('✓ Rate limit hit as expected!');
                }
                resolve(res.statusCode);
            });
        });

        req.on('error', (e) => {
            console.error(`Problem with request: ${e.message}`);
            resolve(500);
        });

        req.write(data);
        req.end();
    });
}

async function runTest() {
    console.log('Starting rate limit test (Limit: 5)...');

    for (let i = 1; i <= 7; i++) {
        await submitMeme(i);
        // Small delay to ensure sequential processing
        await new Promise(r => setTimeout(r, 100));
    }
}

runTest();
