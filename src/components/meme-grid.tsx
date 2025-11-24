import { Meme } from '@/lib/types';
import { MemeCard } from './meme-card';

interface MemeGridProps {
    memes: Meme[];
}

export function MemeGrid({ memes }: MemeGridProps) {
    if (memes.length === 0) {
        return (
            <div className="flex h-64 w-full items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 text-gray-500 dark:border-gray-700 dark:bg-gray-900">
                No memes found matching your criteria.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {memes.map((meme) => (
                <MemeCard key={meme.id} meme={meme} />
            ))}
        </div>
    );
}
