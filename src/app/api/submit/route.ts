import { NextResponse } from 'next/server';

const rateLimit = new Map<string, { count: number; lastReset: number }>();
const LIMIT = 5; // submissions
const WINDOW = 60 * 60 * 1000; // 1 hour

export async function POST(request: Request) {
    try {
        // Rate Limiting
        const ip = request.headers.get('x-forwarded-for') || 'unknown';
        const now = Date.now();
        const record = rateLimit.get(ip) || { count: 0, lastReset: now };

        if (now - record.lastReset > WINDOW) {
            record.count = 0;
            record.lastReset = now;
        }

        if (record.count >= LIMIT) {
            return NextResponse.json(
                { error: 'Too many submissions. Please try again later.' },
                { status: 429 }
            );
        }

        record.count++;
        rateLimit.set(ip, record);

        const data = await request.json();

        // Basic validation
        if (!data.title || !data.mediaUrl) {
            return NextResponse.json(
                { error: 'Title and Media URL are required' },
                { status: 400 }
            );
        }

        let frontmatter = `---
attribution: "${data.attribution || 'Anonymous'}"
type: "${data.type}"
`;

        if (data.type === 'youtube') {
            // Basic extraction of ID if full URL is provided
            let videoId = data.mediaUrl;
            try {
                const url = new URL(data.mediaUrl);
                if (url.hostname.includes('youtube.com')) {
                    videoId = url.searchParams.get('v');
                } else if (url.hostname.includes('youtu.be')) {
                    videoId = url.pathname.slice(1);
                }
            } catch (e) {
                // Assume it's already an ID if not a valid URL
            }
            frontmatter += `youtubeId: "${videoId}"\n`;
        } else if (data.type === 'social_embed') {
            frontmatter += `embedUrl: "${data.mediaUrl}"\n`;
            // Default platform to twitter for now, could be inferred
            frontmatter += `platform: "twitter"\n`;
        } else {
            frontmatter += `mediaUrl: "${data.mediaUrl}"\n`;
        }

        frontmatter += '---\n';

        const payload = {
            title: data.title,
            body: `${frontmatter}\n${data.description || ''}`,
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
