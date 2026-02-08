"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loading() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 500);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 150);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center"
                >

                    {/* Progress Bar */}
                    <div className="w-64 h-[2px] bg-cyan-900/30 relative overflow-hidden">
                        <motion.div
                            className="absolute inset-y-0 left-0 bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                            transition={{ duration: 0.1 }}
                        />
                    </div>

                    {/* Status Text */}
                    <p className="mt-4 font-mono text-xs text-cyan-400/80 tracking-widest">
                        SYSTEM INITIALIZING... {Math.round(progress)}%
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
