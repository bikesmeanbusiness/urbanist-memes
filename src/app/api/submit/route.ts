import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Basic validation
        if (!data.title || !data.mediaUrl) {
            return NextResponse.json(
                { error: 'Title and Media URL are required' },
                { status: 400 }
            );
        }

        const payload = {
            title: `[Submission] ${data.title}`,
            body: `
### New Meme Submission

**Title**: ${data.title}
**Type**: ${data.type}
**Attribution**: ${data.attribution}
**Tags**: ${data.tags.join(', ')}
**Description**: ${data.description}

**Media URL**: ${data.mediaUrl}

\`\`\`json
${JSON.stringify(data, null, 2)}
\`\`\`
      `,
            labels: ['submission'],
        };

        const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
        const REPO_OWNER = process.env.GITHUB_REPO_OWNER || 'urbanist-memes';
        const REPO_NAME = process.env.GITHUB_REPO_NAME || 'content';

        if (GITHUB_TOKEN) {
            const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues`, {
                method: 'POST',
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('GitHub API Error:', errorText);
                throw new Error('Failed to create GitHub issue');
            }
        } else {
            console.log('--- MOCK SUBMISSION (No GITHUB_TOKEN) ---');
            console.log(JSON.stringify(payload, null, 2));
            console.log('-----------------------------------------');
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Submission error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
