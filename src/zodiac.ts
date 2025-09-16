import { VietnameseZodiacAnimal, EnglishZodiacAnimal, ZodiacSign, ZodiacOptions } from './types';

/**
 * Vietnamese zodiac animals in order (12-year cycle)
 * Starting from Rat (Tý) which corresponds to years ending in 4, 16, 28, etc.
 * Base year 1900 corresponds to Rat (Tý)
 */
const ZODIAC_CYCLE: Array<{
  vietnamese: VietnameseZodiacAnimal;
  english: EnglishZodiacAnimal;
}> = [
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
];

/**
 * Base year for the zodiac calculation (Rat year)
 */
const BASE_YEAR = 1900;

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

  // Calculate the position in the 12-year cycle
  const cyclePosition = (year - BASE_YEAR) % 12;
  // Handle negative years (before base year)
  const adjustedPosition = cyclePosition < 0 ? cyclePosition + 12 : cyclePosition;
  
  const zodiacInfo = ZODIAC_CYCLE[adjustedPosition];
  
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
): string | { vietnamese: string; english: string } {
  const zodiacSign = getZodiacSign(year);
  
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

  const years: number[] = [];
  
  // Find the zodiac cycle position for the given animal
  let targetPosition = -1;
  for (let i = 0; i < ZODIAC_CYCLE.length; i++) {
    if (ZODIAC_CYCLE[i].vietnamese === animal || ZODIAC_CYCLE[i].english === animal) {
      targetPosition = i;
      break;
    }
  }
  
  if (targetPosition === -1) {
    throw new Error('Invalid zodiac animal provided');
  }
  
  // Find all years in the range that match this animal
  for (let year = startYear; year <= endYear; year++) {
    const cyclePosition = (year - BASE_YEAR) % 12;
    const adjustedPosition = cyclePosition < 0 ? cyclePosition + 12 : cyclePosition;
    
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
    const zodiacSign = getZodiacSign(year);
    return zodiacSign.vietnamese === animal || zodiacSign.english === animal;
  } catch {
    return false;
  }
}
