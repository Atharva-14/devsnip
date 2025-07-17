import mongoose, { Schema, Document, models, model } from "mongoose";

export interface ISnippet extends Document {
  code: string;
  description: string;
  tags: string[];
  language: string;
  aiExplaination?: string;
  createdAt: Date;
}

const SnippetSchema: Schema = new Schema<ISnippet>({
  code: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true },
  language: { type: String, required: true },
  aiExplaination: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.Snippet || model<ISnippet>("Snippet", SnippetSchema);
