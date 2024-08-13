// components/Flashcard.tsx
import { useState } from 'react';

interface FlashcardProps {
  question: string;
  answer: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ question, answer }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-full h-64 bg-white shadow-lg rounded-lg flex items-center justify-center cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div className="text-center">
        {flipped ? <p>{answer}</p> : <h3>{question}</h3>}
      </div>
    </div>
  );
};

export default Flashcard;
