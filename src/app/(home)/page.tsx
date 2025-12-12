"use client";

import { ProjectForm } from "@/modules/home/ui/components/project-form";
import { ProjectsList } from "@/modules/home/ui/components/projects-list";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Brain,
  Code,
  Rocket,
  Globe,
  Layers,
  Play,
  Star,
  Users,
  Timer,
  Database,
  Shield,
  Palette,
  Terminal,
  FileCode,
  GitBranch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

// Matrix-style falling code characters
const MATRIX_CHARS = [
  "console.log(", "function()", "=>", "const", "let", "var", "{", "}", "[", "]", 
  "if", "else", "for", "while", "return", "import", "export", "class", "extends",
  "async", "await", "try", "catch", "0", "1", "null", "true", "false", "&&", "||"
];

// Code snippets for features
const CODE_SNIPPETS = {
  instant: `// Instant Generation
const generateSite = async (prompt) => {
  const ai = new QuantroAI();
  return await ai.create({
    prompt,
    framework: 'next.js',
    deploy: true
  });
};`,
  
  smart: `// Smart AI Processing
class AIProcessor {
  analyze(input) {
    return this.neuralNet
      .process(input)
      .optimize()
      .generateCode();
  }
}`,
  
  fullStack: `// Full Stack Generation
const stack = {
  frontend: ['React', 'Next.js', 'Tailwind'],
  backend: ['Node.js', 'API Routes'],
  database: ['PostgreSQL', 'Prisma'],
  deploy: ['Vercel', 'Railway']
};`,
  
  deploy: `// Deploy Ready
const deploy = () => {
  build().then(() => {
    optimize();
    deploy.toProduction();
    console.log('🚀 Live!');
  });
};`
};

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Instant Generation",
    description: "Create complete websites in seconds",
    gradient: "from-yellow-400 to-orange-500",
    codeKey: "instant",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Smart AI",
    description: "Advanced AI understands your vision",
    gradient: "from-blue-400 to-purple-500",
    codeKey: "smart",
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Full Stack",
    description: "Complete frontend and backend",
    gradient: "from-cyan-400 to-blue-500",
    codeKey: "fullStack",
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Deploy Ready",
    description: "Production-ready code instantly",
    gradient: "from-purple-400 to-pink-500",
    codeKey: "deploy",
  },
];

const dialerFeatures = [
  {
    icon: <Code className="w-7 h-7" />,
    title: "AI Code Generation",
    description: "Advanced algorithms create perfect code",
    color: "text-green-400",
    gradient: "from-green-500 to-emerald-400",
    snippet: `// AI Code Engine
ai.generateComponent({
  type: 'dashboard',
  style: 'modern',
  responsive: true
});`
  },
  {
    icon: <Palette className="w-7 h-7" />,
    title: "Smart Design",
    description: "Intelligent UI/UX design systems",
    color: "text-purple-400",
    gradient: "from-purple-500 to-pink-400",
    snippet: `// Design System
const theme = {
  colors: ai.generatePalette(),
  components: ui.generate(),
  layout: responsive.grid()
};`
  },
  {
    icon: <Database className="w-7 h-7" />,
    title: "Database Integration",
    description: "Seamless database setup & config",
    color: "text-blue-400",
    gradient: "from-blue-500 to-cyan-400",
    snippet: `// Database Setup
const db = await setupDatabase({
  type: 'postgresql',
  orm: 'prisma',
  migrations: 'auto'
});`
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: "Security First",
    description: "Enterprise-grade security built-in",
    color: "text-red-400",
    gradient: "from-red-500 to-orange-400",
    snippet: `// Security Layer
const secure = {
  auth: 'nextauth',
  encryption: 'aes-256',
  validation: 'zod'
};`
  },
];

const stats = [
  { icon: <Users className="w-5 h-5" />, value: "50+", label: "Developers" },
  { icon: <Globe className="w-5 h-5" />, value: "70+", label: "Apps Built" },
  { icon: <Timer className="w-5 h-5" />, value: "<30s", label: "Build Time" },
  { icon: <Star className="w-5 h-5" />, value: "4.9", label: "Rating" },
];

