"use client";

import { HoloReveal } from "@/components/ui/HoloReveal";
import { Construction, ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

const PROJECTS = [
    {
        title: "proto-agent-ns",
        description: "AIエージェントの実装方法について学ぶためのプロトタイプ。",
        tech: ["TypeScript", "Next.js"],
        github: "https://github.com/tasteenuesu18/proto-agent-ns",
        website: "https://proto-agent-ns.vercel.app",
    }
];

export function Works() {
    return (
        <section
            id="works"
            className="relative min-h-screen w-full py-32 px-8 pointer-events-none bg-slate-950/80"
        >
            <div className="relative z-10 max-w-4xl mx-auto pointer-events-auto">
                {/* Section Header */}
                <HoloReveal className="mb-16">
                    <p className="text-cyan-400 font-mono tracking-widest text-sm mb-2">
                        02 / WORKS
                    </p>
                    <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                        Projects
                    </h2>
                </HoloReveal>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {PROJECTS.map((project, index) => (
                        <HoloReveal key={index} delay={0.2 + index * 0.1} className="w-full">
                            <div className="flex flex-col p-8 border border-cyan-500/30 bg-slate-900/60 backdrop-blur-md rounded-lg relative overflow-hidden group hover:border-cyan-400/60 transition-colors h-full">
                                {/* Security Pattern Background */}
                                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity"
                                    style={{ backgroundImage: 'radial-gradient(#22d3ee 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                                />

                                <h3 className="text-2xl font-bold text-white mb-3">
                                    {project.title}
                                </h3>

                                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tech.map(tech => (
                                        <span key={tech} className="text-xs font-mono text-cyan-300 bg-cyan-950/50 px-2 py-1 rounded border border-cyan-800">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4 mt-auto relative z-10">
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                                            <Github className="w-6 h-6" />
                                        </a>
                                    )}
                                    {project.website && (
                                        <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                                            <ExternalLink className="w-6 h-6" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </HoloReveal>
                    ))}
                </div>

                {/* Coming Soon Indicator */}
                <HoloReveal delay={0.4} className="flex justify-center">
                    <p className="text-cyan-500/50 font-mono text-sm flex items-center gap-2">
                        <span className="animate-pulse">_</span>
                        More projects loading...
                    </p>
                </HoloReveal>
            </div>
        </section>
    );
}
