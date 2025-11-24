"use client";

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export function SubmissionForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const data = {
            title: formData.get('title'),
            type: formData.get('type'),
            mediaUrl: formData.get('mediaUrl'),
            attribution: formData.get('attribution'),
            tags: (formData.get('tags') as string).split(',').map((t) => t.trim()).filter(Boolean),
            description: formData.get('description'),
        };

        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to submit');
            }

            setIsSuccess(true);
            event.currentTarget.reset();
        } catch (err) {
            setError('Something went wrong. Please try again.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isSuccess) {
        return (
            <div className="rounded-lg bg-green-50 p-6 text-center dark:bg-green-900/20">
                <h3 className="text-lg font-medium text-green-800 dark:text-green-200">Submission Received!</h3>
                <p className="mt-2 text-green-700 dark:text-green-300">
                    Thanks for contributing. Your meme has been sent to our moderation queue (GitHub Issues) for review.
                </p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-4 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                    Submit Another
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Title
                </label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
            </div>

            <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Type
                </label>
                <select
                    name="type"
                    id="type"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                >
                    <option value="image">Image URL</option>
                    <option value="youtube">YouTube Video</option>
                    <option value="social_embed">Social Media Post</option>
                </select>
            </div>

            <div>
                <label htmlFor="mediaUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Media URL / ID
                </label>
                <input
                    type="text"
                    name="mediaUrl"
                    id="mediaUrl"
                    required
                    placeholder="https://..."
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
                <p className="mt-1 text-xs text-gray-500">
                    For YouTube, you can paste the full URL or just the ID.
                </p>
            </div>

            <div>
                <label htmlFor="attribution" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Attribution (Source/Author)
                </label>
                <input
                    type="text"
                    name="attribution"
                    id="attribution"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
            </div>

            <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tags (comma separated)
                </label>
                <input
                    type="text"
                    name="tags"
                    id="tags"
                    placeholder="trains, density, walkable"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                </label>
                <textarea
                    name="description"
                    id="description"
                    rows={3}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
            </div>

            {error && (
                <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-900"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                    </>
                ) : (
                    'Submit Meme'
                )}
            </button>
        </form>
    );
}
