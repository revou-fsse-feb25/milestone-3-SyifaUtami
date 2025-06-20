'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="mb-6 px-4 py-2 cursor-pointer"
      type="button"
    >
      ← Back
    </button>
  );
}