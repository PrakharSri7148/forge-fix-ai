import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  AlertTriangle,
  Sparkles,
  FileCode,
  Shield,
  BarChart3,
  Zap,
} from "lucide-react";

const demoCode = [
  { text: 'function processUsers(users) {', color: 'text-primary' },
  { text: '  var results = [];', color: 'text-foreground/80', issue: 'warning' },
  { text: '  for (let i = 0; i <= users.length; i++) {', color: 'text-foreground/80', issue: 'error' },
  { text: '    if (users[i].age == 18) {', color: 'text-foreground/80', issue: 'warning' },
  { text: '      console.log("found user");', color: 'text-foreground/80', issue: 'warning' },
  { text: '      results.push(users[i]);', color: 'text-foreground/80' },
  { text: '    }', color: 'text-foreground/80' },
  { text: '  }', color: 'text-foreground/80' },
  { text: '  return results;', color: 'text-foreground/80' },
  { text: '}', color: 'text-primary' },
];

const fixedCode = [
  { text: 'function processUsers(users: User[]): User[] {', color: 'text-primary' },
  { text: '  const results: User[] = [];', color: 'text-foreground/80', fixed: true },
  { text: '  for (let i = 0; i < users.length; i++) {', color: 'text-foreground/80', fixed: true },
  { text: '    if (users[i].age === 18) {', color: 'text-foreground/80', fixed: true },
  { text: '      results.push(users[i]);', color: 'text-foreground/80', fixed: true },
  { text: '    }', color: 'text-foreground/80' },
  { text: '  }', color: 'text-foreground/80' },
  { text: '  return results;', color: 'text-foreground/80' },
  { text: '}', color: 'text-primary' },
];

const issues = [
  { line: 2, msg: "Use 'const' instead of 'var' for immutable binding", severity: "warning" as const },
  { line: 3, msg: "Off-by-one error: i <= users.length causes out-of-bounds access", severity: "error" as const },
  { line: 4, msg: "Use strict equality (===) instead of loose equality (==)", severity: "warning" as const },
  { line: 5, msg: "Remove console.log before production deployment", severity: "warning" as const },
];

const suggestions = [
  "Add TypeScript types for function parameters and return value",
  "Consider using Array.filter() for cleaner functional approach",
  "Add input validation — check if users is null/undefined",
  "Add JSDoc documentation for better maintainability",
];

const analysisSteps = [
  { icon: FileCode, label: "Parsing abstract syntax tree" },
  { icon: Shield, label: "Running security & error analysis" },
  { icon: BarChart3, label: "Measuring cyclomatic complexity" },
  { icon: Sparkles, label: "Generating AI-powered suggestions" },
];

type Phase = "typing" | "analyzing" | "issues" | "fixing" | "result" | "restart";

