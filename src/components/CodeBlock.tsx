import { useState } from "react";
import { Copy, Check } from "lucide-react";

type Language = "yaml" | "json";

interface CodeBlockProps {
  code: string;
  language: Language;
  filename?: string;
  showLineNumbers?: boolean;
  showCopy?: boolean;
}

const tokenizeYaml = (code: string) => {
  return code.split("\n").map((line) => {
    const tokens: { text: string; type: string }[] = [];
    let remaining = line;

    // Comments
    if (remaining.trimStart().startsWith("#")) {
      return [{ text: line, type: "comment" }];
    }

    // Key: value pairs
    const keyMatch = remaining.match(/^(\s*)([\w-]+)(\s*:\s*)(.*)/);
    if (keyMatch) {
      const [, indent, key, colon, value] = keyMatch;
      if (indent) tokens.push({ text: indent, type: "plain" });
      tokens.push({ text: key, type: "key" });
      tokens.push({ text: colon, type: "punctuation" });

      if (value) {
        // String values
        if (value.startsWith('"') || value.startsWith("'")) {
          tokens.push({ text: value, type: "string" });
        }
        // Numbers
        else if (/^\d+(\.\d+)?[Ms]?$/.test(value.trim())) {
          tokens.push({ text: value, type: "number" });
        }
        // Booleans
        else if (/^(true|false)$/i.test(value.trim())) {
          tokens.push({ text: value, type: "boolean" });
        }
        // Variable references ${...}
        else if (value.includes("${")) {
          const parts = value.split(/(\$\{[^}]+\})/);
          parts.forEach((part) => {
            if (part.startsWith("${")) {
              tokens.push({ text: part, type: "variable" });
            } else if (part.startsWith('"') || part.startsWith("'")) {
              tokens.push({ text: part, type: "string" });
            } else if (part) {
              tokens.push({ text: part, type: "string" });
            }
          });
        }
        // Plain values
        else {
          tokens.push({ text: value, type: "value" });
        }
      }
      return tokens;
    }

    // List items (- value)
    const listMatch = remaining.match(/^(\s*)(- )(.*)/);
    if (listMatch) {
      const [, indent, dash, value] = listMatch;
      if (indent) tokens.push({ text: indent, type: "plain" });
      tokens.push({ text: dash, type: "punctuation" });

      // Check for key:value inside list item
      const innerKv = value.match(/^([\w-]+)(\s*:\s*)(.*)/);
      if (innerKv) {
        const [, k, c, v] = innerKv;
        tokens.push({ text: k, type: "key" });
        tokens.push({ text: c, type: "punctuation" });
        if (v) {
          if (v.startsWith('"') || v.startsWith("'")) {
            tokens.push({ text: v, type: "string" });
          } else if (v.includes("${")) {
            const parts = v.split(/(\$\{[^}]+\})/);
            parts.forEach((part) => {
              if (part.startsWith("${")) {
                tokens.push({ text: part, type: "variable" });
              } else if (part) {
                tokens.push({ text: part, type: "string" });
              }
            });
          } else {
            tokens.push({ text: v, type: "value" });
          }
        }
      } else {
        tokens.push({ text: value, type: "value" });
      }
      return tokens;
    }

    // Control flow keywords at line start
    const controlMatch = remaining.match(/^(\s*)(if|then|else|forEach|when|halt)(\s*:\s*)(.*)/);
    if (controlMatch) {
      const [, indent, keyword, colon, value] = controlMatch;
      if (indent) tokens.push({ text: indent, type: "plain" });
      tokens.push({ text: keyword, type: "keyword" });
      tokens.push({ text: colon, type: "punctuation" });
      if (value) {
        if (value.includes("${")) {
          const parts = value.split(/(\$\{[^}]+\})/);
          parts.forEach((part) => {
            if (part.startsWith("${")) {
              tokens.push({ text: part, type: "variable" });
            } else if (part) {
              tokens.push({ text: part, type: "value" });
            }
          });
        } else {
          tokens.push({ text: value, type: "value" });
        }
      }
      return tokens;
    }

    return [{ text: line, type: "plain" }];
  });
};

const tokenizeJson = (code: string) => {
  return code.split("\n").map((line) => {
    const tokens: { text: string; type: string }[] = [];

    // Match JSON key-value patterns
    const kvMatch = line.match(/^(\s*)"([^"]+)"(\s*:\s*)(.*)/);
    if (kvMatch) {
      const [, indent, key, colon, value] = kvMatch;
      if (indent) tokens.push({ text: indent, type: "plain" });
      tokens.push({ text: `"${key}"`, type: "key" });
      tokens.push({ text: colon, type: "punctuation" });

      const trimmed = value.replace(/,\s*$/, "");
      const trailing = value.slice(trimmed.length);

      if (trimmed.startsWith('"')) {
        tokens.push({ text: trimmed, type: "string" });
      } else if (/^\d+(\.\d+)?$/.test(trimmed)) {
        tokens.push({ text: trimmed, type: "number" });
      } else if (/^(true|false|null)$/.test(trimmed)) {
        tokens.push({ text: trimmed, type: "boolean" });
      } else {
        tokens.push({ text: trimmed, type: "value" });
      }
      if (trailing) tokens.push({ text: trailing, type: "punctuation" });
      return tokens;
    }

    // Braces/brackets
    if (/^\s*[{}\[\]],?\s*$/.test(line)) {
      return [{ text: line, type: "punctuation" }];
    }

    return [{ text: line, type: "plain" }];
  });
};

const tokenColorMap: Record<string, string> = {
  key: "text-[#1a1a3e]",       // indigo for keys
  string: "text-[#f0a830]",     // amber for strings
  number: "text-[#e86a50]",     // coral for numbers
  boolean: "text-[#e86a50]",    // coral for booleans
  comment: "text-[#4a9a6a]",    // sage green for comments
  keyword: "text-[#1a1a3e] font-semibold", // indigo bold for keywords
  variable: "text-[#8b6cc1]",   // purple for variables
  punctuation: "text-[#6b6b7b]", // gray for punctuation
  value: "text-[#1a1a2e]",      // near-black for plain values
  plain: "text-[#1a1a2e]",      // near-black default
};

const CodeBlock = ({ code, language, filename, showLineNumbers = true, showCopy = true }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = language === "yaml" ? tokenizeYaml(code) : tokenizeJson(code);

  return (
    <div className="rounded-lg overflow-hidden border border-[#e0dcd7]">
      {filename && (
        <div className="bg-primary text-primary-foreground px-4 py-2 flex items-center justify-between">
          <span className="text-sm font-mono">{filename}</span>
          {showCopy && (
            <button onClick={handleCopy} className="hover:text-accent transition-colors" aria-label="Copy code">
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          )}
        </div>
      )}
      <div className="bg-white p-4 overflow-x-auto">
        <pre className="font-mono text-sm leading-relaxed">
          {lines.map((lineTokens, i) => (
            <div key={i} className="flex">
              {showLineNumbers && (
                <span className="select-none text-[#6b6b7b] text-right pr-4 min-w-[2.5rem] inline-block">{i + 1}</span>
              )}
              <code>
                {lineTokens.map((token, j) => (
                  <span key={j} className={tokenColorMap[token.type] || "text-[#1a1a2e]"}>
                    {token.text}
                  </span>
                ))}
              </code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
