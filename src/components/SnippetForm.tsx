"use client";

import React, { useEffect, useState } from "react";
import { LanguageCombobox } from "./language-combobox";
import { Button } from "./ui/button";
import CodeMirror, { oneDark } from "@uiw/react-codemirror";
import { getLanguageExtension } from "@/lib/codemirror-extensions";
import { Extension } from "@codemirror/state";
import axios from "axios";

type FormData = {
  title: string;
  language: string;
  tags: string;
  description: string;
  code: string;
};

const SnippetForm = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    language: "",
    tags: "",
    description: "",
    code: "",
  });
  const [extensions, setExtensions] = useState<Extension[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLanguageChange = (selectedLanguage: string) => {
    setFormData((prev) => ({ ...prev, language: selectedLanguage }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.language ||
      !formData.tags ||
      !formData.description ||
      !formData.code
    ) {
      console.error("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post("/api/snippets", {
        title: formData.title.trim(),
        language: formData.language.trim(),
        tags: formData.tags.trim(),
        description: formData.description.trim(),
        code: formData.code.trim(),
      });

      if (response.status === 201) {
        alert("Snippet created successfully");

        setFormData({
          title: "",
          language: "",
          tags: "",
          description: "",
          code: "",
        });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  useEffect(() => {
    const loadExtension = async () => {
      const ext = await getLanguageExtension(formData.language);
      setExtensions(ext ? [ext] : []);
    };
    loadExtension();
  }, [formData.language]);

  return (
    <div>
      {/* Card */}
      <h1>Create New Snippet</h1>
      <p>Save and organize your code snippets for future reference</p>

      <div>
        {/* Title */}
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="e.g., React API Fetch Function"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        {/* Language */}
        <div>
          <label htmlFor="language">Language</label>
          <LanguageCombobox onLanguageChange={handleLanguageChange} />
        </div>
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          name="tags"
          id="tags"
          placeholder="e.g., React, API, Performance, Hooks"
          value={formData.tags}
          onChange={handleChange}
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          placeholder="e.g., This snippet fetches data from an API"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      {/* Code */}
      <div>
        <label htmlFor="code">Code</label>
        <div className="rounded-md overflow-hidden border">
          <CodeMirror
            value={formData.code}
            height="200px"
            theme={oneDark}
            extensions={extensions}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, code: value }))
            }
          />
        </div>
      </div>

      <Button variant="default" onClick={handleSubmit}>
        Save Snippet
      </Button>
    </div>
  );
};

export default SnippetForm;
