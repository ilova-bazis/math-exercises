export interface Problem {
  a: number
  b: number
  answer: number
}

export interface Level {
  id: number
  name: string
  description: string
  generate: () => Problem
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function genLevel1(): Problem {
  const a = randInt(0, 10)
  const b = pick([0, 1])
  return { a, b, answer: a + b }
}

function genLevel2(): Problem {
  const flip = Math.random() < 0.5
  const a = randInt(0, 8)
  const b = 2
  return flip ? { a, b, answer: a + b } : { a: b, b: a, answer: a + b }
}

function genLevel3(): Problem {
  const flip = Math.random() < 0.5
  const a = randInt(0, 7)
  const b = 3
  return flip ? { a, b, answer: a + b } : { a: b, b: a, answer: a + b }
}

function genLevel4(): Problem {
  const a = randInt(0, 6)
  const b = pick([2, 3, 4])
  return { a, b, answer: a + b }
}

function genLevel5(): Problem {
  const a = randInt(0, 5)
  const b = pick([4, 5])
  return { a, b, answer: a + b }
}

function genLevel6(): Problem {
  const a = randInt(0, 9)
  const b = pick([6, 7])
  return { a, b, answer: a + b }
}

function genLevel7(): Problem {
  const a = randInt(0, 9)
  const b = pick([8, 9])
  return { a, b, answer: a + b }
}

function genLevel8(): Problem {
  const a = randInt(10, 99)
  const b = randInt(0, 9)
  return { a, b, answer: a + b }
}

function genLevel9(): Problem {
  let a = randInt(10, 99)
  let b = randInt(10, 99)
  while ((a % 10) + (b % 10) >= 10) {
    a = randInt(10, 99)
    b = randInt(10, 99)
  }
  return { a, b, answer: a + b }
}

function genLevel10(): Problem {
  let a = randInt(10, 99)
  let b = randInt(10, 99)
  while ((a % 10) + (b % 10) < 10) {
    a = randInt(10, 99)
    b = randInt(10, 99)
  }
  return { a, b, answer: a + b }
}

function genLevel11(): Problem {
  const a = randInt(100, 999)
  const b = randInt(10, 99)
  return { a, b, answer: a + b }
}

function genLevel12(): Problem {
  const a = randInt(100, 999)
  const b = randInt(100, 999)
  return { a, b, answer: a + b }
}

function genLevel13(): Problem {
  const a = randInt(1000, 9999)
  const b = randInt(1000, 9999)
  return { a, b, answer: a + b }
}

export const POINTS: Record<number, number> = {
  1: 5,
  2: 8,
  3: 10,
  4: 12,
  5: 15,
  6: 18,
  7: 20,
  8: 25,
  9: 30,
  10: 35,
  11: 45,
  12: 55,
  13: 70,
}

export const LEVELS: Level[] = [
  { id: 1, name: '+0,+1', description: 'Sums up to 10', generate: genLevel1 },
  { id: 2, name: '+2', description: 'Sums up to 10', generate: genLevel2 },
  { id: 3, name: '+3', description: 'Sums up to 10', generate: genLevel3 },
  { id: 4, name: '+2,+3,+4', description: 'Sums up to 10', generate: genLevel4 },
  { id: 5, name: '+4,+5', description: 'Sums up to 10', generate: genLevel5 },
  { id: 6, name: '+6,+7', description: 'Sums up to 20', generate: genLevel6 },
  { id: 7, name: '+8,+9', description: 'Sums up to 20', generate: genLevel7 },
  { id: 8, name: '2-digit+1', description: 'Two-digit + one-digit', generate: genLevel8 },
  { id: 9, name: 'No Carry', description: 'Two-digit, no carrying', generate: genLevel9 },
  { id: 10, name: 'Carry', description: 'Two-digit, with carrying', generate: genLevel10 },
  { id: 11, name: '3-digit', description: 'Three-digit + two-digit', generate: genLevel11 },
  { id: 12, name: 'Big', description: 'Three-digit + three-digit', generate: genLevel12 },
  { id: 13, name: 'Max', description: 'Four-digit + four-digit', generate: genLevel13 },
]

export function generateProblem(levelId: number): Problem {
  const level = LEVELS.find((l) => l.id === levelId) ?? LEVELS[0]
  return level.generate()
}
