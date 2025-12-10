import { getAllMemes } from '@/lib/memes';
import { MemeGallery } from '@/components/meme-gallery';
import Link from 'next/link';

import { siteConfig } from '@/config/site';

export default async function Home() {
  const memes = await getAllMemes();

  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <header className="border-b border-gray-200 bg-white/80 px-4 py-6 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {siteConfig.hero.title}
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              {siteConfig.hero.subtitle}
            </p>
          </div>
          <Link
            href="/submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Submit Meme
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <MemeGallery initialMemes={memes} />
      </div>
    </main>
  );
}
