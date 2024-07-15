

interface GroupAge {
  minAge: number;
  maxAge: number;
  repetitions: number;
}

const groupsAge: GroupAge[] = [
  { minAge: 0, maxAge: 17, repetitions: 20 },
  { minAge: 18, maxAge: 30, repetitions: 18 },
  { minAge: 31, maxAge: 50, repetitions: 15 },
  { minAge: 51, maxAge: 100, repetitions: 12 },
];

const Repetitions = (age: number): number => {
  const group = groupsAge.find(g => age >= g.minAge && age <= g.maxAge);
  if (group) {
    return group.repetitions;
  }
  throw new Error('L\' age n\'est pas dans l\'intervalle ');
}

export default Repetitions ;