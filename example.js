// Example usage of the Vietnamese Zodiac Signs library
const { getZodiacSign, getZodiacAnimal, getYearsForAnimal, isAnimalYear, VietnameseZodiacAnimal } = require('./dist/index.js');

console.log('=== Vietnamese Zodiac Signs Library Examples ===\n');

// Example 1: Get zodiac sign for a birth year
console.log('1. Get zodiac sign for birth year 1990:');
const zodiac1990 = getZodiacSign(1990);
console.log(zodiac1990);
console.log();

// Example 2: Get zodiac sign for current year
const currentYear = new Date().getFullYear();
console.log(`2. Get zodiac sign for current year (${currentYear}):`);
const zodiacCurrent = getZodiacSign(currentYear);
console.log(zodiacCurrent);
console.log();

// Example 3: Get animal names in different languages
console.log('3. Get animal names for year 2000:');
console.log('Both languages:', getZodiacAnimal(2000));
console.log('Vietnamese only:', getZodiacAnimal(2000, { language: 'vietnamese' }));
console.log('English only:', getZodiacAnimal(2000, { language: 'english' }));
console.log();

// Example 4: Find all Dragon years in a range
console.log('4. Find all Dragon years between 2000-2030:');
const dragonYears = getYearsForAnimal(VietnameseZodiacAnimal.Dragon, 2000, 2030);
console.log(dragonYears);
console.log();

// Example 5: Check if specific years match animals
console.log('5. Check if years match specific animals:');
console.log('Is 2024 a Dragon year?', isAnimalYear(2024, VietnameseZodiacAnimal.Dragon));
console.log('Is 2024 a Cat year?', isAnimalYear(2024, VietnameseZodiacAnimal.Cat));
console.log();

// Example 6: Complete 12-year cycle demonstration
console.log('6. Complete 12-year cycle (2012-2023):');
for (let year = 2012; year <= 2023; year++) {
  const zodiac = getZodiacSign(year);
  console.log(`${year}: ${zodiac.vietnamese} (${zodiac.english}) - Order: ${zodiac.order}`);
}
console.log();

console.log('=== Examples completed! ===');
