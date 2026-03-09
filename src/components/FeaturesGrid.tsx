import { motion } from "framer-motion";
import {
  Bug,
  BookOpen,
  Gauge,
  Globe,
  Highlighter,
  BarChart3,
} from "lucide-react";
import { useEffect, useState } from "react";

/* ── Animated mock screenshots ── */

const ErrorDetectionMock = () => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % 4), 1200);
    return () => clearInterval(t);
  }, []);
  const lines = [
    { code: "for (let i = 0; i <= arr.length; i++) {", err: true },
    { code: "  total += arr[i].price;", err: false },
    { code: "}", err: false },
    { code: "return total;", err: false },
  ];
  return (
    <div className="font-mono text-[10px] leading-5 p-3 space-y-0.5">
      {lines.map((l, i) => (
        <div key={i} className={`flex gap-2 px-1 rounded ${l.err && step >= 2 ? "bg-destructive/15 border-l-2 border-destructive" : ""}`}>
          <span className="text-muted-foreground/40 w-3 text-right select-none">{i + 1}</span>
          <span className="text-foreground/80">{l.code}</span>
        </div>
      ))}
      {step >= 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-[9px] text-destructive bg-destructive/10 rounded px-2 py-1 border border-destructive/30">
          ⚠ Off-by-one: i &lt;= arr.length → i &lt; arr.length
        </motion.div>
      )}
      {step >= 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-[9px] text-primary bg-primary/10 rounded px-2 py-1 border border-primary/30">
          ✓ Fix applied — bounds corrected
        </motion.div>
      )}
    </div>
  );
};

const CodeExplanationMock = () => {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setVisible((v) => Math.min(v + 1, 4)), 800);
    return () => clearInterval(t);
  }, []);
  const explanations = [
    { line: "const data = await fetch(url);", note: "Sends HTTP GET request to the API endpoint" },
    { line: "const json = await data.json();", note: "Parses the response body as JSON" },
    { line: "return json.results.map(transform);", note: "Transforms each result using the mapping function" },
    { line: "} catch (err) { handleError(err); }", note: "Catches network/parse errors and delegates handling" },
  ];
  return (
    <div className="font-mono text-[10px] leading-5 p-3 space-y-1">
      {explanations.slice(0, visible).map((e, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="space-y-0.5">
          <div className="text-foreground/80 flex gap-2">
            <span className="text-muted-foreground/40 w-3 text-right select-none">{i + 1}</span>
            {e.line}
          </div>
          <div className="ml-5 text-primary/70 text-[9px] italic">↳ {e.note}</div>
        </motion.div>
      ))}
    </div>
  );
};

const CodeOptimizationMock = () => {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 1500); return () => clearTimeout(t); }, []);
  return (
    <div className="font-mono text-[10px] leading-5 p-3 space-y-1">
      <div className="text-muted-foreground/60 text-[9px] mb-1">// Before — O(n²)</div>
      <div className="text-foreground/50 line-through decoration-destructive/50">{"arr.filter(x => arr.indexOf(x) === i)"}</div>
      {show && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1 mt-2">
          <div className="text-primary text-[9px]">✦ Optimized — O(n)</div>
          <div className="text-foreground/80">[...new Set(arr)]</div>
          <div className="flex gap-3 mt-2">
            <div className="text-[9px] px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary">⚡ 94% faster</div>
            <div className="text-[9px] px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary">↓ Less memory</div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const MultiLanguageMock = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % 4), 1800);
    return () => clearInterval(t);
  }, []);
  const langs = [
    { name: "Python", code: 'def hello():\n    print("Hello")' },
    { name: "TypeScript", code: 'const greet = (): void => {\n  console.log("Hello");\n};' },
    { name: "Go", code: 'func main() {\n  fmt.Println("Hello")\n}' },
    { name: "Rust", code: 'fn main() {\n  println!("Hello");\n}' },
  ];
  return (
    <div className="p-3 space-y-2">
      <div className="flex gap-1">
        {langs.map((l, i) => (
          <div key={i} className={`text-[9px] px-2 py-0.5 rounded font-mono cursor-default transition-colors ${i === active ? "bg-primary/20 text-primary border border-primary/30" : "text-muted-foreground/50"}`}>
            {l.name}
          </div>
        ))}
      </div>
      <motion.pre key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-[10px] text-foreground/80 leading-5 whitespace-pre">
        {langs[active].code}
      </motion.pre>
    </div>
  );
};

