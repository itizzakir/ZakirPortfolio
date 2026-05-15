import { useEffect, useState } from "react";

export function useTypewriter(words, typingSpeed = 74, pause = 1350) {
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const isWordComplete = letterIndex === currentWord.length;
    const isWordEmpty = letterIndex === 0;

    const timeout = setTimeout(
      () => {
        if (!deleting && isWordComplete) {
          setDeleting(true);
          return;
        }

        if (deleting && isWordEmpty) {
          setDeleting(false);
          setWordIndex((index) => (index + 1) % words.length);
          return;
        }

        setLetterIndex((index) => index + (deleting ? -1 : 1));
      },
      isWordComplete && !deleting ? pause : deleting ? typingSpeed * 0.48 : typingSpeed,
    );

    return () => clearTimeout(timeout);
  }, [deleting, letterIndex, pause, typingSpeed, wordIndex, words]);

  return words[wordIndex].slice(0, letterIndex);
}
