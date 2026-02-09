import { useRef } from "react";
import { HoloReveal } from "@/components/ui/HoloReveal";

const TIMELINE = [
    {
        year: "2021",
        title: "Gigworksクロスアイティ株式会社 入社",
        description: "SESとして、国際派遣や物流システムの現場へ。要件定義から設計をメインに、実装も少し。とりあえず現場で必要なことは何でもやってました。",
    },
    {
        year: "Now",
        title: "ポイントSaaSサービスに従事",
        description: "大規模なポイントSaaSに関わっています。最近はメガバンクや大手企業向けの要件定義や基本設計など、上流工程がメインです。",
    },
    {
        year: "Future",
        title: "今後...",
        description: "「めんどくさい」が口癖ですが、それを理由に効率化するのは好きです。エンジニアとして、もう少し面白いことをやってみたいなと。",
    },
];

export function Profile() {
    const ref = useRef(null);
    // const isInView = useInView(ref, { once: true, amount: 0.2 }); // HoloReveal handles view detection

    return (
        <section
            id="profile"
            ref={ref}
            className="relative min-h-screen w-full py-32 px-8 overflow-hidden pointer-events-none bg-slate-950/80"
        >
            {/* Cyber Grid Background Helper */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(to right, #22d3ee 1px, transparent 1px), linear-gradient(to bottom, #22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            <div className="relative z-10 max-w-4xl mx-auto pointer-events-auto">
                {/* Section Header */}
                <HoloReveal className="mb-16">
                    <p className="text-cyan-400 font-mono tracking-widest text-sm mb-2">
                        01 / PROFILE
                    </p>
                    <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                        About Me
                    </h2>
                </HoloReveal>

                {/* Introduction */}
                <HoloReveal delay={0.2} className="mb-20 space-y-6">
                    <div className="p-6 border border-cyan-500/30 bg-slate-900/80 backdrop-blur-md rounded-lg">
                        <p className="text-lg text-gray-300 leading-relaxed font-mono">
                            &gt; status: lazy<br /><br />
                            <span className="text-cyan-400">ガジェット</span>と<span className="text-amber-400">音楽</span>が好き。
                            基本的には<span className="text-gray-400 italic">「めんどくさがり」</span>なSESエンジニアです。
                        </p>
                        <p className="text-lg text-gray-300 leading-relaxed mt-4 font-mono">
                            エンジニアっぽいことは好きですが、強いメッセージ性とかはありません。<br />
                            ここは、単純な自己紹介用ポートフォリオです。
                        </p>
                    </div>
                </HoloReveal>

                {/* Timeline */}
                <div className="relative">
                    <p className="text-sm font-mono text-cyan-500/80 mb-8 tracking-wide">
                        {"// CAREER_LOG"}
                    </p>

                    <div className="relative space-y-12 pl-8 md:pl-32 border-l border-cyan-500/20 ml-4 md:ml-0">
                        {TIMELINE.map((item, i) => (
                            <HoloReveal key={item.year} delay={0.4 + i * 0.2} className="relative">
                                {/* Year marker - Desktop */}
                                <div className="hidden md:flex absolute md:-left-36 top-1 items-center gap-4">
                                    <span className="text-cyan-400 font-mono text-base bg-slate-900/80 px-2 py-1 border border-cyan-500/30 rounded">
                                        [{item.year}]
                                    </span>
                                </div>

                                {/* Connector */}
                                <div className="absolute -left-[2.3rem] md:left-[-2.05rem] top-4 md:top-4 w-3 h-3 bg-slate-900 border border-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />

                                {/* Content */}
                                <div className="pl-4">
                                    {/* Year marker - Mobile */}
                                    <div className="flex md:hidden items-center mb-2">
                                        <span className="text-cyan-400 font-mono text-sm bg-slate-900/80 px-2 py-1 border border-cyan-500/30 rounded">
                                            [{item.year}]
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </HoloReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
