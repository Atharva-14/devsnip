"use client";

import React, { useEffect, useState } from "react";
import { LanguageCombobox } from "./language-combobox";
import { Button } from "./ui/button";
import CodeMirror, { oneDark } from "@uiw/react-codemirror";
import { getLanguageExtension } from "@/lib/codemirror-extensions";
import { Extension } from "@codemirror/state";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  CodeXml,
  Eye,
  Heading,
  Save,
  Tags,
  Terminal,
  Text,
} from "lucide-react";
import { Textarea } from "./ui/textarea";

type FormData = {
  title: string;
  language: string;
  tags: string[];
  description: string;
  code: string;
};

const SnippetForm = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    language: "",
    tags: [],
    description: "",
    code: "",
  });
  const [extensions, setExtensions] = useState<Extension[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "tags" ? value.split(",").map((tag) => tag.trim()) : value,
    });
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
        tags: formData.tags,
        description: formData.description.trim(),
        code: formData.code.trim(),
      });

      if (response.status === 201) {
        alert("Snippet created successfully");

        setFormData({
          title: "",
          language: "",
          tags: [],
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
    <div className="w-full max-w-3xl mx-auto">
      <Card className="bg-[#1f2937]">
        <CardHeader>
          <CardTitle className="text-white font-bold text-xl">
            Create New Snippet
          </CardTitle>
          <CardDescription className="text-gray-100">
            Save and organize your code snippets for future reference
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Title */}
              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="title" className="text-white">
                  <Heading size={16} />
                  Title
                </Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="e.g., React API Fetch Function"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full text-white bg-[#374151] border-none"
                />
              </div>

              {/* Language */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="language" className="text-white">
                  <CodeXml size={16} />
                  Language
                </Label>
                <LanguageCombobox onLanguageChange={handleLanguageChange} />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="tags" className="text-white">
                <Tags size={16} />
                Tags
              </Label>
              <Input
                type="text"
                name="tags"
                id="tags"
                placeholder="e.g., React, API, Performance, Hooks"
                value={formData.tags}
                onChange={handleChange}
                className="w-full bg-[#374151] border-none text-white"
              />
              <Label className="text-xs text-muted-foreground">
                Separate tags with commas
              </Label>
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="description" className="text-white">
                <Text size={16} />
                Description
              </Label>
              <Textarea
                name="description"
                id="description"
                placeholder="e.g., This snippet fetches data from an API"
                value={formData.description}
                onChange={handleChange}
                className="w-full min-h-[100px] rounded-md border px-3 py-2 text-sm text-white bg-[#374151] border-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="code" className="text-white">
                <Terminal size={16} />
                Code
              </Label>
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
          </div>
        </CardContent>

        <CardFooter>
          <div className="w-full flex md:flex-row flex-col justify-between items-center md:gap-1 gap-4">
            <Button
              variant="default"
              className="md:w-1/3 w-full bg-gray-700 hover:bg-gray-600 transition-colors duration-300 cursor-pointer"
            >
              <Eye size={16} />
              Preview
            </Button>
            <Button
              variant="default"
              onClick={handleSubmit}
              className="md:w-2/3 w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
            >
              <Save size={16} />
              Save Snippet
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SnippetForm;
