import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const metrics = [
  { label: "Lines of Code", value: "142" },
  { label: "Loop Count", value: "6" },
  { label: "Nesting Depth", value: "3" },
  { label: "Variable Naming", value: "Good" },
  { label: "Duplicate Code", value: "2%" },
];

const CodeQualityScore = () => {
  const [score, setScore] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const target = 7.8;
    const timer = setInterval(() => {
      current += 0.1;
      if (current >= target) {
        setScore(target);
        clearInterval(timer);
      } else {
        setScore(parseFloat(current.toFixed(1)));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [inView]);

  const circumference = 2 * Math.PI * 80;
  const offset = circumference - (score / 10) * circumference;

  return (
    <section className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Code Quality <span className="text-forge-orange">Score</span>
          </h2>
          <p className="text-muted-foreground text-lg">Real-time quality assessment for your code</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-10 max-w-2xl mx-auto text-center"
        >
          {/* Circular gauge */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 180 180">
              <circle cx="90" cy="90" r="80" fill="none" stroke="hsl(222 30% 18%)" strokeWidth="8" />
              <circle
                cx="90"
                cy="90"
                r="80"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transition: "stroke-dashoffset 0.1s ease" }}
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00D4FF" />
                  <stop offset="100%" stopColor="#FF6B35" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-foreground">{score.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground font-mono">/ 10</span>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="text-center"
              >
                <p className="text-lg font-bold text-foreground">{m.value}</p>
                <p className="text-xs text-muted-foreground font-mono">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CodeQualityScore;
