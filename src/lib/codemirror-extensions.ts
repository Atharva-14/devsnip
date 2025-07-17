import { Extension } from "@codemirror/state";

export const getLanguageExtension = async (
  language: string
): Promise<Extension | null> => {
  try {
    switch (language) {
      case "javascript":
      case "typescript":
        return (await import("@codemirror/lang-javascript")).javascript();
      case "python":
        return (await import("@codemirror/lang-python")).python();
      case "java":
        return (await import("@codemirror/lang-java")).java();
      case "cpp":
      case "c":
        return (await import("@codemirror/lang-cpp")).cpp();
      case "php":
        return (await import("@codemirror/lang-php")).php();
      case "sql":
        return (await import("@codemirror/lang-sql")).sql();
      case "rust":
        return (await import("@codemirror/lang-rust")).rust();
      case "go":
        return (await import("@codemirror/lang-go")).go();
      case "html":
        return (await import("@codemirror/lang-html")).html();
      case "css":
        return (await import("@codemirror/lang-css")).css();
      case "xml":
        return (await import("@codemirror/lang-xml")).xml();
      case "markdown":
        return (await import("@codemirror/lang-markdown")).markdown();
      default:
        return null; // fallback to plain text
    }
  } catch (error) {
    console.error(`Error loading language extension for ${language}:`, error);
    return null;
  }
};
