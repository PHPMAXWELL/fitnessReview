import Repetitions from '../getRepetitions';

describe('Repetitions', () => {
  test('retourne la répétition qui correspond à l\'age 10', () => {
    expect(Repetitions(10)).toBe(20);
  });

  test('retourne la répétition qui correspond à l\'age 25', () => {
    expect(Repetitions(25)).toBe(18);
  });

  test('retourne la répétition qui correspond à l\'age 35', () => {
    expect(Repetitions(35)).toBe(15);
  });

  test('retourne la répétition qui correspond à l\'age 60', () => {
    expect(Repetitions(60)).toBe(12);
  });

  test('lorsque l\' age n\'est pas dans l\'intervalle', () => {
    expect(() => Repetitions(-1)).toThrow('L\' age n\'est pas dans l\'intervalle ');
    expect(() => Repetitions(101)).toThrow('L\' age n\'est pas dans l\'intervalle ');
  });
});

