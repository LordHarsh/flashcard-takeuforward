import Link from "next/link";
const Header: React.FC = () => {
  return (
    <header className="bg-transparent text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">
          <Link href="/">Flashcard Learning Tool</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link className="hover:text-gray-400" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-400" href="/admin">
                Admin
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
