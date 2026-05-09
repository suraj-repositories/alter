'use client';

import { useState } from 'react';

export default function YtPage() {
    const [url, setUrl] = useState('');
    const [videoId, setVideoId] = useState('');

    const handlePlay = () => {
        try {
            const parsedUrl = new URL(url);
 
            if (parsedUrl.hostname.includes('youtu.be')) {
                setVideoId(parsedUrl.pathname.replace('/', ''));
                return;
            }
 
            const id = parsedUrl.searchParams.get('v');

            if (id) {
                setVideoId(id);
            }
        } catch (error) {
            console.log('Invalid URL');
        }
    };

    return (
        <main className="page p-6">
            <div className="w-full max-w-3xl bg-white rounded-2xl card-border shadow-lg p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    YouTube Player
                </h1>

                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <input
                        type="text"
                        placeholder="Paste YouTube link..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                    />

                    <button
                        onClick={handlePlay}
                        className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
                    >
                        Play
                    </button>
                </div>

                {videoId && (
                    <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden">
                        <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title="YouTube video player"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full border-0"
                        />
                    </div>
                )}
            </div>
        </main>
    );
}