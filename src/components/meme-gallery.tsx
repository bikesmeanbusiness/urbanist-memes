"use client";

import { useState } from 'react';
import { Meme } from '@/lib/types';
import { MemeGrid } from './meme-grid';
import { Search } from 'lucide-react';

interface MemeGalleryProps {
    initialMemes: Meme[];
}

export function MemeGallery({ initialMemes }: MemeGalleryProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredMemes = initialMemes.filter((meme) => {
        const query = searchQuery.toLowerCase();
        const matchesTitle = meme.title.toLowerCase().includes(query);
        const matchesTags = meme.tags.some((tag) => tag.toLowerCase().includes(query));
        return matchesTitle || matchesTags;
    });

    return (
        <div className="space-y-8">
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search by title or tag..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400"
                />
            </div>

            <MemeGrid memes={filteredMemes} />
        </div>
    );
}
