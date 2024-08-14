// app/page.tsx
import FlashCard from '@/components/Flashcard';

interface FlashcardData {
  id: number;
  question: string;
  answer: string;
}

const HomePage: React.FC = async () => {
  const res = await fetch(`http://localhost:3000/api/flashcards`);
  const flashcards: FlashcardData[] = await res.json();

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl text-center mb-8">Flashcard Learning Tool</h1>
      {/* <FlashcardNavigation flashcards={flashcards} /> */}
      <FlashCard flashcards={flashcards} />
    </div>
  );
};

export default HomePage;
