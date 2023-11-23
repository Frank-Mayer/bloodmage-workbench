import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { JetBrains_Mono } from "next/font/google";

const font = JetBrains_Mono({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${font.className}`}>
      <h1 className="text-xl mx-2 mt-8">Bloodmage Workbench</h1>
      <Component {...pageProps} />
    </main>
  );
}
