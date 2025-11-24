import { getMemeById } from '@/lib/memes';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Twitter, Instagram } from 'lucide-react';
import { ShareButton } from '@/components/share-button';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function MemePage({ params }: PageProps) {
    const { id } = await params;
    const meme = await getMemeById(id);

    if (!meme) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white pb-12 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
            <header className="border-b border-gray-200 bg-white/80 px-4 py-4 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-4xl items-center gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-lg p-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Link>
                    <h1 className="truncate text-lg font-semibold">Urbanist Memes</h1>
                </div>
            </header>

            <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-2xl bg-gray-100 shadow-sm dark:bg-gray-900">
                    {/* Media Display */}
                    <div className="relative flex w-full justify-center bg-black">
                        {meme.type === 'image' && (
                            <div className="relative aspect-auto min-h-[400px] w-full max-w-full">
                                <Image
                                    src={meme.mediaUrl}
                                    alt={meme.title}
                                    width={1200}
                                    height={800}
                                    className="h-auto max-h-[80vh] w-auto object-contain mx-auto"
                                    priority
                                />
                            </div>
                        )}

                        {meme.type === 'youtube' && (
                            <div className="aspect-video w-full">
                                <iframe
                                    src={`https://www.youtube.com/embed/${meme.youtubeId}?start=${meme.startTime || 0}${meme.endTime ? `&end=${meme.endTime}` : ''}`}
                                    title={meme.title}
                                    className="h-full w-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        )}

                        {meme.type === 'social_embed' && (
                            <div className="flex min-h-[400px] w-full flex-col items-center justify-center bg-gray-50 p-8 dark:bg-gray-900">
                                {meme.screenshotUrl ? (
                                    <Image
                                        src={meme.screenshotUrl}
                                        alt={meme.title}
                                        width={800}
                                        height={600}
                                        className="max-h-[60vh] w-auto rounded-lg shadow-lg"
                                    />
                                ) : (
                                    <div className="text-center">
                                        {meme.platform === 'twitter' && <Twitter className="mx-auto mb-4 h-16 w-16 text-blue-400" />}
                                        {meme.platform === 'instagram' && <Instagram className="mx-auto mb-4 h-16 w-16 text-pink-600" />}
                                        <p className="text-lg font-medium">Content from {meme.platform}</p>
                                    </div>
                                )}
                                <a
                                    href={meme.embedUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-gray-200 transition-all hover:bg-gray-50 hover:shadow-md dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700"
                                >
                                    View Original <ExternalLink className="h-4 w-4" />
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{meme.title}</h1>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {meme.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <ShareButton />
                    </div>

                    <div className="mt-6 space-y-6 border-t border-gray-200 pt-6 dark:border-gray-800">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h3>
                            <p className="mt-2 text-lg leading-relaxed text-gray-900 dark:text-gray-100">
                                {meme.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Attribution</h3>
                                <p className="mt-1 font-medium text-gray-900 dark:text-white">{meme.attribution}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Posted On</h3>
                                <time dateTime={meme.createdAt} className="mt-1 block font-medium text-gray-900 dark:text-white">
                                    {new Date(meme.createdAt).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </time>
                            </div>
                        </div>

                        {meme.semanticMessage && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">AI Analysis</h3>
                                <div className="mt-2 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                                    <p className="text-sm text-blue-800 dark:text-blue-200">
                                        <span className="font-semibold">Message:</span> {meme.semanticMessage}
                                    </p>
                                    {meme.mood && (
                                        <p className="mt-1 text-sm text-blue-800 dark:text-blue-200">
                                            <span className="font-semibold">Mood:</span> {meme.mood}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </article>
        </main>
    );
}
