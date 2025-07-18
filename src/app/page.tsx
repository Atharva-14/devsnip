import SnippetCard from "@/components/SnippetCard";
import SnippetForm from "@/components/SnippetForm";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/snippets`, {
    cache: "no-store", // Ensures SSR fetch is fresh every time
  });

  if (!res.ok) {
    throw new Error("Failed to fetch snippets");
  }

  const snippets = await res.json();

  console.log("Fetched snippets:", snippets);

  return (
    <div>
      <SnippetForm />
      {/* <SnippetCard snippets={snippets} /> */}
    </div>
  );
}
