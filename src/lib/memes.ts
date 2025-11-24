import { Meme } from './types';
import memesData from '@/data/memes.json';

// In a real app, this would query a database.
// For now, we cast the JSON data to our Meme type.
const memes: Meme[] = memesData as Meme[];

export async function getAllMemes(): Promise<Meme[]> {
    // Simulate network delay
    // await new Promise(resolve => setTimeout(resolve, 100));
    return memes;
}

export async function getMemeById(id: string): Promise<Meme | undefined> {
    // await new Promise(resolve => setTimeout(resolve, 100));
    return memes.find(meme => meme.id === id);
}
