# Tử Vi Cung Hoàng Đạo Việt Nam / Vietnamese Zodiac Signs

Thư viện TypeScript để chuyển đổi năm sinh thành con giáp tương ứng theo văn hóa Việt Nam.

A TypeScript library to convert birth year to corresponding zodiac animal according to Vietnamese culture.

---

## Tiếng Việt (English below)

### Tính năng

- 🇻🇳 Hệ thống tử vi chính thống của Việt Nam (có con Mèo thay vì con Thỏ)
- 🔢 Chuyển đổi năm sinh thành con giáp
- 🌐 Hỗ trợ cả tên tiếng Việt và tiếng Anh
- 📅 Tìm tất cả các năm của một con giáp cụ thể trong khoảng thời gian
- ✅ Hỗ trợ TypeScript đầy đủ
- 🧪 Được kiểm thử hoàn toàn với Jest

### Cài đặt

```bash
npm install vietnamese-zodiac-signs
```

### Cách sử dụng

#### Sử dụng cơ bản

```typescript
import { getZodiacSign } from 'vietnamese-zodiac-signs';

const zodiac = getZodiacSign(1990);
console.log(zodiac);
// Kết quả: {
//   vietnamese: 'Ngọ',
//   english: 'Horse',
//   year: 1990,
//   order: 7
// }
```

#### Lấy tên con giáp

```typescript
import { getZodiacAnimal } from 'vietnamese-zodiac-signs';

// Lấy cả tên tiếng Việt và tiếng Anh (mặc định)
const both = getZodiacAnimal(2000);
console.log(both); // { vietnamese: 'Thìn', english: 'Dragon' }

// Chỉ lấy tên tiếng Việt
const vietnamese = getZodiacAnimal(2000, { language: 'vietnamese' });
console.log(vietnamese); // 'Thìn'

// Chỉ lấy tên tiếng Anh
const english = getZodiacAnimal(2000, { language: 'english' });
console.log(english); // 'Dragon'
```

#### Tìm các năm của con giáp cụ thể

```typescript
import { getYearsForAnimal, VietnameseZodiacAnimal } from 'vietnamese-zodiac-signs';

const dragonYears = getYearsForAnimal(VietnameseZodiacAnimal.Dragon, 2000, 2030);
console.log(dragonYears); // [2000, 2012, 2024]
```

#### Kiểm tra năm có phải của con giáp cụ thể

```typescript
import { isAnimalYear, VietnameseZodiacAnimal } from 'vietnamese-zodiac-signs';

const isDragonYear = isAnimalYear(2024, VietnameseZodiacAnimal.Dragon);
console.log(isDragonYear); // true
```

### 12 Con Giáp Việt Nam

Chu kỳ 12 con giáp trong văn hóa Việt Nam:

| Thứ tự | Tiếng Việt | Tiếng Anh | Các năm (ví dụ) |
|--------|------------|-----------|-----------------|
| 1      | Tý         | Rat       | 1900, 1912, 1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020 |
| 2      | Sửu        | Buffalo   | 1901, 1913, 1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021 |
| 3      | Dần        | Tiger     | 1902, 1914, 1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022 |
| 4      | Mão        | Cat       | 1903, 1915, 1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023 |
| 5      | Thìn       | Dragon    | 1904, 1916, 1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024 |
| 6      | Tỵ         | Snake     | 1905, 1917, 1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025 |
| 7      | Ngọ        | Horse     | 1906, 1918, 1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026 |
| 8      | Mùi        | Goat      | 1907, 1919, 1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027 |
| 9      | Thân       | Monkey    | 1908, 1920, 1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028 |
| 10     | Dậu        | Rooster   | 1909, 1921, 1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029 |
| 11     | Tuất       | Dog       | 1910, 1922, 1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030 |
| 12     | Hợi        | Pig       | 1911, 1923, 1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031 |

### Tài liệu API

#### Các hàm chính

##### `getZodiacSign(year: number): ZodiacSign`

Trả về thông tin đầy đủ về con giáp cho một năm cụ thể.

**Tham số:**
- `year`: Năm 4 chữ số (1-9999)

