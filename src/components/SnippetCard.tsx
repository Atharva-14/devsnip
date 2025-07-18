import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Bot } from "lucide-react";
import { highlightCode } from "@/lib/highlightCode";
import { tagColors } from "@/lib/colours";

interface Snippet {
  _id: string;
  title: string;
  code: string;
  language: string;
  description: string;
  tags: string[];
}

const SnippetCard = async ({ snippets }: { snippets: Snippet[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mx-auto max-w-8xl">
      {await Promise.all(
        snippets.map(async (snippet: Snippet) => {
          const highlighted = await highlightCode(
            snippet.code,
            snippet.language
          );

          return (
            <Card key={snippet._id}>
              <CardHeader>
                <CardTitle className="text-black font-bold">
                  {snippet.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="relative rounded-md overflow-hidden border border-gray-700 bg-[#101010] w-full">
                  <div className="flex justify-between items-center px-4 py-2 bg-[#161b22] text-xs text-white font-mono">
                    <span className="capitalize">{snippet.language || ""}</span>
                  </div>

                  <div
                    className="h-[15rem] w-full overflow-auto p-4 text-sm"
                    dangerouslySetInnerHTML={{ __html: highlighted }}
                  />
                </div>

                <p className="text-sm">{snippet.description}</p>
                <div className="flex flex-wrap gap-2 rounded">
                  {snippet.tags.map((tag, index) => {
                    const color = tagColors[index % tagColors.length];
                    return (
                      <p
                        key={index}
                        className={`text-xs py-1 px-2.5 rounded-xl ${color.bg} ${color.text} text-gray-800`}
                      >
                        {tag}
                      </p>
                    );
                  })}
                </div>
                <Button
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg flex 
            items-center gap-2 cursor-pointer hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 
            transition-colors duration-300"
                >
                  <Bot />
                  Explain with AI
                </Button>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default SnippetCard;
