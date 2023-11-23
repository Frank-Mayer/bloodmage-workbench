import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { JetBrains_Mono } from "next/font/google";

const font = JetBrains_Mono({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${font.className}`}>
      <h1 className="text-xl">Bloodmage Workbench</h1>
      <Component {...pageProps} />
    </main>
  );
}
