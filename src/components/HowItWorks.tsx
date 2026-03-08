import { motion } from "framer-motion";
import { Code, Cpu, Wrench, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Code,
    title: "Paste Code",
    description: "Drop your code snippet in any language — Java, Python, JavaScript, and more.",
  },
  {
    icon: Cpu,
    title: "AI Analyzes",
    description: "Our hybrid LLM + ML engine scans for bugs, complexity issues, and code smells.",
  },
  {
    icon: Wrench,
    title: "Get Fix + Insights",
    description: "Receive actionable fixes, optimization tips, and a quality score instantly.",
  },
];

const HowItWorks = () => {
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
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">Three steps to better code.</p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="glass-card p-8 text-center w-72"
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>

              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 + 0.3 }}
                  className="hidden md:flex mx-4"
                >
                  <ArrowRight className="w-8 h-8 text-primary/50 animate-pulse-glow" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
