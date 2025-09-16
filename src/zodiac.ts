import { VietnameseZodiacAnimal, EnglishZodiacAnimal, ZodiacSign, ZodiacOptions } from './types';

/**
 * Type for zodiac cycle entry
 */
interface ZodiacCycleEntry {
  readonly vietnamese: VietnameseZodiacAnimal;
  readonly english: EnglishZodiacAnimal;
}

/**
 * Vietnamese zodiac animals in order (12-year cycle)
 * Starting from Rat (Tý) which corresponds to years ending in 4, 16, 28, etc.
 * Base year 1900 corresponds to Rat (Tý)
 */
const ZODIAC_CYCLE: readonly ZodiacCycleEntry[] = [
  { vietnamese: VietnameseZodiacAnimal.Rat, english: EnglishZodiacAnimal.Rat },
  { vietnamese: VietnameseZodiacAnimal.Buffalo, english: EnglishZodiacAnimal.Buffalo },
  { vietnamese: VietnameseZodiacAnimal.Tiger, english: EnglishZodiacAnimal.Tiger },
  { vietnamese: VietnameseZodiacAnimal.Cat, english: EnglishZodiacAnimal.Cat },
  { vietnamese: VietnameseZodiacAnimal.Dragon, english: EnglishZodiacAnimal.Dragon },
  { vietnamese: VietnameseZodiacAnimal.Snake, english: EnglishZodiacAnimal.Snake },
  { vietnamese: VietnameseZodiacAnimal.Horse, english: EnglishZodiacAnimal.Horse },
  { vietnamese: VietnameseZodiacAnimal.Goat, english: EnglishZodiacAnimal.Goat },
  { vietnamese: VietnameseZodiacAnimal.Monkey, english: EnglishZodiacAnimal.Monkey },
  { vietnamese: VietnameseZodiacAnimal.Rooster, english: EnglishZodiacAnimal.Rooster },
  { vietnamese: VietnameseZodiacAnimal.Dog, english: EnglishZodiacAnimal.Dog },
  { vietnamese: VietnameseZodiacAnimal.Pig, english: EnglishZodiacAnimal.Pig },
] as const;

/**
 * Base year for the zodiac calculation (Rat year)
 */
const BASE_YEAR = 1900;

/**
 * Performance optimization: Map for O(1) animal lookup instead of O(n) loop
 * Maps each zodiac animal to its position in the cycle
 */
const ANIMAL_TO_POSITION_MAP = new Map<VietnameseZodiacAnimal | EnglishZodiacAnimal, number>(
  ZODIAC_CYCLE.flatMap((entry, index) => [
    [entry.vietnamese, index],
    [entry.english, index],
  ])
);

/**
 * Calculate the zodiac animal for a given birth year
 * 
 * @param year - The birth year (4-digit year)
 * @returns The zodiac sign information
 * @throws Error if year is invalid
 */
export function getZodiacSign(year: number): ZodiacSign {
  if (!Number.isInteger(year) || year < 1 || year > 9999) {
    throw new Error('Year must be a valid 4-digit integer');
  }

  const adjustedPosition: number = calculateCyclePosition(year);
  const zodiacInfo: ZodiacCycleEntry = ZODIAC_CYCLE[adjustedPosition];
  
  return {
    vietnamese: zodiacInfo.vietnamese,
    english: zodiacInfo.english,
    year,
    order: adjustedPosition + 1,
  };
}

/**
 * Get the zodiac animal name for a given birth year
 * 
 * @param year - The birth year
 * @param options - Options for the output format
 * @returns The zodiac animal name(s)
 */
export function getZodiacAnimal(
  year: number,
  options: ZodiacOptions = { language: 'both' }
): string | { vietnamese: VietnameseZodiacAnimal; english: EnglishZodiacAnimal } {
  const zodiacSign: ZodiacSign = getZodiacSign(year);
  
  switch (options.language) {
    case 'vietnamese':
      return zodiacSign.vietnamese;
    case 'english':
      return zodiacSign.english;
    case 'both':
    default:
      return {
        vietnamese: zodiacSign.vietnamese,
        english: zodiacSign.english,
      };
  }
}

/**
 * Get all years for a specific zodiac animal within a range
 * 
 * @param animal - The zodiac animal (Vietnamese or English name)
 * @param startYear - Start year of the range
 * @param endYear - End year of the range
 * @returns Array of years that correspond to the specified animal
 */
export function getYearsForAnimal(
  animal: VietnameseZodiacAnimal | EnglishZodiacAnimal,
  startYear: number,
  endYear: number
): number[] {
  if (startYear > endYear) {
    throw new Error('Start year must be less than or equal to end year');
  }

  // Performance optimization: Use Map for O(1) lookup instead of O(n) loop
  const targetPosition: number | undefined = ANIMAL_TO_POSITION_MAP.get(animal);
  
  if (targetPosition === undefined) {
    throw new Error('Invalid zodiac animal provided');
  }
  
  const years: number[] = [];
  
  // Find all years in the range that match this animal
  for (let year = startYear; year <= endYear; year++) {
    const adjustedPosition: number = calculateCyclePosition(year);
    
    if (adjustedPosition === targetPosition) {
      years.push(year);
    }
  }
  
  return years;
}

/**
 * Check if a year corresponds to a specific zodiac animal
 * 
 * @param year - The year to check
 * @param animal - The zodiac animal to match against
 * @returns True if the year corresponds to the animal
 */
export function isAnimalYear(
  year: number,
  animal: VietnameseZodiacAnimal | EnglishZodiacAnimal
): boolean {
  try {
    const zodiacSign: ZodiacSign = getZodiacSign(year);
    return zodiacSign.vietnamese === animal || zodiacSign.english === animal;
  } catch {
    return false;
  }
}

/**
 * Helper function to calculate cycle position from year
 * Used internally for consistent cycle position calculation
 * 
 * @param year - The year to calculate position for
 * @returns The position in the 12-year cycle (0-11)
 */
function calculateCyclePosition(year: number): number {
  const cyclePosition: number = (year - BASE_YEAR) % 12;
  return cyclePosition < 0 ? cyclePosition + 12 : cyclePosition;
}
