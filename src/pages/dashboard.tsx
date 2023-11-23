import Link from "next/link";
import type { InstallationResponse } from "@/pages/api/installed";
import { useQuery } from "react-query";
import { panic } from "@/lib/panic";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Workbench Dashboard</title>
      </Head>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/api/pic" alt="" className="fixed top-4 right-4 w-16 h-16" />

      <Link
        href="https://github.com/apps/bloodmage-workbench/installations/new"
        className="cursor-pointer w-fit block my-8 py-2 px-4 bg-white/10 hover:bg-white/20"
        target="_blank"
      >
        GitHub App Installation (for repo permissions)
      </Link>

      <h2 className="my-4 text-md">Create a new project</h2>
      <NewProjectForm />
    </>
  );
}

function NewProjectForm() {
  const { isLoading, error, data } = useQuery("installedQuery", () =>
    fetch("/api/installed").then(
      (res) => res.json() as Promise<InstallationResponse>,
    ),
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error;

  if (!data) return "No data";

  if (data.total_count === 0) {
    return (
      <p>{"You haven't installed the Bloodmage Workbench GitHub App yet."}</p>
    );
  }

  return (
    <form action="/api/new" method="get" className="mt-8">
      <div className="flex flex-row items-end">
        <span className="inline-block py-2">github.com/</span>

        <label className="flex flex-col">
          Owner
          <select
            name="account"
            className="inline-block py-2 px-4 bg-white/10 hover:bg-white/20"
            required
          >
            {data.installations.map((x) => {
              const login = (x.account.login ??
                x.account.name ??
                panic("No login")) as string;
              return (
                <option key={login} value={login}>
                  {login}
                </option>
              );
            })}
          </select>
        </label>

        <span className="inline-block py-2">/</span>

        <label className="flex flex-col">
          Repo <code className="inline-block">[a-z][a-z0-9]*</code>
          <input
            type="text"
            name="repo"
            className="inline-block py-2 px-4 bg-white/10 hover:bg-white/20 invalid:text-red-500"
            pattern="[a-z][a-z0-9]*"
            required
          />
        </label>
      </div>

      <input
        type="submit"
        value="Create"
        className="cursor-pointer block my-8 py-2 px-4 bg-white/10 hover:bg-white/20"
      />
    </form>
  );
}
