import { describe, it, expect } from 'vitest';
import { getAllMemes, getMemeById } from './memes';

describe('Meme Data Access', () => {
    it('should return all memes', async () => {
        const memes = await getAllMemes();
        expect(memes.length).toBeGreaterThan(0);
        expect(memes[0]).toHaveProperty('id');
        expect(memes[0]).toHaveProperty('type');
    });

    it('should return a meme by id', async () => {
        const meme = await getMemeById('meme-001');
        expect(meme).toBeDefined();
        expect(meme?.id).toBe('meme-001');
        expect(meme?.title).toBe('The induced demand cycle');
    });

    it('should return undefined for non-existent id', async () => {
        const meme = await getMemeById('non-existent-id');
        expect(meme).toBeUndefined();
    });

    it('should handle different meme types correctly', async () => {
        const youtubeMeme = await getMemeById('meme-002');
        expect(youtubeMeme).toBeDefined();
        if (youtubeMeme?.type === 'youtube') {
            expect(youtubeMeme.youtubeId).toBeDefined();
        } else {
            throw new Error('Expected meme-002 to be a youtube meme');
        }

        const imageMeme = await getMemeById('meme-001');
        expect(imageMeme).toBeDefined();
        if (imageMeme?.type === 'image') {
            expect(imageMeme.mediaUrl).toBeDefined();
        } else {
            throw new Error('Expected meme-001 to be an image meme');
        }
    });
});
