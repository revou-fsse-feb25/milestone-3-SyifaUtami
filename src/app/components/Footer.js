import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-center border-t border-gray-300 py-7 px-6">
      <p> Copyright © Syifa Utami (no I'm not a thief) {" "}
      <span className="mx-5"/> <Link href="/admin" className="text-[#1C1C1C] hover:underline hover:decoration-[#1ceff4]"> Admin Access </Link> </p>
    </footer>
  );
}