**Trả về:** Đối tượng `ZodiacSign` với tên tiếng Việt, tên tiếng Anh, năm, và thứ tự.

**Ném lỗi:** Lỗi nếu năm không hợp lệ.

##### `getZodiacAnimal(year: number, options?: ZodiacOptions): string | object`

Trả về tên con giáp cho một năm cụ thể.

**Tham số:**
- `year`: Năm 4 chữ số
- `options`: Đối tượng cấu hình tùy chọn
  - `language`: 'vietnamese' | 'english' | 'both' (mặc định: 'both')

**Trả về:** Chuỗi (nếu chỉ định ngôn ngữ) hoặc đối tượng với cả hai tên.

##### `getYearsForAnimal(animal, startYear, endYear): number[]`

Trả về tất cả các năm của một con giáp cụ thể trong khoảng thời gian.

##### `isAnimalYear(year, animal): boolean`

Kiểm tra xem một năm có phải của con giáp cụ thể hay không.

### Phát triển

#### Thiết lập

```bash
# Clone repository
git clone https://github.com/luutronghieu/vietnamese-zodiac-signs.git
cd vietnamese-zodiac-signs

# Cài đặt dependencies
npm install

# Chạy tests
npm test

# Build thư viện
npm run build

# Chạy linting
npm run lint
```

#### Kiểm thử

Thư viện bao gồm các bài kiểm thử đơn vị toàn diện:
- Tất cả con giáp và các năm tương ứng
- Các trường hợp biên (năm không hợp lệ, điều kiện biên)
- Đầu ra đa ngôn ngữ
- Truy vấn phạm vi năm
- Năm nhuận và thay đổi thế kỷ

Chạy tests với coverage:
```bash
npm run test:coverage
```

### Đóng góp

1. Fork repository
2. Tạo feature branch của bạn (`git checkout -b feature/amazing-feature`)
3. Commit các thay đổi (`git commit -m 'Add some amazing feature'`)
4. Push lên branch (`git push origin feature/amazing-feature`)
5. Mở Pull Request

### Giấy phép

Dự án này được cấp phép theo Giấy phép MIT - xem file [LICENSE](LICENSE) để biết chi tiết.

### Sự khác biệt với Tử Vi Trung Quốc

Tử vi Việt Nam tương tự như tử vi Trung Quốc nhưng có một điểm khác biệt quan trọng:
- **Con Mèo (Mão)** thay vì **con Thỏ** ở vị trí thứ 4

Thư viện này đặc biệt triển khai phiên bản tử vi Việt Nam.

---

## English

## Features

- 🇻🇳 Authentic Vietnamese zodiac system (includes Cat instead of Rabbit)
- 🔢 Convert birth year to zodiac animal
- 🌐 Support for both Vietnamese and English animal names
- 📅 Find all years for a specific animal within a range
- ✅ Comprehensive TypeScript support
- 🧪 Fully tested with Jest

## Installation

```bash
npm install vietnamese-zodiac-signs
```

## Usage

### Basic Usage

```typescript
import { getZodiacSign } from 'vietnamese-zodiac-signs';

const zodiac = getZodiacSign(1990);
console.log(zodiac);
// Output: {
//   vietnamese: 'Ngọ',
//   english: 'Horse',
//   year: 1990,
//   order: 7
// }
```

### Get Animal Names Only

```typescript
import { getZodiacAnimal } from 'vietnamese-zodiac-signs';

// Get both Vietnamese and English names (default)
const both = getZodiacAnimal(2000);
console.log(both); // { vietnamese: 'Thìn', english: 'Dragon' }

// Get only Vietnamese name
const vietnamese = getZodiacAnimal(2000, { language: 'vietnamese' });
console.log(vietnamese); // 'Thìn'

// Get only English name
const english = getZodiacAnimal(2000, { language: 'english' });
console.log(english); // 'Dragon'
```

### Find Years for Specific Animals

```typescript
import { getYearsForAnimal, VietnameseZodiacAnimal } from 'vietnamese-zodiac-signs';

const dragonYears = getYearsForAnimal(VietnameseZodiacAnimal.Dragon, 2000, 2030);
console.log(dragonYears); // [2000, 2012, 2024]
```

### Check if Year Matches Animal

