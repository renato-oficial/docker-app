'use client'

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponse("");
    try {
      const res = await fetch("/api/v1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error("Erro ao chamar a API");
      const data = await res.json();
      setResponse(data.message);
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
          <label htmlFor="prompt" className="font-semibold">Prompt para API:</label>
          <textarea
            id="prompt"
            className="border rounded p-2 min-h-[60px]"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Digite seu prompt aqui..."
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-60"
            disabled={loading || !prompt.trim()}
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>
        {response && (
          <div className="bg-green-100 border border-green-300 rounded p-4 mt-2 w-full max-w-md">
            <strong>Resposta da API:</strong>
            <div className="mt-2 whitespace-pre-line">{response}</div>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-300 rounded p-4 mt-2 w-full max-w-md text-red-700">
            <strong>Erro:</strong> {error}
          </div>
        )}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
