import { getYearsForAnimal } from '../zodiac';
import { VietnameseZodiacAnimal } from '../types';

describe('Performance Tests', () => {
  describe('getYearsForAnimal performance', () => {
    test('should handle large year ranges efficiently', () => {
      const startTime = performance.now();
      
      // Test with a large range (1000 years)
      const dragonYears = getYearsForAnimal(
        VietnameseZodiacAnimal.Dragon, 
        1000, 
        2000
      );
      
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      
      // Should find correct number of dragon years (1000 / 12 ≈ 83 years)
      expect(dragonYears).toHaveLength(84); // 84 Dragon years in this range
      
      // Should execute in reasonable time (< 10ms for 1000 years)
      expect(executionTime).toBeLessThan(10);
      
      // Verify first and last years are correct
      expect(dragonYears[0]).toBe(1004); // First Dragon year >= 1000
      expect(dragonYears[dragonYears.length - 1]).toBe(2000); // Last Dragon year <= 2000
    });

    test('should handle very large ranges without performance issues', () => {
      const startTime = performance.now();
      
      // Test with a very large range (10000 years)
      const ratYears = getYearsForAnimal(
        VietnameseZodiacAnimal.Rat, 
        1, 
        10000
      );
      
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      
      // Should find correct number of rat years (10000 / 12 ≈ 834 years)
      expect(ratYears).toHaveLength(834); // 834 Rat years in this range
      
      // Should execute in reasonable time (< 50ms for 10000 years)
      expect(executionTime).toBeLessThan(50);
    });

    test('should be consistent across multiple calls', () => {
      const iterations = 100;
      const results: number[][] = [];
      
      const startTime = performance.now();
      
      for (let i = 0; i < iterations; i++) {
        const years = getYearsForAnimal(
          VietnameseZodiacAnimal.Tiger, 
          2000, 
          2100
        );
        results.push(years);
      }
      
      const endTime = performance.now();
      const averageTime = (endTime - startTime) / iterations;
      
      // All results should be identical
      results.forEach(result => {
        expect(result).toEqual(results[0]);
      });
      
      // Average time per call should be very fast (< 1ms)
      expect(averageTime).toBeLessThan(1);
    });
  });

  describe('Memory efficiency tests', () => {
    test('should not create unnecessary objects', () => {
      // Test that the function doesn't leak memory or create excessive objects
      const initialMemory = process.memoryUsage().heapUsed;
      
      // Run many iterations
      for (let i = 0; i < 1000; i++) {
        getYearsForAnimal(VietnameseZodiacAnimal.Snake, 1900 + i, 2000 + i);
      }
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }
      
      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;
      
      // Memory increase should be minimal (< 1MB)
      expect(memoryIncrease).toBeLessThan(1024 * 1024);
    });
  });
});