const testimonials = [
  {
    quote: "Quantro's AI writes better code than I do!",
    author: "Navinoor, Full-Stack Dev",
    code: "const mind = blown();"
  },
  {
    quote: "From idea to deployment in under a minute.",
    author: "Raghav Yogi, Tech Lead",
    code: "deploy.time = '30s';"
  },
  {
    quote: "This is the future of web development.",
    author: "Naman, Software Architect",
    code: "future.isNow = true;"
  },
];

// Matrix Rain Component
const MatrixRain = ({ isActive }: { isActive: boolean }) => {
  const [drops, setDrops] = useState<Array<{ id: number; x: number; y: number; speed: number; char: string }>>([]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setDrops(prev => {
        const newDrops = prev
          .map(drop => ({ ...drop, y: drop.y + drop.speed }))
          .filter(drop => drop.y < window.innerHeight + 50);
        
        // Add new drops
        if (Math.random() < 0.3) {
          newDrops.push({
            id: Date.now(),
            x: Math.random() * window.innerWidth,
            y: -20,
            speed: Math.random() * 3 + 1,
            char: MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
          });
        }
        
        return newDrops;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden">
      {drops.map(drop => (
        <div
          key={drop.id}
          className="absolute text-green-400 font-mono text-sm opacity-60"
          style={{
            left: drop.x,
            top: drop.y,
            textShadow: '0 0 5px #22c55e'
          }}
        >
          {drop.char}
        </div>
      ))}
    </div>
  );
};

// Code Terminal Component
const CodeTerminal = ({ snippet, isVisible }: { snippet: string; isVisible: boolean }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setDisplayText('');
      setCurrentIndex(0);
      return;
    }

    const timer = setTimeout(() => {
      if (currentIndex < snippet.length) {
        setDisplayText(snippet.slice(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);
      }
    }, 30);

    return () => clearTimeout(timer);
  }, [currentIndex, snippet, isVisible]);

  return (
    <div className="bg-gray-900/95 border border-green-400/30 rounded-lg p-4 font-mono text-sm backdrop-blur-md">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-gray-400 ml-2">quantro-terminal</span>
      </div>
      <pre className="text-green-400 whitespace-pre-wrap">
        {displayText}
        <span className="animate-pulse">|</span>
      </pre>
    </div>
  );
};

