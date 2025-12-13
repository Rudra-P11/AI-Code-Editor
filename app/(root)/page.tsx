"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github, Code2, Brain, Terminal } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";

export default function Home() {

  return (
    <div className="relative w-full overflow-hidden bg-white dark:bg-black">
      <style>{`
        @keyframes reveal-up {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float-subtle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(8px); }
        }
        
        .scroll-reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .scroll-reveal.in-view {
          opacity: 1;
          transform: translateY(0);
        }
        
        .float-subtle {
          animation: float-subtle 4s ease-in-out infinite;
        }
      `}
      </style>

      {/* HERO - ASYMMETRIC LAYOUT */}
      <section className="relative min-h-screen flex items-center px-6 sm:px-8 lg:px-12 py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-slate-400/5 rounded-full blur-3xl -mb-32" />
        
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* LEFT SIDE */}
          <div className="max-w-2xl space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight">
                Code,<br />run,<br />collaborate
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground font-medium leading-relaxed max-w-xl">
                A browser-based IDE for modern development. Write, execute, and share code instantly without setup.
              </p>
            </div>

            <div className="flex gap-3 items-center">
              <Link href="/dashboard">
                <Button size="lg" className="font-semibold">
                  Launch IDE
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="font-semibold">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
              </a>
            </div>
          </div>

          {/* RIGHT SIDE - 3D INSPIRED VISUAL */}
          <div className="relative hidden lg:block h-full min-h-[500px]">
            <style>{`
              @keyframes float-3d {
                0%, 100% { transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0); }
                25% { transform: perspective(1000px) rotateX(5deg) rotateY(-5deg) translateZ(20px); }
                50% { transform: perspective(1000px) rotateX(0deg) rotateY(10deg) translateZ(30px); }
                75% { transform: perspective(1000px) rotateX(-5deg) rotateY(5deg) translateZ(20px); }
              }
              .float-3d-box {
                animation: float-3d 6s ease-in-out infinite;
              }
            `}
            </style>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="float-3d-box w-80 h-96 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg shadow-2xl border border-slate-700 overflow-hidden">
                {/* Terminal window effect */}
                <div className="bg-slate-950 border-b border-slate-700 px-4 py-3 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="p-6 text-slate-300 font-mono text-sm space-y-2 h-full overflow-hidden">
                  <div className="text-green-400">$ npm run dev</div>
                  <div className="text-slate-500">Starting development server...</div>
                  <div className="mt-4" />
                  <div className="text-slate-400">✓ Ready on port 3000</div>
                  <div className="text-slate-400">✓ Files compiled successfully</div>
                  <div className="text-slate-400">✓ WebContainer initialized</div>
                  <div className="mt-6 flex gap-2">
                    <span className="text-blue-400">▶</span>
                    <span className="animate-pulse">Running your code...</span>
                  </div>
                </div>
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-slate-500/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* SCROLL REVEAL SECTION - CAPABILITIES */}
      <section className="relative py-32 px-6 sm:px-8 lg:px-12 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* LEFT SIDE - TEXT */}
            <div className="space-y-6 scroll-reveal">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Everything built-in
              </h2>
              <p className="text-muted-foreground font-medium leading-relaxed">
                No configuration needed. Open the browser and start coding with full support for multiple frameworks and languages.
              </p>
              
              <div className="space-y-4 pt-4">
                {[
                  { icon: Code2, label: "Monaco Editor", desc: "Professional-grade code editor with AI suggestions" },
                  { icon: Terminal, label: "Terminal", desc: "Interactive shell for running commands and scripts" },
                  { icon: Brain, label: "AI Assistance", desc: "Ollama-powered code completions and debugging" },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{item.label}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE - CODE BLOCK */}
            <div className="relative scroll-reveal">
              <div className="bg-slate-950 dark:bg-slate-900 rounded-lg p-6 border border-slate-800">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <pre className="text-xs sm:text-sm text-slate-300 font-mono overflow-x-auto">
{`// Your code runs instantly in the browser
function fibonacci(n) {
  return n <= 1 ? n : 
    fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));
// Output: 55`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES - ENHANCED FRAMEWORKS */}
      <section className="relative py-32 px-6 sm:px-8 lg:px-12 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Multi-framework support
          </h2>
          <p className="text-muted-foreground font-medium mb-20 max-w-2xl">
            Build with your favorite framework. Instant setup, zero configuration.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                name: "React", 
                icon: "/react.svg",
                bgColor: "#61DAFB",
                desc: "Component-driven UI",
                color: "from-blue-500/10 to-blue-400/10"
              },
              { 
                name: "Vue.js", 
                icon: "/vuejs-icon.svg",
                bgColor: "#4FC08D",
                desc: "Progressive framework",
                color: "from-green-500/10 to-green-400/10"
              },
              { 
                name: "Angular", 
                icon: "/angular-2.svg",
                bgColor: "#DD0031",
                desc: "Full-featured platform",
                color: "from-red-500/10 to-red-400/10"
              },
              { 
                name: "Next.js", 
                icon: "/nextjs-icon.svg",
                bgColor: "#000000",
                desc: "React with everything",
                color: "from-slate-500/10 to-slate-400/10"
              },
              { 
                name: "Express", 
                icon: "/expressjs-icon.svg",
                bgColor: "#000000",
                desc: "Minimal & flexible",
                color: "from-yellow-500/10 to-yellow-400/10"
              },
              { 
                name: "Hono", 
                icon: "/hono.svg",
                bgColor: "#e36002",
                desc: "Edge-first framework",
                color: "from-orange-500/10 to-orange-400/10"
              },
            ].map((framework, idx) => (
              <div
                key={idx}
                className="scroll-reveal group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${framework.color} rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-8 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 space-y-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${framework.bgColor}15` }}
                  >
                    <Image 
                      src={framework.icon} 
                      alt={framework.name}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{framework.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{framework.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                    <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                      View template →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERSECTION OBSERVER FOR SCROLL REVEALS */}
      <ScrollRevealer />
    </div>
  );
}

function ScrollRevealer() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".scroll-reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