```typescript
import { isAnimalYear, VietnameseZodiacAnimal } from 'vietnamese-zodiac-signs';

const isDragonYear = isAnimalYear(2024, VietnameseZodiacAnimal.Dragon);
console.log(isDragonYear); // true
```

## Vietnamese Zodiac Animals

The 12 animals in the Vietnamese zodiac cycle:

| Order | Vietnamese | English | Years (examples) |
|-------|------------|---------|------------------|
| 1     | Tý         | Rat     | 1900, 1912, 1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020 |
| 2     | Sửu        | Buffalo | 1901, 1913, 1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021 |
| 3     | Dần        | Tiger   | 1902, 1914, 1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022 |
| 4     | Mão        | Cat     | 1903, 1915, 1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023 |
| 5     | Thìn       | Dragon  | 1904, 1916, 1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024 |
| 6     | Tỵ         | Snake   | 1905, 1917, 1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025 |
| 7     | Ngọ        | Horse   | 1906, 1918, 1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026 |
| 8     | Mùi        | Goat    | 1907, 1919, 1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027 |
| 9     | Thân       | Monkey  | 1908, 1920, 1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028 |
| 10    | Dậu        | Rooster | 1909, 1921, 1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029 |
| 11    | Tuất       | Dog     | 1910, 1922, 1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030 |
| 12    | Hợi        | Pig     | 1911, 1923, 1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031 |

## API Reference

### Functions

#### `getZodiacSign(year: number): ZodiacSign`

Returns complete zodiac information for a given year.

**Parameters:**
- `year`: A 4-digit year (1-9999)

**Returns:** `ZodiacSign` object with Vietnamese name, English name, year, and order.

**Throws:** Error if year is invalid.

#### `getZodiacAnimal(year: number, options?: ZodiacOptions): string | object`

Returns zodiac animal name(s) for a given year.

**Parameters:**
- `year`: A 4-digit year
- `options`: Optional configuration object
  - `language`: 'vietnamese' | 'english' | 'both' (default: 'both')

**Returns:** String (if specific language) or object with both names.

#### `getYearsForAnimal(animal: VietnameseZodiacAnimal | EnglishZodiacAnimal, startYear: number, endYear: number): number[]`

Returns all years for a specific zodiac animal within a range.

**Parameters:**
- `animal`: Zodiac animal (Vietnamese or English enum value)
- `startYear`: Start year of the range
- `endYear`: End year of the range

**Returns:** Array of years that correspond to the specified animal.

#### `isAnimalYear(year: number, animal: VietnameseZodiacAnimal | EnglishZodiacAnimal): boolean`

Checks if a year corresponds to a specific zodiac animal.

**Parameters:**
- `year`: Year to check
- `animal`: Zodiac animal to match against

**Returns:** True if the year corresponds to the animal.

### Types and Enums

#### `VietnameseZodiacAnimal`

Enum containing Vietnamese names for zodiac animals.

#### `EnglishZodiacAnimal`

Enum containing English names for zodiac animals.

#### `ZodiacSign`

Interface representing complete zodiac information:
```typescript
interface ZodiacSign {
  vietnamese: VietnameseZodiacAnimal;
  english: EnglishZodiacAnimal;
  year: number;
  order: number; // 1-12
}
```

#### `ZodiacOptions`

Interface for configuration options:
```typescript
interface ZodiacOptions {
  language?: 'vietnamese' | 'english' | 'both';
}
```

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/luutronghieu/vietnamese-zodiac-signs.git
cd vietnamese-zodiac-signs

# Install dependencies
npm install

# Run tests
npm test

# Build the library
npm run build

# Run linting
npm run lint
```

### Testing

The library includes comprehensive unit tests covering:
- All zodiac animals and their corresponding years
- Edge cases (invalid years, boundary conditions)
- Multiple language outputs
- Year range queries
- Leap years and century changes

Run tests with coverage:
```bash
npm run test:coverage
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Differences from Chinese Zodiac

The Vietnamese zodiac is similar to the Chinese zodiac but with one important difference:
- **Cat (Mão)** instead of **Rabbit** in the 4th position

This library specifically implements the Vietnamese version of the zodiac system.
