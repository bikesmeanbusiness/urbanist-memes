import Link from 'next/link';
import Image from 'next/image';
import { Meme } from '@/lib/types';
import { Play, ExternalLink, Twitter, Instagram } from 'lucide-react';

interface MemeCardProps {
    meme: Meme;
}

export function MemeCard({ meme }: MemeCardProps) {
    return (
        <Link href={`/meme/${meme.id}`} className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950">
            {/* Media Preview */}
            <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
                {meme.type === 'image' && (
                    <Image
                        src={meme.mediaUrl}
                        alt={meme.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                )}

                {meme.type === 'youtube' && (
                    <>
                        <Image
                            src={`https://img.youtube.com/vi/${meme.youtubeId}/mqdefault.jpg`}
                            alt={meme.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
                                <Play className="ml-1 h-6 w-6 text-red-600" fill="currentColor" />
                            </div>
                        </div>
                    </>
                )}

                {meme.type === 'social_embed' && (
                    <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                        {meme.screenshotUrl ? (
                            <Image
                                src={meme.screenshotUrl}
                                alt={meme.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        ) : (
                            <>
                                {meme.platform === 'twitter' && <Twitter className="mb-2 h-10 w-10 text-blue-400" />}
                                {meme.platform === 'instagram' && <Instagram className="mb-2 h-10 w-10 text-pink-600" />}
                                <span className="text-sm font-medium text-gray-500">View on {meme.platform}</span>
                            </>
                        )}
                        <div className="absolute bottom-2 right-2 rounded-full bg-white/90 p-1.5 shadow-sm">
                            <ExternalLink className="h-4 w-4 text-gray-700" />
                        </div>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
                <h3 className="mb-1 text-lg font-semibold leading-tight text-gray-900 dark:text-gray-100">
                    {meme.title}
                </h3>

                <div className="mb-3 flex flex-wrap gap-1.5">
                    {meme.tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <div className="mt-auto flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{meme.attribution}</span>
                    <time dateTime={meme.createdAt}>
                        {new Date(meme.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                        })}
                    </time>
                </div>
            </div>
        </Link>
    );
}