const Demo = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("typing");
  const [visibleLines, setVisibleLines] = useState(0);
  const [analysisStep, setAnalysisStep] = useState(-1);
  const [visibleIssues, setVisibleIssues] = useState(0);
  const [showFixed, setShowFixed] = useState(false);
  const [fixedLines, setFixedLines] = useState(0);
  const [score, setScore] = useState(0);
  const [visibleSuggestions, setVisibleSuggestions] = useState(0);

  const restart = useCallback(() => {
    setPhase("typing");
    setVisibleLines(0);
    setAnalysisStep(-1);
    setVisibleIssues(0);
    setShowFixed(false);
    setFixedLines(0);
    setScore(0);
    setVisibleSuggestions(0);
  }, []);

  // Phase: typing code
  useEffect(() => {
    if (phase !== "typing") return;
    const timer = setInterval(() => {
      setVisibleLines((p) => {
        if (p >= demoCode.length) {
          clearInterval(timer);
          setTimeout(() => setPhase("analyzing"), 600);
          return p;
        }
        return p + 1;
      });
    }, 250);
    return () => clearInterval(timer);
  }, [phase]);

  // Phase: analyzing
  useEffect(() => {
    if (phase !== "analyzing") return;
    let step = 0;
    setAnalysisStep(0);
    const timer = setInterval(() => {
      step++;
      if (step >= analysisSteps.length) {
        clearInterval(timer);
        setAnalysisStep(analysisSteps.length);
        setTimeout(() => setPhase("issues"), 500);
        return;
      }
      setAnalysisStep(step);
    }, 900);
    return () => clearInterval(timer);
  }, [phase]);

  // Phase: showing issues
  useEffect(() => {
    if (phase !== "issues") return;
    const timer = setInterval(() => {
      setVisibleIssues((p) => {
        if (p >= issues.length) {
          clearInterval(timer);
          setTimeout(() => setPhase("fixing"), 1200);
          return p;
        }
        return p + 1;
      });
    }, 400);
    return () => clearInterval(timer);
  }, [phase]);

  // Phase: fixing
  useEffect(() => {
    if (phase !== "fixing") return;
    setShowFixed(true);
    const timer = setInterval(() => {
      setFixedLines((p) => {
        if (p >= fixedCode.length) {
          clearInterval(timer);
          setTimeout(() => setPhase("result"), 600);
          return p;
        }
        return p + 1;
      });
    }, 200);
    return () => clearInterval(timer);
  }, [phase]);

  // Phase: result
  useEffect(() => {
    if (phase !== "result") return;
    // Animate score
    let s = 0;
    const scoreTimer = setInterval(() => {
      s += 2;
      if (s >= 92) {
        clearInterval(scoreTimer);
        setScore(92);
      } else {
        setScore(s);
      }
    }, 20);
    // Animate suggestions
    const sugTimer = setInterval(() => {
      setVisibleSuggestions((p) => {
        if (p >= suggestions.length) {
          clearInterval(sugTimer);
          return p;
        }
        return p + 1;
      });
    }, 500);
    // Auto restart after showing results
    const restartTimer = setTimeout(() => setPhase("restart"), 8000);
    return () => { clearInterval(scoreTimer); clearInterval(sugTimer); clearTimeout(restartTimer); };
  }, [phase]);

  // Phase: restart
  useEffect(() => {
    if (phase !== "restart") return;
    const timer = setTimeout(restart, 800);
    return () => clearTimeout(timer);
  }, [phase, restart]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-extrabold tracking-tight">FIXFORGE</span>
          <span className="text-xs font-mono text-muted-foreground/60">/ demo</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/analyzer")}
          className="px-5 py-2 text-sm font-bold bg-primary text-primary-foreground rounded-lg"
        >
          Try It Yourself
        </motion.button>
      </div>

      {/* Full-screen demo area */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl">
          {/* Main demo card */}
          <div className="glass-card p-0 overflow-hidden w-full" style={{ minHeight: "80vh" }}>
            {/* Window chrome */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border/40">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-[hsl(var(--forge-orange))]/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-3 text-xs font-mono text-muted-foreground/60">
                  {showFixed ? "processUsers.ts — Fixed" : "processUsers.js — FixForge"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {phase !== "typing" && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`text-[10px] font-mono px-2.5 py-1 rounded-full border ${
                      phase === "result"
                        ? "bg-green-500/10 text-green-400 border-green-500/30"
                        : "bg-primary/10 text-primary border-primary/30"
                    }`}
                  >
                    {phase === "analyzing" && "Analyzing..."}
                    {phase === "issues" && "Issues Found"}
                    {phase === "fixing" && "Applying Fixes..."}
                    {phase === "result" && "Complete ✓"}
                  </motion.span>
                )}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 h-full" style={{ minHeight: "calc(80vh - 48px)" }}>
              {/* Left: Code panel */}
              <div className="border-r border-border/30 p-6 overflow-auto">
                <div className="mb-4 flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-muted-foreground/60" />
                  <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">
                    {showFixed ? "Fixed Code" : "Source Code"}
                  </span>
                </div>

                <div className="font-mono text-sm leading-7">
                  <AnimatePresence mode="wait">
                    {!showFixed ? (
                      <motion.div key="original" exit={{ opacity: 0, x: -20 }}>
                        {demoCode.map((line, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={i < visibleLines ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.15 }}
                            className={`flex items-center gap-4 rounded px-2 -mx-2 ${
                              line.issue && phase !== "typing" && visibleIssues > 0
                                ? line.issue === "error"
                                  ? "bg-destructive/10 border-l-2 border-destructive"
                                  : "bg-yellow-500/5 border-l-2 border-yellow-500/50"
                                : ""
                            }`}
                          >
                            <span className="text-muted-foreground/30 select-none w-5 text-right text-xs">{i + 1}</span>
                            <span className={line.color}>{line.text}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="fixed"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        {fixedCode.map((line, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={i < fixedLines ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.1 }}
                            className={`flex items-center gap-4 rounded px-2 -mx-2 ${
                              line.fixed ? "bg-green-500/5 border-l-2 border-green-500/40" : ""
                            }`}
                          >
                            <span className="text-muted-foreground/30 select-none w-5 text-right text-xs">{i + 1}</span>
                            <span className={line.color}>{line.text}</span>
                            {line.fixed && i < fixedLines && (
                              <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0" />
                            )}
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Typing cursor */}
                  {phase === "typing" && visibleLines < demoCode.length && (
                    <motion.div
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="inline-block w-2 h-5 bg-primary ml-11 mt-1"
                    />
                  )}
                </div>
              </div>

              {/* Right: Analysis panel */}
              <div className="p-6 overflow-auto flex flex-col gap-5">
                {/* Analysis steps */}
                <AnimatePresence>
                  {(phase === "analyzing" || phase === "issues" || phase === "fixing" || phase === "result") && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2"
                    >
                      <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">
                        Analysis Pipeline
                      </span>
                      {analysisSteps.map((step, i) => {
                        const Icon = step.icon;
                        const done = analysisStep > i || phase !== "analyzing";
                        const active = analysisStep === i && phase === "analyzing";
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.2 }}
                            className="flex items-center gap-3 text-sm"
                          >
                            {done ? (
                              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                            ) : active ? (
                              <Loader2 className="w-4 h-4 text-primary animate-spin shrink-0" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-border/50 shrink-0" />
                            )}
                            <Icon className="w-3.5 h-3.5 text-muted-foreground/50" />
                            <span className={done ? "text-muted-foreground line-through" : active ? "text-foreground" : "text-muted-foreground/40"}>
                              {step.label}
                            </span>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Issues */}
                <AnimatePresence>
                  {(phase === "issues" || phase === "fixing" || phase === "result") && visibleIssues > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2"
                    >
                      <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest flex items-center gap-2">
                        <AlertTriangle className="w-3 h-3" />
                        Issues Detected ({Math.min(visibleIssues, issues.length)})
                      </span>
                      {issues.slice(0, visibleIssues).map((issue, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`p-3 rounded-lg text-xs font-mono border ${
                            issue.severity === "error"
                              ? "bg-destructive/10 border-destructive/20 text-destructive"
                              : "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          <span className="font-bold">L{issue.line}</span> — {issue.msg}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Fix applied */}
                <AnimatePresence>
                  {(phase === "fixing" || phase === "result") && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 rounded-lg bg-primary/10 border border-primary/30"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-sm font-bold text-primary">Auto-Fix Applied</span>
                      </div>
                      <p className="text-xs text-muted-foreground font-mono">
                        4 issues resolved • var→const • bounds fix • strict equality • console removed
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Score + suggestions */}
                <AnimatePresence>
                  {phase === "result" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      {/* Score */}
                      <div className="p-5 rounded-lg bg-card border border-border/30">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">Quality Score</span>
                          <span className="text-3xl font-extrabold text-green-400">{score}<span className="text-sm text-muted-foreground/60">/100</span></span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-muted/30 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${score}%` }}
                            className="h-full rounded-full bg-green-500"
                          />
                        </div>
                      </div>

                      {/* Suggestions */}
                      <div className="space-y-2">
                        <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest flex items-center gap-2">
                          <Sparkles className="w-3 h-3" />
                          AI Suggestions
                        </span>
                        {suggestions.slice(0, visibleSuggestions).map((s, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/15 text-xs"
                          >
                            <CheckCircle2 className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                            <span className="text-foreground/80">{s}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Empty state while typing */}
                {phase === "typing" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <Sparkles className="w-10 h-10 text-primary/20 mx-auto mb-3" />
                      </motion.div>
                      <p className="text-sm text-muted-foreground/40 font-mono">Waiting for code input...</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Replay button */}
          <div className="flex justify-center mt-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={restart}
              className="px-6 py-3 text-sm font-mono text-muted-foreground border border-border/50 rounded-lg hover:border-primary/40 hover:text-foreground transition-colors"
            >
              ↻ Replay Demo
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
