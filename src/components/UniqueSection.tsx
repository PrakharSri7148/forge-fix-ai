import { motion } from "framer-motion";
import { Brain, Eye, TrendingUp, Shield, Layers, Zap } from "lucide-react";

const bullets = [
  { icon: Brain, text: "AI Code Review with contextual understanding" },
  { icon: Eye, text: "Complexity Visualization with Big-O graphs" },
  { icon: TrendingUp, text: "Bug Prediction powered by custom ML models" },
  { icon: Shield, text: "Security vulnerability scanning" },
  { icon: Layers, text: "Multi-file cross-reference analysis" },
  { icon: Zap, text: "Real-time feedback under 2 seconds" },
];

const UniqueSection = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            What Makes Us <span className="text-forge-orange">Unique</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Architecture diagram */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            <h3 className="font-bold text-lg mb-6 text-center text-muted-foreground">Hybrid AI Architecture</h3>
            <div className="flex flex-col items-center gap-4">
              {/* Input */}
              <div className="px-6 py-3 rounded-lg bg-muted/60 border border-border font-mono text-sm text-center w-full max-w-xs">
                Your Code Input
              </div>
              <div className="w-0.5 h-8 bg-primary/40" />
              {/* Processing */}
              <div className="flex gap-4 w-full max-w-sm">
                <div className="flex-1 p-4 rounded-lg bg-primary/10 border border-primary/30 text-center">
                  <Brain className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs font-mono text-primary">LLM Engine</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Claude API</p>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-0.5 bg-forge-orange/50" />
                </div>
                <div className="flex-1 p-4 rounded-lg bg-forge-orange/10 border border-forge-orange/30 text-center">
                  <TrendingUp className="w-6 h-6 text-forge-orange mx-auto mb-2" />
                  <p className="text-xs font-mono text-forge-orange">ML Model</p>
                  <p className="text-[10px] text-muted-foreground mt-1">scikit-learn</p>
                </div>
              </div>
              <div className="w-0.5 h-8 bg-primary/40" />
              {/* Output */}
              <div className="px-6 py-3 rounded-lg bg-primary/10 border border-primary/30 font-mono text-sm text-center text-primary w-full max-w-xs">
                Fixes + Insights + Score
              </div>
            </div>
          </motion.div>

          {/* Bullet list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <h3 className="text-2xl font-bold mb-8">Advanced Capabilities</h3>
            {bullets.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <b.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-foreground/90">{b.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UniqueSection;
