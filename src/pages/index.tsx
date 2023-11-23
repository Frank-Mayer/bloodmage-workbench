import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <p>Easily create projects using the Bloodmage engine.</p>
      <ol className="list-decimal list-inside">
        <li>Login using GitHub</li>
        <li>Select your account</li>
        <li>Name your project</li>
        <li>{'Click "Create"'}</li>
      </ol>
      <p>
        Workbench will create a new repository containing the Bloodmage engine.
      </p>

      <Link
        href="/api/login"
        className="flex flex-row items-center justify-center gap-4 w-fit bg-white/10 hover:bg-white/20 py-2 px-4 my-8"
      >
        <Image
          src="/github-mark-white.svg"
          alt="Github logo"
          width={24}
          height={24}
          className="w-6 h-6"
        />
        Login
      </Link>

      <p>This website uses cookies to store your login.</p>
    </>
  );
}
