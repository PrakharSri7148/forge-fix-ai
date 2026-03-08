import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Go",
  "Rust",
  "Ruby",
  "PHP",
  "Swift",
  "Kotlin",
];

const Analyzer = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="absolute inset-0 gradient-mesh grid-pattern" />

      <div className="relative z-10 container mx-auto px-6 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-primary glow-text">FIXFORGE</span>
            <span className="text-muted-foreground ml-3 text-base font-normal">Analyzer</span>
          </h1>
        </div>

        {/* Language Select */}
        <div className="mb-6">
          <label className="block text-sm font-mono text-muted-foreground mb-2 tracking-wider uppercase">
            Language
          </label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-full max-w-xs bg-card/60 backdrop-blur-xl border-border/50 font-mono">
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
        </div>

        {/* Code Editor */}
        <div className="glass-card p-0 overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-secondary/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-3 text-xs font-mono text-muted-foreground">
                {language ? `code.${language === "python" ? "py" : language === "javascript" ? "js" : language === "typescript" ? "ts" : language === "c++" ? "cpp" : language === "c#" ? "cs" : language}` : "untitled"} — FixForge
              </span>
            </div>
          </div>

          {/* Code Area */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here..."
            spellCheck={false}
            className="w-full min-h-[400px] bg-transparent p-5 font-mono text-sm leading-7 text-foreground placeholder:text-muted-foreground/40 resize-none focus:outline-none"
          />
        </div>

        {/* Analyze Button */}
        <div className="mt-6 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            disabled={!code || !language}
            className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg glow-button text-base disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
          >
            <Sparkles className="w-5 h-5" />
            Analyze Code
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Analyzer;
