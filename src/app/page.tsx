"use client";

import Link from "next/link";
import Image from "next/image";
import { APP_LOGO_URL, APP_NAME } from "../../utils/constant";
import {
  ArrowRight,
  MousePointerClick,
  Workflow,
  Zap,
  GitBranch,
  Layers,
  Play,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3 font-semibold group">
          <div className="relative flex size-8 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
            <Image src={APP_LOGO_URL} alt={APP_NAME} width={20} height={20} className="relative z-10" />
            <div className="absolute inset-0 rounded-lg bg-primary/20 blur-xl opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <span className="text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">{APP_NAME}</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex hover:bg-white/5" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button size="sm" className="rounded-full shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-shadow hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]" asChild>
            <Link href="/signup">Get started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-32 pb-32 lg:pt-48 lg:pb-40">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px] opacity-50 mix-blend-screen" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <motion.div 
        style={{ y, opacity }}
        className="mx-auto flex max-w-7xl flex-col items-center px-6 text-center"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.div variants={fadeIn} className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur-md">
          <Sparkles className="size-4" />
          <span>The next generation of automation</span>
        </motion.div>
        
        <motion.h1 variants={fadeIn} className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          Build agentic workflows{" "}
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-blue-500 pb-2">
            visually
          </span>
        </motion.h1>
        
        <motion.p variants={fadeIn} className="mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
          Aurabase is a node-based drag-and-drop builder for creating, managing,
          and executing agentic workflows — no code required. Turn complex AI logic into simple visual maps.
        </motion.p>
        
        <motion.div variants={fadeIn} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Button size="lg" className="rounded-full h-12 px-8 text-base shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] hover:-translate-y-1" asChild>
            <Link href="/signup">
              Start building for free
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="rounded-full h-12 px-8 text-base border-border/50 hover:bg-white/5 transition-all hover:-translate-y-1" asChild>
            <Link href="/login">Explore docs</Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Decorative Node Canvas Mockup */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mx-auto mt-20 max-w-5xl px-6 relative"
      >
        <div className="relative rounded-2xl border border-border/50 bg-card/40 p-2 shadow-2xl backdrop-blur-xl">
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-primary/20 to-transparent opacity-20 blur-xl" />
          <div className="relative flex aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-[#0a0a0a]">
            {/* Mock Nodes */}
            <div className="absolute top-1/4 left-1/4 flex items-center gap-3 rounded-xl border border-border bg-card/80 p-3 shadow-lg backdrop-blur-sm">
              <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-500"><Zap className="size-4" /></div>
              <div>
                <p className="text-sm font-medium">Trigger</p>
                <p className="text-xs text-muted-foreground">Webhook</p>
              </div>
              <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 size-3 rounded-full border-2 border-border bg-background" />
            </div>

            {/* SVG Connection Line */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none" style={{ zIndex: 0 }}>
              <path d="M 33% 30% C 45% 30%, 45% 60%, 55% 60%" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary/50" />
              <path d="M 55% 60% L 100% 60%" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary/20 stroke-dasharray-[4,4] animate-[dash_20s_linear_infinite]" />
            </svg>

            <div className="absolute top-1/2 left-[55%] -translate-y-1/2 flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/10 p-3 shadow-[0_0_15px_rgba(168,85,247,0.15)] ring-1 ring-primary/20 backdrop-blur-sm">
              <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 size-3 rounded-full border-2 border-primary bg-background" />
              <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 size-3 rounded-full border-2 border-primary bg-background" />
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/20 text-primary"><Sparkles className="size-4" /></div>
              <div>
                <p className="text-sm font-medium">LLM Task</p>
                <p className="text-xs text-muted-foreground">Analyze Sentiment</p>
              </div>
            </div>
            
            {/* Grid background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

const steps = [
  {
    icon: MousePointerClick,
    title: "Drag & drop nodes",
    description: "Pick from a vast library of pre-built modules — triggers, automated actions, and AI models — and drop them onto your blank canvas.",
  },
  {
    icon: GitBranch,
    title: "Connect the logic",
    description: "Wire nodes together seamlessly to define your conditional workflow logic. Create branches, loop iterations, or run steps in parallel.",
  },
  {
    icon: Play,
    title: "Execute & monitor",
    description: "Run your workflow with a single click. Watch each step execute in brilliant real-time and inspect logs, inputs, and output results.",
  },
];

function HowItWorksSection() {
  return (
    <section className="relative bg-black py-32 z-10 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 mb-6 text-xs text-muted-foreground backdrop-blur-sm">
            <span>Workflow mechanics</span>
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl tracking-tight">Three steps to mastery</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We've revolutionized automation. What used to take days of coding now happens intuitively before your eyes.
          </p>
        </motion.div>
        
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative flex flex-col items-start overflow-hidden rounded-2xl border border-border/50 bg-card/30 p-8 transition-colors hover:bg-card/60 hover:border-border backdrop-blur-sm"
            >
              <div className="absolute right-0 top-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-primary/10 blur-[50px] transition-all group-hover:bg-primary/20" />
              
              <div className="relative mb-6 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary ring-1 ring-primary/20">
                <step.icon className="size-6" />
              </div>
              
              <div className="relative">
                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
                  Step {i + 1}
                </span>
                <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: Workflow,
    title: "Visual infinity canvas",
    description: "An incredibly smooth, intuitive infinite canvas where you design workflows by connecting nodes without writing a single line of code.",
    colSpan: "md:col-span-2",
  },
  {
    icon: Zap,
    title: "AI models built-in",
    description: "Native integrations with top AI models from OpenAI, Anthropic, and Google. Add supreme intelligence to any step.",
    colSpan: "md:col-span-1",
  },
  {
    icon: Layers,
    title: "Secure credential vault",
    description: "Safely isolate and manage your API keys and credentials. Seamlessly inject them into workflows without exposing secrets in plaintext.",
    colSpan: "md:col-span-1",
  },
  {
    icon: Play,
    title: "Live real-time execution",
    description: "Witness workflows run natively step-by-step with live pulsing status indicators. Debug logic faults instantly and iterate fast.",
    colSpan: "md:col-span-2",
  },
];

function FeaturesSection() {
  return (
    <section className="relative border-t border-border/20 bg-background py-32 px-6 overflow-hidden">
      <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="mx-auto max-w-7xl">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center md:text-left mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl tracking-tight">
              An arsenal of capabilities
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We've considered every detail to provide you with the most powerful logic engine wrapped in a beautifully simple interface.
            </p>
          </div>
          <Button variant="outline" className="shrink-0 rounded-full group">
            View all features
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
        
        <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl border border-border/50 bg-card/20 p-8 transition-all hover:bg-card/40 hover:shadow-xl hover:-translate-y-1 ${feature.colSpan}`}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-secondary/50 text-secondary-foreground ring-1 ring-border shadow-inner backdrop-blur-md transition-transform group-hover:scale-110">
                  <feature.icon className="size-6" />
                </div>
                <div className="mt-auto">
                  <h3 className="text-2xl font-semibold tracking-tight">{feature.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground max-w-lg text-sm sm:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="px-4 sm:px-8 mb-20">
      <div className="relative overflow-hidden rounded-[3rem] border border-border/50 bg-card/30 mx-auto max-w-7xl">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px]" />
        <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px] opacity-40 mix-blend-screen" />
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="relative z-10 flex flex-col items-center text-center px-6 py-24 sm:py-32"
        >
          <div className="mb-6 inline-flex items-center justify-center rounded-full bg-white/5 p-3 shadow-inner ring-1 ring-white/10 backdrop-blur-md">
            <Image src={APP_LOGO_URL} alt={APP_NAME} width={32} height={32} />
          </div>
          <h2 className="text-4xl font-extrabold sm:text-5xl md:text-6xl tracking-tight max-w-3xl">
            Ready to automate the future?
          </h2>
          <p className="mt-6 text-xl text-muted-foreground font-medium max-w-xl">
            Join thought leaders and builders using Aurabase to ship logical workflows entirely visually.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="rounded-full h-14 px-10 text-lg shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] hover:-translate-y-1" asChild>
              <Link href="/signup">
                Start building for free
                <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            No credit card required. Free forever on the starter plan.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/30 bg-background px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
            <Image src={APP_LOGO_URL} alt={APP_NAME} width={16} height={16} />
          </div>
          <span className="font-medium text-foreground">&copy; {new Date().getFullYear()} {APP_NAME} Inc. All rights reserved.</span>
        </div>
        <div className="flex gap-6 font-medium">
          <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Twitter</Link>
          <Link href="#" className="hover:text-foreground transition-colors">GitHub</Link>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-svh bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
