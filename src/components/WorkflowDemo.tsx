import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, FileCode, AlertTriangle, Sparkles, ArrowRight } from "lucide-react";

const tasks = [
  {
    id: 1,
    status: "done" as const,
    icon: FileCode,
    title: "Paste code snippet",
    detail: "main.js — 47 lines of JavaScript",
  },
  {
    id: 2,
    status: "progress" as const,
    icon: AlertTriangle,
    title: "Analyzing for bugs & code smells",
    detail: "Scanning AST, checking complexity, running ML model...",
    subtasks: [
      "Parse abstract syntax tree",
      "Detect off-by-one errors",
      "Check variable naming conventions",
      "Measure cyclomatic complexity",
    ],
  },
  {
    id: 3,
    status: "pending" as const,
    icon: Sparkles,
    title: "Generate fixes & quality score",
    detail: "AI engine produces actionable fixes with confidence scores",
  },
];

const WorkflowDemo = () => {
  const [activeTask, setActiveTask] = useState(0);
  const [visibleSubtasks, setVisibleSubtasks] = useState(0);

  useEffect(() => {
    // Cycle through tasks
    const taskTimer = setInterval(() => {
      setActiveTask((prev) => (prev + 1) % 3);
      setVisibleSubtasks(0);
    }, 6000);

    return () => clearInterval(taskTimer);
  }, []);

  useEffect(() => {
    if (activeTask === 1) {
      const subtaskTimer = setInterval(() => {
        setVisibleSubtasks((prev) => {
          if (prev >= 4) {
            clearInterval(subtaskTimer);
            return prev;
          }
          return prev + 1;
        });
      }, 800);
      return () => clearInterval(subtaskTimer);
    }
  }, [activeTask]);

  const getTaskStatus = (taskIndex: number) => {
    if (taskIndex < activeTask) return "done";
    if (taskIndex === activeTask) return "progress";
    return "pending";
  };

  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            See It In <span className="text-primary">Action</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Watch FixForge analyze, detect, and fix — in real time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-[95vw] mx-auto"
        >
          <div className="glass-card p-0 overflow-hidden w-full">
            {/* Top bar */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-border/50">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-forge-orange/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex items-center gap-2 ml-2">
                <span className="px-3 py-1 rounded-md bg-muted/40 text-xs font-mono text-muted-foreground border border-border/40">
                  analysis.log
                </span>
                <span className="px-3 py-1 rounded-md bg-primary/10 text-xs font-mono text-primary border border-primary/30">
                  tasks.md
                </span>
              </div>
            </div>

            {/* Breadcrumb */}
            <div className="px-5 py-2.5 border-b border-border/30 flex items-center gap-2 text-xs font-mono text-muted-foreground/60">
              <span>fixforge</span>
              <ArrowRight className="w-3 h-3" />
              <span>analysis</span>
              <ArrowRight className="w-3 h-3" />
              <span className="text-muted-foreground">implementation plan</span>
            </div>

            {/* Content */}
            <div className="p-6 space-y-1">
              {/* Title */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-muted-foreground/40 font-mono text-xs w-5 text-right">1</span>
                <h3 className="text-lg font-bold text-foreground">
                  # Analysis Pipeline
                </h3>
              </div>

              {/* Tasks */}
              {tasks.map((task, i) => {
                const status = getTaskStatus(i);
                return (
                  <div key={task.id} className="mb-4">
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground/40 font-mono text-xs w-5 text-right mt-1">
                        {i + 2}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          {/* Status icon */}
                          <AnimatePresence mode="wait">
                            {status === "done" && (
                              <motion.div
                                key="done"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="shrink-0"
                              >
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                              </motion.div>
                            )}
                            {status === "progress" && (
                              <motion.div
                                key="progress"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="shrink-0"
                              >
                                <Loader2 className="w-5 h-5 text-forge-orange animate-spin" />
                              </motion.div>
                            )}
                            {status === "pending" && (
                              <motion.div key="pending" className="shrink-0">
                                <div className="w-5 h-5 rounded-full border-2 border-border/50" />
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <span
                            className={`font-semibold text-sm ${
                              status === "done"
                                ? "text-muted-foreground line-through"
                                : status === "progress"
                                ? "text-foreground"
                                : "text-muted-foreground/60"
                            }`}
                          >
                            {task.title}
                          </span>

                          {status === "progress" && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-forge-orange/10 text-forge-orange border border-forge-orange/30"
                            >
                              In Progress
                            </motion.span>
                          )}
                          {status === "done" && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/30">
                              Done
                            </span>
                          )}
                        </div>

                        <p
                          className={`text-xs font-mono mt-1 ml-8 ${
                            status === "pending" ? "text-muted-foreground/30" : "text-muted-foreground/60"
                          }`}
                        >
                          {task.detail}
                        </p>

                        {/* Subtasks for active task */}
                        {status === "progress" && task.subtasks && (
                          <div className="ml-8 mt-3 space-y-2">
                            {task.subtasks.map((sub, si) => (
                              <motion.div
                                key={si}
                                initial={{ opacity: 0, x: -10 }}
                                animate={
                                  si < visibleSubtasks
                                    ? { opacity: 1, x: 0 }
                                    : { opacity: 0, x: -10 }
                                }
                                transition={{ duration: 0.3 }}
                                className="flex items-center gap-2"
                              >
                                {si < visibleSubtasks - 1 ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                                ) : si < visibleSubtasks ? (
                                  <Loader2 className="w-3.5 h-3.5 text-primary animate-spin shrink-0" />
                                ) : (
                                  <div className="w-3.5 h-3.5 rounded-full border border-border/40 shrink-0" />
                                )}
                                <span className="text-xs text-muted-foreground/70">{sub}</span>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkflowDemo;
