import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const codeLines = [
  { text: 'function calculateTotal(items) {', color: 'text-forge-cyan' },
  { text: '  let total = 0;', color: 'text-foreground/80' },
  { text: '  for (let i = 0; i <= items.length; i++) {', color: 'text-foreground/80', error: true },
  { text: '    total += items[i].price;', color: 'text-foreground/80' },
  { text: '  }', color: 'text-foreground/80' },
  { text: '  return total;', color: 'text-foreground/80' },
  { text: '}', color: 'text-forge-cyan' },
];

const Hero = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showError, setShowError] = useState(false);
  const [showFix, setShowFix] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= codeLines.length) {
          clearInterval(timer);
          setTimeout(() => setShowError(true), 500);
          setTimeout(() => setShowFix(true), 1800);
          return prev;
        }
        return prev + 1;
      });
    }, 300);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh grid-pattern" />
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="container relative z-10 mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-8">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-mono text-primary tracking-wider uppercase">AI-Powered Debugging</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
              <span className="text-foreground">Your AI-Powered</span>
              <br />
              <span className="text-primary glow-text">Senior Developer,</span>
              <br />
              <span className="text-foreground">On Demand.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              Paste your code. Get instant error detection, intelligent fixes, and deep insights — powered by hybrid AI architecture.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg glow-button text-base"
              >
                Try It Now — Free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border border-border text-foreground font-semibold rounded-lg hover:border-primary/50 transition-colors text-base"
              >
                View Demo
              </motion.button>
            </div>

            <p className="mt-6 text-sm font-mono text-muted-foreground tracking-wider">
              Paste. Analyze. Fix. Ship.
            </p>
          </motion.div>

          {/* Right: Code editor mock */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="glass-card p-0 overflow-hidden">
              {/* Editor toolbar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-forge-orange/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-3 text-xs font-mono text-muted-foreground">main.js — FixForge</span>
              </div>

              {/* Code area */}
              <div className="p-5 font-mono text-sm leading-7 min-h-[280px]">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={i < visibleLines ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.2 }}
                    className={`flex items-center gap-4 ${line.error && showError ? 'bg-destructive/10 -mx-5 px-5 border-l-2 border-destructive' : ''}`}
                  >
                    <span className="text-muted-foreground/40 select-none w-5 text-right text-xs">{i + 1}</span>
                    <span className={line.color}>{line.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Error detection */}
              {showError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mx-4 mb-3 p-3 rounded-lg bg-destructive/10 border border-destructive/30"
                >
                  <p className="text-xs font-mono text-destructive">
                    ⚠ Off-by-one error on line 3: <span className="text-foreground/80">i &lt;= items.length</span> should be <span className="text-forge-cyan">i &lt; items.length</span>
                  </p>
                </motion.div>
              )}

              {showFix && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mx-4 mb-4 p-3 rounded-lg bg-primary/10 border border-primary/30"
                >
                  <p className="text-xs font-mono text-primary">
                    ✓ Fix applied — Array index now bounded correctly. No runtime errors detected.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
