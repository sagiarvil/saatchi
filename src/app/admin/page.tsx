'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRedirect() {
  const router = useRouter();

  useEffect(() => {
    window.location.href = '/admin.html';
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-[#C2A768]">
      Yönetim Paneline Yönlendiriliyorsunuz...
    </div>
  );
}
