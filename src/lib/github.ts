import { Meme, MediaType, ImageMeme, YoutubeMeme, SocialEmbedMeme } from './types';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = process.env.GITHUB_REPO_OWNER;
const REPO_NAME = process.env.GITHUB_REPO_NAME;

if (!GITHUB_TOKEN || !REPO_OWNER || !REPO_NAME) {
    console.warn('Missing GitHub environment variables. CMS features will not work.');
}

interface GithubIssue {
    number: number;
    title: string;
    body: string;
    created_at: string;
    labels: { name: string }[];
    user: { login: string };
}

function parseFrontmatter(body: string): Record<string, any> {
    const match = body.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return {};

    const frontmatter = match[1];
    const data: Record<string, any> = {};

    frontmatter.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
            let value = valueParts.join(':').trim();
            // Remove quotes if present
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            data[key.trim()] = value;
        }
    });

    return data;
}

function parseDescription(body: string): string {
    return body.replace(/^---\n[\s\S]*?\n---/, '').trim();
}

export async function fetchGithubIssues(): Promise<Meme[]> {
    if (!GITHUB_TOKEN || !REPO_OWNER || !REPO_NAME) return [];

    try {
        const response = await fetch(
            `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues?state=open&labels=meme`,
            {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`,
                    Accept: 'application/vnd.github.v3+json',
                },
                next: { revalidate: 60 }, // Cache for 60 seconds
            }
        );

        if (!response.ok) {
            console.error(`Failed to fetch issues: ${response.statusText}`);
            return [];
        }

        const issues: GithubIssue[] = await response.json();

        return issues.map(issue => {
            const frontmatter = parseFrontmatter(issue.body);
            const description = parseDescription(issue.body);

            const baseMeme = {
                id: issue.number.toString(),
                title: issue.title,
                attribution: frontmatter.attribution || issue.user.login,
                tags: issue.labels.map(l => l.name).filter(n => n !== 'meme'),
                description: description,
                createdAt: issue.created_at,
                semanticMessage: frontmatter.semanticMessage,
                mood: frontmatter.mood,
                visualDescription: frontmatter.visualDescription,
            };

            const type = (frontmatter.type as MediaType) || 'image';

            if (type === 'youtube') {
                return {
                    ...baseMeme,
                    type: 'youtube',
                    youtubeId: frontmatter.youtubeId || '',
                    startTime: frontmatter.startTime ? parseInt(frontmatter.startTime) : undefined,
                    endTime: frontmatter.endTime ? parseInt(frontmatter.endTime) : undefined,
                } as YoutubeMeme;
            } else if (type === 'social_embed') {
                return {
                    ...baseMeme,
                    type: 'social_embed',
                    platform: frontmatter.platform || 'twitter',
                    embedUrl: frontmatter.embedUrl || '',
                    screenshotUrl: frontmatter.screenshotUrl,
                } as SocialEmbedMeme;
            } else {
                return {
                    ...baseMeme,
                    type: 'image',
                    mediaUrl: frontmatter.mediaUrl || '',
                    width: frontmatter.width ? parseInt(frontmatter.width) : undefined,
                    height: frontmatter.height ? parseInt(frontmatter.height) : undefined,
                } as ImageMeme;
            }
        });
    } catch (error) {
        console.error('Error fetching memes from GitHub:', error);
        return [];
    }
}
