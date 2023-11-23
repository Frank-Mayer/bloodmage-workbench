import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { JetBrains_Mono } from "next/font/google";
import { QueryClient, QueryClientProvider } from "react-query";

const font = JetBrains_Mono({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={`${font.className}`}>
        <h1 className="text-xl mx-2 mt-8">Bloodmage Workbench</h1>
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  );
}
