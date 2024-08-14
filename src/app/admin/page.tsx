import Link from "next/link";

const AdminPage: React.FC = () => {
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl text-center mb-8">Admin Dashboard</h1>
      <div className="flex justify-center space-x-4">
        <Link className="p-[3px] relative" href="/admin/add">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            Add Flashcards
          </div>
        </Link>
        <Link className="p-[3px] relative" href="/admin/edit">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            Edit Flashcards
          </div>
        </Link>
        <Link className="p-[3px] relative" href="/admin/add">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            Delete Flashcard
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
