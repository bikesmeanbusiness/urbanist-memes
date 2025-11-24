export type MediaType = 'image' | 'youtube' | 'social_embed';

export interface BaseMeme {
    id: string;
    title: string;
    attribution: string;
    tags: string[];
    description: string;
    createdAt: string;
    // AI fields
    semanticMessage?: string;
    mood?: string;
    visualDescription?: string;
}

export interface ImageMeme extends BaseMeme {
    type: 'image';
    mediaUrl: string;
    width?: number;
    height?: number;
}

export interface YoutubeMeme extends BaseMeme {
    type: 'youtube';
    youtubeId: string;
    startTime?: number; // seconds
    endTime?: number;   // seconds
}

export interface SocialEmbedMeme extends BaseMeme {
    type: 'social_embed';
    platform: 'twitter' | 'bluesky' | 'instagram';
    embedUrl: string;
    screenshotUrl?: string; // Fallback/preview image
}

export type Meme = ImageMeme | YoutubeMeme | SocialEmbedMeme;
