import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import { create } from "zustand";
import { Monaco } from "@monaco-editor/react";
import { CodeEditorState } from "@/types";

const getInitialState = () => {
  if (typeof window === "undefined") {
    return {
      language: "javascript",
      fontSize: 16,
      theme: "vs-dark",
    };
  }

  const savedLanguage = localStorage.getItem("editor-language") || "javascript";
  const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";
  const savedFontSize = localStorage.getItem("editor-font-size") || 16;

  return {
    language: savedLanguage,
    theme: savedTheme,
    fontSize: Number(savedFontSize),
  };
};

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
  const initialState = getInitialState();

  return {
    ...initialState,
    output: "",
    isRunning: false,
    error: null,
    editor: null,
    executionResult: null,

    getCode: () => get().editor?.getValue() || "",

    setEditor: (editor: Monaco) => {
      const savedCode = localStorage.getItem(`editor-code-${get().language}`);
      if (savedCode) editor.setValue(savedCode);
      set({ editor });
    },

    setTheme: (theme: string) => {
      localStorage.setItem("editor-theme", theme);
      set({ theme });
    },

    setFontSize: (fontSize: number) => {
      localStorage.setItem("editor-font-size", fontSize.toString());
      set({ fontSize });
    },

    setLanguage: (language: string) => {
      const currentCode = get().editor?.getValue();
      if (currentCode) {
        localStorage.setItem(`editor-code-${get().language}`, currentCode);
      }

      localStorage.setItem("editor-language", language);

      set({
        language,
        output: "",
        error: null,
      });
    },

    runCode: async () => {
      const { language, getCode } = get();
      const code = getCode();

      if (!code.trim()) {
        set({ error: "Please enter some code." });
        return;
      }

      const languageConfig = LANGUAGE_CONFIG[language];

      if (!languageConfig || !languageConfig.judge0Id) {
        set({ error: "Unsupported language selected." });
        return;
      }

      set({ isRunning: true, error: null, output: "" });

      try {
        const response = await fetch(
          "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              language_id: languageConfig.judge0Id,
              source_code: code,
            }),
          },
        );

        if (!response.ok) {
          throw new Error("Failed to execute code.");
        }

        const data = await response.json();
        console.log("Judge0 response:", data);

        // Compilation error
        if (data.compile_output) {
          const compileError = data.compile_output.trim();
          set({
            error: compileError,
            executionResult: {
              code,
              output: "",
              error: compileError,
            },
          });
          return;
        }

        // Runtime error
        if (data.stderr) {
          const runtimeError = data.stderr.trim();
          set({
            error: runtimeError,
            executionResult: {
              code,
              output: "",
              error: runtimeError,
            },
          });
          return;
        }

        // Success
        const output = (data.stdout || "").trim();

        set({
          output: output || "Program executed successfully (no output).",
          error: null,
          executionResult: {
            code,
            output,
            error: null,
          },
        });
      } catch (err) {
        console.error("Execution error:", err);

        set({
          error: "Something went wrong while executing the code.",
          executionResult: {
            code,
            output: "",
            error: "Execution failed.",
          },
        });
      } finally {
        set({ isRunning: false });
      }
    },
  };
});

export const getExecutionResult = () =>  useCodeEditorStore.getState().executionResult;