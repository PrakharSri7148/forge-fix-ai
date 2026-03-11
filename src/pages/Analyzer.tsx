import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  Plus,
  MessageSquare,
  PanelLeftClose,
  PanelLeft,
  Trash2,
  Code2,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Copy,
  RotateCcw,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import fixforgeIcon from "@/assets/fixforge-icon.png";

const languages = [
  "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Go", "Rust", "Ruby", "PHP", "Swift", "Kotlin",
];

type AnalysisResult = {
  errors: { line: number; message: string; severity: "error" | "warning" }[];
  suggestions: string[];
  score: number;
  complexity: string;
};

type Conversation = {
  id: string;
  title: string;
  language: string;
  code: string;
  result: AnalysisResult | null;
  timestamp: Date;
};

// Mock analysis
function mockAnalyze(code: string): AnalysisResult {
  const lines = code.split("\n");
  const errors: AnalysisResult["errors"] = [];

  lines.forEach((line, i) => {
    if (line.includes("<=") && line.includes(".length"))
      errors.push({ line: i + 1, message: "Potential off-by-one error: consider using < instead of <=", severity: "error" });
    if (line.includes("== ") && !line.includes("==="))
      errors.push({ line: i + 1, message: "Use strict equality (===) instead of loose equality (==)", severity: "warning" });
    if (line.includes("var "))
      errors.push({ line: i + 1, message: "Use 'const' or 'let' instead of 'var'", severity: "warning" });
    if (line.includes("console.log"))
      errors.push({ line: i + 1, message: "Remove console.log before production", severity: "warning" });
  });

  if (errors.length === 0 && lines.length > 2) {
    errors.push({ line: Math.ceil(lines.length / 2), message: "Consider adding error handling for edge cases", severity: "warning" });
  }

  return {
    errors,
    suggestions: [
      "Add input validation for function parameters",
      "Consider using TypeScript for type safety",
      "Add JSDoc comments for better documentation",
    ].slice(0, Math.max(1, Math.floor(Math.random() * 3) + 1)),
    score: Math.max(40, 100 - errors.length * 15 + Math.floor(Math.random() * 10)),
    complexity: ["O(1)", "O(n)", "O(n log n)", "O(n²)"][Math.floor(Math.random() * 4)],
  };
}

