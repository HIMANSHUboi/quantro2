"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Terminal, 
  Code, 
  Coffee, 
  Lightbulb, 
  Users, 
  Zap,
  ArrowRight,
  FileCode
} from "lucide-react";
import { useEffect, useState } from "react";

const MATRIX_CHARS = [
  "console.log(", "function()", "=>", "const", "let", "var", "{", "}", "[", "]", 
  "if", "else", "for", "while", "return", "import", "export", "class", "extends",
  "async", "await", "try", "catch", "0", "1", "null", "true", "false", "&&", "||"
];

const MatrixRain = ({ isActive }: { isActive: boolean }) => {
  const [drops, setDrops] = useState<Array<{ id: number; x: number; y: number; speed: number; char: string }>>([]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setDrops(prev => {
        const newDrops = prev
          .map(drop => ({ ...drop, y: drop.y + drop.speed }))
          .filter(drop => drop.y < window.innerHeight + 50);
        
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

const CodeBlock = ({ code, title }: { code: string; title: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < code.length) {
        setDisplayText(code.slice(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [currentIndex, code]);

  return (
    <div className="bg-gray-900/95 border border-green-400/30 rounded-lg p-4 font-mono text-sm backdrop-blur-md mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-gray-400 ml-2">{title}</span>
      </div>
      <pre className="text-green-400 whitespace-pre-wrap">
        {displayText}
        <span className="animate-pulse">|</span>
      </pre>
    </div>
  );
};

export default function AboutPage() {
  const [matrixActive] = useState(true);

  const founderCode = `// About the founder
const founder = {
  name: "Himanshu Matta",
  role: "Engineering Student",
  college: "PEC Chandigarh",
  passion: ["AI", "UX Design", "Full-Stack"],
  mission: "democratize web development"
};

console.log(\`Building \${founder.mission}\`);`;

  const quantroCode = `// Why Quantro exists
const problem = {
  students: "struggle with hosting & setup",
  devs: "waste time on boilerplate",
  ideas: "die in development hell"
};

const solution = new QuantroAI({
  input: "plain language description",
  output: "production-ready code",
  time: "< 30 seconds"
});

return solution.solve(problem);`;

  return (
    <main className="min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* Matrix Code Background */}
      <MatrixRain isActive={matrixActive} />
      
      {/* Enhanced Developer Background (same as root) */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_60%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.05),transparent_50%)]" />
      
      {/* Code Pattern Overlay */}
      <div className="fixed inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.1'%3E%3Ctext x='5' y='15' font-family='monospace' font-size='8'%3E%7B%7D%3C/text%3E%3Ctext x='25' y='35' font-family='monospace' font-size='8'%3E()%3C/text%3E%3Ctext x='45' y='55' font-family='monospace' font-size='8'%3E[]%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="relative z-10">
        {/* Developer-Style Header */}
        <section className="py-20 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Terminal Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-gray-900/80 border border-green-400/40 rounded-full px-6 py-3 shadow-lg backdrop-blur-md font-mono mb-8"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34,197,94,0.3)" }}
            >
              <FileCode className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-300 font-semibold">
                {'<about.tsx />'}
              </span>
            </motion.div>

            {/* Code-Style Heading */}
            <h1 className="text-4xl md:text-6xl font-mono font-bold leading-tight mb-6">
              <span className="text-gray-500">{'//'}</span>
              <span className="text-green-400"> About</span>
              <span className="text-blue-400"> Quantro</span>
              <span className="text-gray-500">;</span>
            </h1>
            
            <motion.div 
              className="font-mono text-lg md:text-xl text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-gray-500">const </span>
              <span className="text-blue-400">story </span>
              <span className="text-white">= </span>
              <span className="text-yellow-400">"AI-powered revolution"</span>
              <span className="text-gray-500">;</span>
            </motion.div>
          </motion.div>
        </section>

        {/* Founder Section with Code */}
        <section className="px-6 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="max-w-6xl mx-auto p-8 bg-gray-900/80 backdrop-blur-md border border-green-400/30 shadow-2xl ring-1 ring-green-400/20">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-6">
                <Terminal className="w-5 h-5 text-green-400" />
                <span className="font-mono text-green-400">founder.profile</span>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left: Founder Info */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-full blur-xl opacity-30" />
                    <Image
                      src="/founder.jpg"
                      alt="Himanshu Matta"
                      width={180}
                      height={180}
                      className="relative rounded-full object-cover shadow-2xl ring-2 ring-green-400/30"
                    />
                  </div>
                  <div>
                    <h2 className="text-3xl font-mono font-bold mb-2 text-green-400">
                      Himanshu Matta
                    </h2>
                    <p className="text-sm text-blue-400 mb-4 font-mono">
                      Engineering Student · PEC Chandigarh
                    </p>
                    <p className="text-gray-300 leading-relaxed font-mono text-sm">
                      Passionate about democratizing web development through AI.
                      Turning complex code into simple conversations.
                    </p>
                  </div>
                </div>

                {/* Right: Code Block */}
                <div>
                  <CodeBlock code={founderCode} title="founder.js" />
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* The Vision Section */}
        <section className="px-6 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="max-w-6xl mx-auto p-8 bg-gray-900/80 backdrop-blur-md border border-green-400/30 shadow-2xl ring-1 ring-green-400/20">
              <div className="flex items-center gap-2 mb-6">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                <span className="font-mono text-green-400">vision.idea</span>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-mono font-semibold mb-4 text-green-400">
                    {'// Why Quantro?'}
                  </h3>
                  <p className="text-gray-300 leading-relaxed font-mono text-sm mb-6">
                    While debugging projects at 3 AM, I watched classmates abandon 
                    brilliant ideas because of technical barriers. Hosting configs, 
                    database schemas, responsive design—these shouldn't be roadblocks 
                    to innovation.
                  </p>
                  <p className="text-gray-300 leading-relaxed font-mono text-sm">
                    Quantro bridges that gap. Describe your vision in plain English, 
                    get production-ready code in seconds. Because your ideas deserve 
                    to ship, not die in development hell.
                  </p>
                </div>
                
                <div>
                  <CodeBlock code={quantroCode} title="quantro.solution.js" />
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* Benefits Section with Developer Focus */}
        <section className="px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="max-w-6xl mx-auto p-8 bg-gray-900/80 backdrop-blur-md border border-green-400/30 shadow-2xl ring-1 ring-green-400/20">
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="font-mono text-green-400">use-cases.map()</span>
              </div>

              <h3 className="text-2xl font-mono font-semibold mb-6 text-green-400">
                {'// Who Benefits'}
              </h3>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Individual Developers */}
                <motion.div
                  className="p-6 bg-gray-800/60 border border-green-400/20 rounded-xl hover:border-green-400/40 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <Code className="w-8 h-8 text-green-400 mb-4" />
                  <h4 className="font-mono font-bold text-green-400 mb-3">Developers</h4>
                  <p className="text-gray-300 text-sm font-mono leading-relaxed">
                    Skip boilerplate. Focus on business logic while Quantro handles 
                    UI scaffolding, database setup, and deployment configs.
                  </p>
                </motion.div>

                {/* Startups */}
                <motion.div
                  className="p-6 bg-gray-800/60 border border-blue-400/20 rounded-xl hover:border-blue-400/40 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <Zap className="w-8 h-8 text-blue-400 mb-4" />
                  <h4 className="font-mono font-bold text-blue-400 mb-3">Startups</h4>
                  <p className="text-gray-300 text-sm font-mono leading-relaxed">
                    Validate ideas faster. Generate MVPs in minutes, not months. 
                    Iterate rapidly with production-ready prototypes.
                  </p>
                </motion.div>

                {/* Students */}
                <motion.div
                  className="p-6 bg-gray-800/60 border border-purple-400/20 rounded-xl hover:border-purple-400/40 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <Coffee className="w-8 h-8 text-purple-400 mb-4" />
                  <h4 className="font-mono font-bold text-purple-400 mb-3">Students</h4>
                  <p className="text-gray-300 text-sm font-mono leading-relaxed">
                    Build portfolios, launch side projects, showcase ideas. 
                    No more wrestling with hosting and deployment complexity.
                  </p>
                </motion.div>
              </div>

              {/* Call to Action */}
              <div className="text-center border-t border-gray-700/50 pt-8">
                <div className="mb-4">
                  <span className="font-mono text-gray-400">ready to build? </span>
                  <span className="font-mono text-green-400">quantro.start()</span>
                </div>
                <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 font-mono shadow-lg hover:shadow-green-500/25 transition-all duration-300">
                  <a href="/" className="flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    npm run build
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* Developer Footer */}
        <footer className="py-16 px-6 bg-gray-900/80 border-t border-green-400/30 backdrop-blur-md">
          <div className="max-w-6xl mx-auto text-center">
            <div className="font-mono text-sm text-gray-400">
              <span className="text-green-400">// </span>
              Built with passion for developers, by a developer
              <span className="text-green-400"> //</span>
            </div>
            <div className="mt-4 font-mono text-xs text-gray-500">
              © {new Date().getFullYear()} Quantro · Making web development accessible
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
