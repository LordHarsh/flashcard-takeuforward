"use client";
import { useState } from 'react';
import Flashcard from './Flashcard';

interface FlashcardData {
  id: number;
  question: string;
  answer: string;
}

interface FlashcardNavigationProps {
  flashcards: FlashcardData[];
}

const FlashcardNavigation: React.FC<FlashcardNavigationProps> = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextFlashcard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previousFlashcard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Flashcard {...flashcards[currentIndex]} />
      <div className="mt-4">
        <button
          onClick={previousFlashcard}
          className="mr-4 p-2 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
        <button
          onClick={nextFlashcard}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FlashcardNavigation;
