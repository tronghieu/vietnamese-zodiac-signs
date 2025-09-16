import {
  getZodiacSign,
  getZodiacAnimal,
  getYearsForAnimal,
  isAnimalYear,
} from '../zodiac';
import { VietnameseZodiacAnimal, EnglishZodiacAnimal } from '../types';

describe('Vietnamese Zodiac Library', () => {
  describe('getZodiacSign', () => {
    test('should return correct zodiac for known years', () => {
      // 1900 is Rat year (base year)
      expect(getZodiacSign(1900)).toEqual({
        vietnamese: VietnameseZodiacAnimal.Rat,
        english: EnglishZodiacAnimal.Rat,
        year: 1900,
        order: 1,
      });

      // 1901 is Buffalo year
      expect(getZodiacSign(1901)).toEqual({
        vietnamese: VietnameseZodiacAnimal.Buffalo,
        english: EnglishZodiacAnimal.Buffalo,
        year: 1901,
        order: 2,
      });

      // 2000 is Dragon year (1900 + 100 = 8 cycles + 4 positions = Dragon)
      expect(getZodiacSign(2000)).toEqual({
        vietnamese: VietnameseZodiacAnimal.Dragon,
        english: EnglishZodiacAnimal.Dragon,
        year: 2000,
        order: 5,
      });

      // 2024 is Dragon year
      expect(getZodiacSign(2024)).toEqual({
        vietnamese: VietnameseZodiacAnimal.Dragon,
        english: EnglishZodiacAnimal.Dragon,
        year: 2024,
        order: 5,
      });
    });

    test('should handle years before base year', () => {
      // 1899 should be Pig year (one year before Rat)
      expect(getZodiacSign(1899)).toEqual({
        vietnamese: VietnameseZodiacAnimal.Pig,
        english: EnglishZodiacAnimal.Pig,
        year: 1899,
        order: 12,
      });
    });

    test('should throw error for invalid years', () => {
      expect(() => getZodiacSign(0)).toThrow('Year must be a valid 4-digit integer');
      expect(() => getZodiacSign(-1)).toThrow('Year must be a valid 4-digit integer');
      expect(() => getZodiacSign(10000)).toThrow('Year must be a valid 4-digit integer');
      expect(() => getZodiacSign(1.5)).toThrow('Year must be a valid 4-digit integer');
    });

    test('should handle complete 12-year cycle', () => {
      const expectedCycle = [
        { year: 1900, animal: VietnameseZodiacAnimal.Rat, order: 1 },
        { year: 1901, animal: VietnameseZodiacAnimal.Buffalo, order: 2 },
        { year: 1902, animal: VietnameseZodiacAnimal.Tiger, order: 3 },
        { year: 1903, animal: VietnameseZodiacAnimal.Cat, order: 4 },
        { year: 1904, animal: VietnameseZodiacAnimal.Dragon, order: 5 },
        { year: 1905, animal: VietnameseZodiacAnimal.Snake, order: 6 },
        { year: 1906, animal: VietnameseZodiacAnimal.Horse, order: 7 },
        { year: 1907, animal: VietnameseZodiacAnimal.Goat, order: 8 },
        { year: 1908, animal: VietnameseZodiacAnimal.Monkey, order: 9 },
        { year: 1909, animal: VietnameseZodiacAnimal.Rooster, order: 10 },
        { year: 1910, animal: VietnameseZodiacAnimal.Dog, order: 11 },
        { year: 1911, animal: VietnameseZodiacAnimal.Pig, order: 12 },
      ];

      expectedCycle.forEach(({ year, animal, order }) => {
        const result = getZodiacSign(year);
        expect(result.vietnamese).toBe(animal);
        expect(result.order).toBe(order);
      });
    });
  });

  describe('getZodiacAnimal', () => {
    test('should return Vietnamese name when language is vietnamese', () => {
      const result = getZodiacAnimal(1900, { language: 'vietnamese' });
      expect(result).toBe(VietnameseZodiacAnimal.Rat);
    });

    test('should return English name when language is english', () => {
      const result = getZodiacAnimal(1900, { language: 'english' });
      expect(result).toBe(EnglishZodiacAnimal.Rat);
    });

    test('should return both names when language is both or default', () => {
      const result1 = getZodiacAnimal(1900, { language: 'both' });
      const result2 = getZodiacAnimal(1900); // default

      const expected = {
        vietnamese: VietnameseZodiacAnimal.Rat,
        english: EnglishZodiacAnimal.Rat,
      };

      expect(result1).toEqual(expected);
      expect(result2).toEqual(expected);
    });
  });

  describe('getYearsForAnimal', () => {
    test('should return correct years for Vietnamese animal names', () => {
      const ratYears = getYearsForAnimal(VietnameseZodiacAnimal.Rat, 1900, 1924);
      expect(ratYears).toEqual([1900, 1912, 1924]);

      const dragonYears = getYearsForAnimal(VietnameseZodiacAnimal.Dragon, 2000, 2030);
      expect(dragonYears).toEqual([2000, 2012, 2024]);
    });

    test('should return correct years for English animal names', () => {
      const catYears = getYearsForAnimal(EnglishZodiacAnimal.Cat, 1900, 1920);
      expect(catYears).toEqual([1903, 1915]);
    });

    test('should return empty array when no years match in range', () => {
      const result = getYearsForAnimal(VietnameseZodiacAnimal.Rat, 1901, 1903);
      expect(result).toEqual([]);
    });

    test('should throw error for invalid year range', () => {
      expect(() => {
        getYearsForAnimal(VietnameseZodiacAnimal.Rat, 2000, 1999);
      }).toThrow('Start year must be less than or equal to end year');
    });

    test('should throw error for invalid animal', () => {
      expect(() => {
        getYearsForAnimal('InvalidAnimal' as any, 1900, 2000);
      }).toThrow('Invalid zodiac animal provided');
    });
  });

  describe('isAnimalYear', () => {
    test('should return true for correct Vietnamese animal matches', () => {
      expect(isAnimalYear(1900, VietnameseZodiacAnimal.Rat)).toBe(true);
      expect(isAnimalYear(2024, VietnameseZodiacAnimal.Dragon)).toBe(true);
    });

    test('should return true for correct English animal matches', () => {
      expect(isAnimalYear(1900, EnglishZodiacAnimal.Rat)).toBe(true);
      expect(isAnimalYear(2024, EnglishZodiacAnimal.Dragon)).toBe(true);
    });

    test('should return false for incorrect matches', () => {
      expect(isAnimalYear(1900, VietnameseZodiacAnimal.Buffalo)).toBe(false);
      expect(isAnimalYear(2024, EnglishZodiacAnimal.Cat)).toBe(false);
    });

    test('should return false for invalid years', () => {
      expect(isAnimalYear(0, VietnameseZodiacAnimal.Rat)).toBe(false);
      expect(isAnimalYear(-1, EnglishZodiacAnimal.Dragon)).toBe(false);
    });
  });

  describe('Edge cases and special years', () => {
    test('should handle leap years correctly', () => {
      // 2000 was a leap year, should still be Dragon
      expect(getZodiacSign(2000).vietnamese).toBe(VietnameseZodiacAnimal.Dragon);
      
      // 1900 was not a leap year (despite being divisible by 4), should be Rat
      expect(getZodiacSign(1900).vietnamese).toBe(VietnameseZodiacAnimal.Rat);
    });

    test('should handle century changes', () => {
      expect(getZodiacSign(1999).vietnamese).toBe(VietnameseZodiacAnimal.Cat);
      expect(getZodiacSign(2000).vietnamese).toBe(VietnameseZodiacAnimal.Dragon);
      expect(getZodiacSign(2001).vietnamese).toBe(VietnameseZodiacAnimal.Snake);
    });

    test('should be consistent across multiple cycles', () => {
      // Test that the same animal appears every 12 years
      const testYear = 1904; // Dragon year
      for (let cycle = 0; cycle < 10; cycle++) {
        const year = testYear + (cycle * 12);
        expect(getZodiacSign(year).vietnamese).toBe(VietnameseZodiacAnimal.Dragon);
      }
    });
  });

  describe('Real-world birth years', () => {
    test('should handle common birth years correctly', () => {
      const birthYears = [
        { year: 1990, expected: VietnameseZodiacAnimal.Horse },
        { year: 1995, expected: VietnameseZodiacAnimal.Pig },
        { year: 2000, expected: VietnameseZodiacAnimal.Dragon },
        { year: 2010, expected: VietnameseZodiacAnimal.Tiger },
        { year: 2020, expected: VietnameseZodiacAnimal.Rat },
      ];

      birthYears.forEach(({ year, expected }) => {
        expect(getZodiacSign(year).vietnamese).toBe(expected);
      });
    });
  });
});