const Page = () => {
  const [matrixActive, setMatrixActive] = useState(true);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
        {/* Matrix Code Background */}
        <MatrixRain isActive={matrixActive} />
        
        {/* Enhanced Developer Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_60%)]" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.05),transparent_50%)]" />
        
        {/* Code Pattern Overlay */}
        <div className="fixed inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.1'%3E%3Ctext x='5' y='15' font-family='monospace' font-size='8'%3E%7B%7D%3C/text%3E%3Ctext x='25' y='35' font-family='monospace' font-size='8'%3E()%3C/text%3E%3Ctext x='45' y='55' font-family='monospace' font-size='8'%3E[]%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        <div className="relative z-10">
          {/* Developer Hero Section */}
          <section className="py-20 px-6">
            <motion.div
              className="flex flex-col items-center space-y-8 max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Enhanced Developer Logo */}
           <motion.div whileHover={{ scale: 1.1 }} className="relative">
                   <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-30 animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl blur-xl opacity-40" />
                      <div className="relative bg-gray-900 p-4 rounded-2xl border border-green-400/30 ring-2 ring-green-400/20 shadow-2xl">
                               <Image
                                src="/logo.svg"
                                alt="Quantro"
                                 width={80}
                                height={80}
                                className="rounded-xl"
                                priority
                                      />
                                  </div>
                                    </motion.div>


              {/* Developer Badge */}
              <motion.div
                className="inline-flex items-center gap-2 bg-gray-900/80 border border-green-400/40 rounded-full px-8 py-4 shadow-lg backdrop-blur-md font-mono"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34,197,94,0.3)" }}
              >
                <Terminal className="w-5 h-5 text-green-400" />
                <span className="text-sm text-green-300 font-semibold tracking-wide">
                  {'<AI-Powered Development />'}
                </span>
              </motion.div>

              {/* Code-Style Main Heading */}
              <div className="text-center">
                <h1 className="text-4xl md:text-7xl font-mono font-bold leading-tight">
                  <span className="text-gray-500">{'//'}</span>
                  <span className="text-green-400">Build</span>
                  <span className="text-blue-400"> with</span>
                  <br />
                  <span className="text-purple-400">Quantro</span>
                  <span className="text-gray-500">;</span>
                </h1>
                
                {/* Typing Effect Subtitle */}
                <motion.div 
                  className="mt-6 font-mono text-lg md:text-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <span className="text-gray-500">const </span>
                  <span className="text-blue-400">future </span>
                  <span className="text-white">= </span>
                  <span className="text-yellow-400">"AI-generated websites"</span>
                  <span className="text-gray-500">;</span>
                </motion.div>
              </div>

              {/* Developer CTA */}
              <div className="flex gap-6">
                <Button 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-green-500/25 font-mono"
                  onClick={() => setMatrixActive(!matrixActive)}
                >
                  <Play className="w-5 h-5 mr-2" />
                  {matrixActive ? 'npm start' : 'npm run matrix'}
                </Button>
                <a href="/about">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-green-400/50 text-green-400 hover:bg-green-400/10 font-mono"
                >
                  <FileCode className="w-5 h-5 mr-2" />
                  View Docs
                </Button>
                </a>
              </div>
            </motion.div>
          </section>

          {/* Enhanced Project Form with Terminal Style */}
          <section className="py-10 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-900/90 backdrop-blur-md border border-green-400/30 rounded-3xl p-8 shadow-2xl ring-1 ring-green-400/20">
                <div className="flex items-center gap-2 mb-6">
                  <Terminal className="w-5 h-5 text-green-400" />
                  <span className="font-mono text-green-400">quantro@terminal:~$</span>
                </div>
                <ProjectForm />
              </div>
            </div>
          </section>

          {/* Live Code Features Section */}
          <section className="py-20 px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-mono font-bold mb-6">
                <span className="text-gray-500">{'/* '}</span>
                <span className="text-green-400">Features</span>
                <span className="text-gray-500">{' */'}</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    onHoverStart={() => setActiveFeature(index)}
                  >
                    <Card className="p-6 h-full bg-gray-900/80 border-green-400/30 backdrop-blur-md hover:border-green-400/50 transition-all duration-300 group">
                      <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.gradient} mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">{feature.icon}</div>
                      </div>
                      <h4 className="font-mono font-semibold text-lg mb-2 text-green-400">{feature.title}</h4>
                      <p className="text-gray-300 text-sm font-mono">{feature.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Live Code Display */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CodeTerminal 
                      snippet={CODE_SNIPPETS[features[activeFeature]?.codeKey as keyof typeof CODE_SNIPPETS]} 
                      isVisible={true}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* Enhanced Stats with Code Metrics */}
          <section className="py-20 px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-8 bg-gray-900/60 backdrop-blur-md border border-green-400/30 rounded-2xl shadow-xl hover:shadow-green-400/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, borderColor: "rgba(34,197,94,0.5)" }}
                >
                  <div className="text-green-400 flex justify-center mb-3">{stat.icon}</div>
                  <div className="text-3xl font-mono font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-300 font-mono">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Projects List */}
          <section className="py-20 px-6">
            <ProjectsList />
          </section>

          {/* Enhanced Developer Workflow Dialer */}
          <section className="py-40 px-6 relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative">
              <div className="text-center mb-32">
                <motion.h2 
                  className="text-6xl md:text-7xl font-mono font-bold mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                >
                  <span className="text-gray-500">{'// '}</span>
                  <span className="text-green-400">Workflow</span>
                </motion.h2>
              </div>

              {/* Code Workflow Dialer */}
              <div className="flex items-center justify-center mb-32">
                <div className="relative w-[600px] h-[600px]">
                  {/* Rotating Code Rings */}
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-40 border-2 border-green-400/60"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                    style={{
                      background: `conic-gradient(from 0deg, rgba(34,197,94,0.4), rgba(59,130,246,0.3), rgba(168,85,247,0.4), rgba(236,72,153,0.3), rgba(34,197,94,0.4))`,
                    }}
                  />

                  {/* Static Feature Cards with Code */}
                  <div className="absolute inset-0">
                    {dialerFeatures.map((feature, index) => {
                      const positions = [
                        { top: '0', left: '50%', transform: 'translate(-50%, -50%)' },
                        { top: '50%', right: '0', transform: 'translate(50%, -50%)' },
                        { bottom: '0', left: '50%', transform: 'translate(-50%, 50%)' },
                        { top: '50%', left: '0', transform: 'translate(-50%, -50%)' },
                      ];
                      
                      return (
                        <div key={index} className="absolute" style={positions[index]}>
                          <DeveloperFeatureCard feature={feature} index={index} />
                        </div>
                      );
                    })}
                  </div>

                  {/* Center Terminal Icon */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                    <motion.div 
                      className="w-28 h-28 rounded-full flex items-center justify-center shadow-2xl relative bg-gradient-to-r from-green-500 to-blue-500"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center ring-2 ring-green-400/50">
                        <Terminal className="w-9 h-9 text-green-400" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Developer Testimonials */}
          <section className="py-20 px-6 bg-gray-900/30 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-mono font-bold text-center mb-16">
                <span className="text-gray-500">{'/* '}</span>
                <span className="text-green-400">Reviews</span>
                <span className="text-gray-500">{' */'}</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className="p-8 bg-gray-800/80 backdrop-blur-md border border-green-400/30 rounded-2xl shadow-xl hover:shadow-green-400/20 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-gray-900 rounded p-3 mb-4 font-mono text-sm">
                      <span className="text-green-400">{testimonial.code}</span>
                    </div>
                    <p className="text-gray-200 mb-4 text-lg leading-relaxed">"{testimonial.quote}"</p>
                    <p className="text-sm text-green-400 font-mono">- {testimonial.author}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Developer Footer */}
          <footer className="py-16 px-6 bg-gray-900/80 border-t border-green-400/30 backdrop-blur-md">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div className="flex items-center gap-4 mb-6 md:mb-0">
                  <Terminal className="w-8 h-8 text-green-400" />
                  <span className="font-mono text-xl font-bold">Quantro</span>
                </div>
                <div className="flex gap-8 mb-6 md:mb-0 font-mono">
                  <a href="/about" className="text-gray-300 hover:text-green-400 transition-colors">docs</a>
                  <a href="/pricing" className="text-gray-300 hover:text-green-400 transition-colors">pricing</a>
                </div>
                <div className="flex items-center gap-4">
                  <Input 
                    placeholder="your@email.com" 
                    className="max-w-xs bg-gray-800/50 border-green-400/30 font-mono" 
                  />
                  <Button className="bg-green-600 hover:bg-green-700 font-mono">
                    <GitBranch className="w-4 h-4 mr-2" />
                    Subscribe
                  </Button>
                </div>
              </div>
              <div className="text-center text-sm text-gray-400 pt-8 border-t border-gray-700/50 font-mono">
                <span className="text-green-400">// </span>
                © {new Date().getFullYear()} Quantro.
                <span className="text-green-400"> //</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

