import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Link
      href="/api/login"
      className="flex flex-row items-center justify-center gap-4 w-fit"
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
  );
}