const Analyzer = () => {
  const navigate = useNavigate();
  const { id: urlId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [typingLine, setTypingLine] = useState(-1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // When URL changes, load the conversation or reset
  useEffect(() => {
    if (urlId) {
      const conv = conversations.find((c) => c.id === urlId);
      if (conv) {
        setCode(conv.code);
        setLanguage(conv.language);
        setResult(conv.result);
        setActiveId(conv.id);
        return;
      }
    }
    // No id or not found = fresh state
    if (!urlId) {
      setCode("");
      setLanguage("");
      setResult(null);
      setActiveId(null);
    }
  }, [urlId]);

  const handleNewChat = () => {
    navigate("/analyzer");
  };

  const handleAnalyze = async () => {
    if (!code || !language) return;
    setAnalyzing(true);
    setResult(null);

    // Simulate analysis with animated steps
    await new Promise((r) => setTimeout(r, 800));
    setTypingLine(0);
    await new Promise((r) => setTimeout(r, 600));
    setTypingLine(1);
    await new Promise((r) => setTimeout(r, 500));
    setTypingLine(2);
    await new Promise((r) => setTimeout(r, 400));

    const analysisResult = mockAnalyze(code);
    setResult(analysisResult);
    setAnalyzing(false);
    setTypingLine(-1);

    const id = Date.now().toString();
    const title = code.split("\n")[0]?.slice(0, 40) || "Untitled analysis";
    const conv: Conversation = { id, title, language, code, result: analysisResult, timestamp: new Date() };
    setConversations((prev) => [conv, ...prev]);
    setActiveId(id);
    navigate(`/analyzer/${id}`, { replace: true });

    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const loadConversation = (conv: Conversation) => {
    navigate(`/analyzer/${conv.id}`);
  };

  const deleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeId === id) handleNewChat();
  };

  const getFileExt = (lang: string) => {
    const map: Record<string, string> = { python: "py", javascript: "js", typescript: "ts", "c++": "cpp", "c#": "cs" };
    return map[lang] || lang;
  };

  const scoreColor = (s: number) => (s >= 80 ? "text-green-400" : s >= 60 ? "text-yellow-400" : "text-destructive");

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* ── Sidebar ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="h-screen sticky top-0 border-r border-border/40 bg-card/50 backdrop-blur-xl flex flex-col overflow-hidden shrink-0"
          >
            {/* Sidebar header */}
            <div className="p-3 border-b border-border/30 flex items-center justify-between">
              <button onClick={() => navigate("/")} className="flex items-center gap-2">
                <img src={fixforgeLogo} alt="FixForge" className="w-7 h-7" />
                <span className="text-sm font-extrabold tracking-tight">FIXFORGE</span>
              </button>
              <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground transition-colors">
                <PanelLeftClose className="w-4 h-4" />
              </button>
            </div>

            {/* New chat button */}
            <div className="p-3">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNewChat}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border/50 hover:border-primary/40 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Analysis
              </motion.button>
            </div>

            {/* Conversation list */}
            <div className="flex-1 overflow-y-auto px-2 pb-3 space-y-0.5">
              {conversations.length === 0 ? (
                <div className="text-center py-10 px-4">
                  <Code2 className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-xs text-muted-foreground/50">No analyses yet</p>
                </div>
              ) : (
                conversations.map((conv) => (
                  <motion.button
                    key={conv.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => loadConversation(conv)}
                    className={`w-full group flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                      activeId === conv.id ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate flex-1">{conv.title}</span>
                    <button
                      onClick={(e) => deleteConversation(conv.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/20 hover:text-destructive transition-all"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </motion.button>
                ))
              )}
            </div>

            {/* Sidebar footer */}
            <div className="p-3 border-t border-border/30">
              <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest">
                <Zap className="w-3 h-3" /> Powered by FixForge AI
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-20 border-b border-border/30 bg-background/80 backdrop-blur-xl px-4 py-2.5 flex items-center gap-3">
          {!sidebarOpen && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground transition-colors"
            >
              <PanelLeft className="w-4 h-4" />
            </motion.button>
          )}
          <button onClick={() => navigate("/")} className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-mono text-muted-foreground">
            {language ? `${language} analysis` : "New analysis"}
          </span>
        </div>

        {/* Editor area */}
        <div className="flex-1 flex flex-col items-center px-4 md:px-8 py-8 max-w-4xl mx-auto w-full">
          {/* Welcome state when empty */}
          {!code && !result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="w-12 h-12 text-primary/40 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">What would you like to analyze?</h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Select a language and paste your code below. FixForge will detect errors, suggest fixes, and rate your code quality.
              </p>
            </motion.div>
          )}

          {/* Language selector */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full mb-4"
          >
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full max-w-xs bg-card/60 backdrop-blur-xl border-border/50 font-mono text-sm">
                <SelectValue placeholder="Select language..." />
              </SelectTrigger>
              <SelectContent className="bg-card border-border/50 backdrop-blur-xl">
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang.toLowerCase()} className="font-mono">
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          {/* Code editor card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="w-full glass-card p-0 overflow-hidden"
          >
            {/* Editor toolbar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/30">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="ml-3 text-[11px] font-mono text-muted-foreground/60">
                  {language ? `code.${getFileExt(language)}` : "untitled"} — FixForge
                </span>
              </div>
              <div className="flex items-center gap-1">
                {code && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => navigator.clipboard.writeText(code)}
                    className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                    title="Copy code"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </motion.button>
                )}
                {code && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => { setCode(""); setResult(null); }}
                    className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                    title="Clear"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </motion.button>
                )}
              </div>
            </div>

            {/* Line-numbered editor */}
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your code here..."
                spellCheck={false}
                className="w-full min-h-[300px] bg-transparent p-5 pl-14 font-mono text-sm leading-7 text-foreground placeholder:text-muted-foreground/30 resize-none focus:outline-none"
              />
              {/* Line numbers */}
              {code && (
                <div className="absolute top-5 left-4 select-none pointer-events-none">
                  {code.split("\n").map((_, i) => (
                    <div key={i} className="h-7 text-xs font-mono text-muted-foreground/30 text-right w-6">
                      {i + 1}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Analyze button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full mt-4 flex justify-end"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!code || !language || analyzing}
              onClick={handleAnalyze}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              {analyzing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              {analyzing ? "Analyzing..." : "Analyze Code"}
            </motion.button>
          </motion.div>

          {/* Analysis progress animation */}
          <AnimatePresence>
            {analyzing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full mt-8 space-y-3"
              >
                {["Parsing code structure...", "Running error detection...", "Generating suggestions..."].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={typingLine >= i ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3 text-sm font-mono"
                  >
                    {typingLine > i ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                    ) : typingLine === i ? (
                      <Loader2 className="w-4 h-4 text-primary animate-spin shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-border/50 shrink-0" />
                    )}
                    <span className={typingLine >= i ? "text-foreground" : "text-muted-foreground/40"}>
                      {step}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Results ── */}
          <AnimatePresence>
            {result && !analyzing && (
              <motion.div
                ref={resultRef}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full mt-8 space-y-5"
              >
                {/* Score card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="glass-card p-5 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest mb-1">Code Quality Score</p>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-4xl font-extrabold ${scoreColor(result.score)}`}>{result.score}</span>
                      <span className="text-muted-foreground/60 text-sm">/100</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest mb-1">Complexity</p>
                    <span className="text-lg font-bold text-primary">{result.complexity}</span>
                  </div>
                </motion.div>

                {/* Score bar animation */}
                <div className="glass-card p-5">
                  <div className="w-full h-2 rounded-full bg-muted/30 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.score}%` }}
                      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                      className={`h-full rounded-full ${result.score >= 80 ? "bg-green-500" : result.score >= 60 ? "bg-yellow-500" : "bg-destructive"}`}
                    />
                  </div>
                </div>

                {/* Errors */}
                {result.errors.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-5 space-y-3"
                  >
                    <h3 className="text-sm font-bold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-destructive" />
                      Issues Found ({result.errors.length})
                    </h3>
                    <div className="space-y-2">
                      {result.errors.map((err, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className={`flex items-start gap-3 p-3 rounded-lg text-sm font-mono ${
                            err.severity === "error"
                              ? "bg-destructive/10 border border-destructive/20"
                              : "bg-yellow-500/10 border border-yellow-500/20"
                          }`}
                        >
                          <span className={`text-xs px-1.5 py-0.5 rounded font-bold shrink-0 ${
                            err.severity === "error" ? "bg-destructive/20 text-destructive" : "bg-yellow-500/20 text-yellow-500"
                          }`}>
                            L{err.line}
                          </span>
                          <span className="text-foreground/80">{err.message}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Suggestions */}
                {result.suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-card p-5 space-y-3"
                  >
                    <h3 className="text-sm font-bold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      Suggestions
                    </h3>
                    <div className="space-y-2">
                      {result.suggestions.map((s, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/15 text-sm"
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground/80">{s}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom spacer */}
          <div className="h-16" />
        </div>
      </div>
    </div>
  );
};

export default Analyzer;
