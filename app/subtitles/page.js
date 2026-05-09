'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

export default function SubtitlePage() {
    const videoRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const togglePlay = async () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
        } else {
            await videoRef.current.play();
        }

        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (!videoRef.current) return;

        const current = videoRef.current.currentTime;
        const total = videoRef.current.duration || 0;

        setCurrentTime(current);
        setDuration(total);
        setProgress((current / total) * 100);
    };

    const handleSeek = (e) => {
        if (!videoRef.current) return;

        const value = Number(e.target.value);

        videoRef.current.currentTime =
            (value / 100) * videoRef.current.duration;

        setProgress(value);
    };

    const formatTime = (time) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);

        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const video = videoRef.current;

        if (!video) return;

        const handleEnded = () => setIsPlaying(false);

        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('ended', handleEnded);
        };
    }, []);

    return (
        <main className="page">
            <div className="w-full mx-auto bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
                {/* HEADER */}
                 

                {/* VIDEO */}
                <div className="relative bg-black">
                    <video
                        ref={videoRef}
                        className="w-full h-[550px] object-cover"
                        onTimeUpdate={handleTimeUpdate}
                        src="https://box.oranbyte.com/storage/daily_digests/pPV72JwZTQZ5n6vR0FeygZgNEULEIDtw9ZX1PuBL.mp4"
                    />
                </div>

                {/* CONTROLS */}
                <div className="p-6 space-y-6">
                    {/* PLAY BUTTON */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={togglePlay}
                            className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 transition"
                        >
                            {isPlaying ? (
                                <Pause size={24} />
                            ) : (
                                <Play size={24} className="ml-1" />
                            )}
                        </button>

                        <div>
                            <p className="text-sm text-gray-500">
                                Current Time
                            </p>

                            <p className="font-semibold text-gray-900">
                                {formatTime(currentTime)} /{' '}
                                {formatTime(duration)}
                            </p>
                        </div>
                    </div>

                    {/* TIMELINE */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold text-gray-800">
                                Interactive Timeline
                            </h2>

                            <span className="text-sm text-gray-500">
                                {Math.floor(progress)}%
                            </span>
                        </div>

                        <div className="relative">
                            {/* TRACK */}
                            <div className="relative h-5 flex items-center">
                                <div className="absolute w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-black rounded-full transition-all"
                                        style={{
                                            width: `${progress}%`,
                                        }}
                                    />
                                </div>

                                {/* RANGE INPUT */}
                                <input
                                    type="range"
                                    min={0}
                                    max={100}
                                    value={progress}
                                    onChange={handleSeek}
                                    className="absolute w-full opacity-0 cursor-pointer"
                                />
                            </div>

                            {/* TIME LABELS */}
                            <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <span>0:00</span>
                                <span>{formatTime(duration / 2)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}