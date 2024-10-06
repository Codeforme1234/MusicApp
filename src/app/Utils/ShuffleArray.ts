/**
 * Shuffles the elements of an array randomly.
 * This function creates a new array and does not modify the original.
 *
 * @param array The array to be shuffled
 * @returns A new array with the same elements in a random order
 */
export function shuffleArray<T>(array: T[]): T[] {
  // Create a copy of the original array
  const shuffled = [...array];

  // Implement Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at indices i and j
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}
