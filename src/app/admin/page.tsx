"use client";
// app/admin/page.tsx
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

const AdminDashboard: React.FC = () => {
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl text-center mb-8">Admin Dashboard</h1>
      <div className="flex justify-center space-x-4">
        <Link className="p-2 bg-green-500 text-white rounded" href="/admin/add">
          Add Flashcard
        </Link>
        <Link className="p-2 bg-yellow-500 text-white rounded" href="/admin/edit">
          Edit Flashcards
        </Link>
        <Link className="p-2 bg-red-500 text-white rounded" href="/admin/delete">
          Delete Flashcards
        </Link>
      </div>
    </div>
  );
};

const AdminPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading

    if (!session) {
      router.push('/auth/signin');
    } else if (session.user.role !== 'admin') {
      router.push('/');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session || session.user.role !== 'admin') {
    return <p>Redirecting...</p>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Admin features go here */}
    </div>
  );
};

export default AdminPage;