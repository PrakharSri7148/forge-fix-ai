import { motion } from "framer-motion";
import {
  Bug,
  BookOpen,
  Gauge,
  Globe,
  Highlighter,
  BarChart3,
  BrainCircuit,
  Star,
} from "lucide-react";

const features = [
  { icon: Bug, title: "Error Detection", desc: "Instantly catch bugs, logic errors, and edge cases across your codebase.", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800&h=400" },
  { icon: BookOpen, title: "Code Explanation", desc: "Get line-by-line explanations of what your code does and why.", img: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800&h=400" },
  { icon: Gauge, title: "Code Optimization", desc: "Receive performance suggestions and refactored alternatives.", img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800&h=400" },
  { icon: Globe, title: "Multi-Language Support", desc: "Java, Python, JavaScript, TypeScript, C++, Go, and more.", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800&h=400" },
  { icon: Highlighter, title: "Error Highlighting", desc: "Visual inline markers pinpointing exact error locations.", img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800&h=400" },
  { icon: BarChart3, title: "Complexity Analyzer", desc: "Understand Big-O complexity with visual graphs and metrics.", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=400" },
];

const FeaturesGrid = () => {
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
            Powerful <span className="text-primary">Features</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">Everything you need to write better code, faster.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="glass-card p-6 group"
            >
              <div className="w-11 h-11 mb-4 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
