import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SubmissionForm } from '@/components/submission-form';

export default function SubmitPage() {
    return (
        <main className="min-h-screen bg-white pb-12 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
            <header className="border-b border-gray-200 bg-white/80 px-4 py-4 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-2xl items-center gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-lg p-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Link>
                    <h1 className="truncate text-lg font-semibold">Submit a Meme</h1>
                </div>
            </header>

            <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contribute to the Collection</h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Found a great urbanist meme? Submit it here! We use GitHub Issues to moderate submissions.
                        </p>
                    </div>

                    <SubmissionForm />
                </div>
            </div>
        </main>
    );
}
