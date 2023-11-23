import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { JetBrains_Mono } from "next/font/google";
import { QueryClient, QueryClientProvider } from "react-query";

const font = JetBrains_Mono({ subsets: ["latin"] });
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={`mx-auto max-w-3xl ${font.className}`}>
        <h1 className="text-3xl my-8">Workbench</h1>
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  );
}