const ErrorHighlightingMock = () => {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setPulse((p) => !p), 1000);
    return () => clearInterval(t);
  }, []);
  const lines = [
    { code: "const result = getData();", mark: false },
    { code: "if (result = null) {", mark: true },
    { code: '  console.log("empty");', mark: false },
    { code: "  return undefined", mark: true },
    { code: "}", mark: false },
  ];
  return (
    <div className="font-mono text-[10px] leading-5 p-3 space-y-0.5">
      {lines.map((l, i) => (
        <div key={i} className="flex gap-2 items-center">
          <span className="text-muted-foreground/40 w-3 text-right select-none">{i + 1}</span>
          <span className={l.mark ? "text-destructive" : "text-foreground/80"}>{l.code}</span>
          {l.mark && (
            <span className={`inline-block w-1.5 h-1.5 rounded-full bg-destructive transition-opacity ${pulse ? "opacity-100" : "opacity-30"}`} />
          )}
        </div>
      ))}
      <div className="mt-2 text-[9px] text-destructive/80">
        Line 2: Assignment in condition — did you mean <span className="text-primary">===</span>?
      </div>
    </div>
  );
};

const ComplexityMock = () => {
  const bars = [85, 45, 92, 30, 65, 55, 78];
  return (
    <div className="p-3 space-y-2">
      <div className="flex items-end gap-1 h-20">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={`flex-1 rounded-t ${h > 80 ? "bg-destructive/60" : h > 50 ? "bg-primary/40" : "bg-primary/20"}`}
          />
        ))}
      </div>
      <div className="flex justify-between text-[9px] text-muted-foreground/60 font-mono">
        <span>O(1)</span><span>O(log n)</span><span>O(n)</span><span>O(n²)</span>
      </div>
      <div className="text-[9px] font-mono text-primary">Overall: O(n log n) — Acceptable</div>
    </div>
  );
};

/* ── Feature data ── */

const features = [
  { icon: Bug, title: "Error Detection", desc: "Instantly catch bugs, logic errors, and edge cases across your codebase.", Mock: ErrorDetectionMock },
  { icon: BookOpen, title: "Code Explanation", desc: "Get line-by-line explanations of what your code does and why.", Mock: CodeExplanationMock },
  { icon: Gauge, title: "Code Optimization", desc: "Receive performance suggestions and refactored alternatives.", Mock: CodeOptimizationMock },
  { icon: Globe, title: "Multi-Language Support", desc: "Java, Python, JavaScript, TypeScript, C++, Go, and more.", Mock: MultiLanguageMock },
  { icon: Highlighter, title: "Error Highlighting", desc: "Visual inline markers pinpointing exact error locations.", Mock: ErrorHighlightingMock },
  { icon: BarChart3, title: "Complexity Analyzer", desc: "Understand Big-O complexity with visual graphs and metrics.", Mock: ComplexityMock },
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="glass-card overflow-hidden group flex flex-col"
            >
              {/* Animated mock screenshot */}
              <div className="h-48 overflow-hidden relative bg-background/80 border-b border-border/30">
                {/* Fake window chrome */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-border/20">
                  <div className="w-2 h-2 rounded-full bg-destructive/50" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                  <div className="w-2 h-2 rounded-full bg-green-500/50" />
                  <span className="ml-2 text-[8px] font-mono text-muted-foreground/40">FixForge — {f.title}</span>
                </div>
                <f.Mock />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{f.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
