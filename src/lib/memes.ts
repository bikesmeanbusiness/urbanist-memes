import { Meme } from './types';
import { fetchGithubIssues } from './github';

export async function getAllMemes(): Promise<Meme[]> {
    return fetchGithubIssues();
}

export async function getMemeById(id: string): Promise<Meme | undefined> {
    const memes = await getAllMemes();
    return memes.find(meme => meme.id === id);
}