// Developer Feature Card with Code Snippets - FIXED VERSION
const DeveloperFeatureCard = ({ feature, index }: { feature: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: index * 0.2 }}
    viewport={{ once: true }}
    whileHover={{ 
      scale: 1.1, 
      boxShadow: "0 0 40px rgba(34,197,94,0.4)",
    }}
    className="group"
  >
    <Card className="p-4 w-56 h-56 flex flex-col items-center justify-center text-center transition-all duration-500 shadow-2xl backdrop-blur-xl border-2 border-green-400/30 bg-gray-900/95 hover:border-green-400/60 relative overflow-hidden">
      {/* Background for better contrast */}
      <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm" />
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
        {/* Icon */}
        <div className={`mb-3 p-2.5 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg flex-shrink-0`}>
          <div className="text-white scale-90">{feature.icon}</div>
        </div>
        
        {/* Title - Fixed sizing and visibility */}
        <h4 className="font-mono font-bold text-green-300 text-sm mb-2 leading-tight text-center px-2 flex-shrink-0">
          {feature.title}
        </h4>
        
        {/* Code Snippet Preview - Fixed overflow */}
        <div className="bg-gray-950/90 border border-green-500/30 rounded-md p-2 mb-2 w-full max-w-[180px] overflow-hidden flex-shrink-0">
          <pre className="text-xs text-green-400 font-mono whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity overflow-hidden text-ellipsis">
            {feature.snippet.split('\n')[1] || feature.snippet.split('\n')[0]}
          </pre>
        </div>
        
        {/* Description - Fixed wrapping and visibility */}
        <p className="text-gray-300 text-xs font-mono leading-tight text-center px-2 overflow-hidden flex-1 flex items-center">
          <span className="line-clamp-2">
            {feature.description}
          </span>
        </p>
      </div>
    </Card>
  </motion.div>
);


export default Page;
