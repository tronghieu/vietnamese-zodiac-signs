/**
 * Vietnamese zodiac animal names in Vietnamese
 */
export enum VietnameseZodiacAnimal {
  Rat = 'Tý', // Rat
  Buffalo = 'Sửu', // Buffalo/Ox
  Tiger = 'Dần', // Tiger
  Cat = 'Mão', // Cat (Rabbit in Chinese zodiac)
  Dragon = 'Thìn', // Dragon
  Snake = 'Tỵ', // Snake
  Horse = 'Ngọ', // Horse
  Goat = 'Mùi', // Goat
  Monkey = 'Thân', // Monkey
  Rooster = 'Dậu', // Rooster
  Dog = 'Tuất', // Dog
  Pig = 'Hợi', // Pig
}

/**
 * English names for Vietnamese zodiac animals
 */
export enum EnglishZodiacAnimal {
  Rat = 'Rat',
  Buffalo = 'Buffalo',
  Tiger = 'Tiger',
  Cat = 'Cat',
  Dragon = 'Dragon',
  Snake = 'Snake',
  Horse = 'Horse',
  Goat = 'Goat',
  Monkey = 'Monkey',
  Rooster = 'Rooster',
  Dog = 'Dog',
  Pig = 'Pig',
}

/**
 * Zodiac sign information
 */
export interface ZodiacSign {
  vietnamese: VietnameseZodiacAnimal;
  english: EnglishZodiacAnimal;
  year: number;
  order: number; // 1-12
}

/**
 * Options for zodiac conversion
 */
export interface ZodiacOptions {
  language?: 'vietnamese' | 'english' | 'both';
}
