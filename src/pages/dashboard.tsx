import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/api/pic" alt="" className="fixed top-4 right-4 w-16 h-16" />

      <Link
        href="https://github.com/apps/bloodmage-workbench/installations/new"
        className="cursor-pointer w-fit block mx-2 my-8 px-4 py-2 bg-white/10 hover:bg-white/20"
      >
        GitHub App Installation (for repo permissions)
      </Link>

      <form action="/api/new" method="get" className="mt-8">
        <h2 className="my-4 mx-2 text-md">Create a new project</h2>
        <label className="block p-2 bg-white/10 my-2 hover:bg-white/20">
          Project Name:&nbsp;
          <input
            type="text"
            name="name"
            className="bg-transparent text-white"
            pattern="[a-z0-9-_]{4,}"
          />
        </label>

        <input
          type="submit"
          value="Create"
          className="cursor-pointer block mx-2 my-8 px-4 py-2 bg-white/10 hover:bg-white/20"
        />
      </form>
    </>
  );
}
