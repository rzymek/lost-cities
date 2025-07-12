export type Card = string | number;

export const values: Card[] = [
    'x2',
    'x2',
    'x2',
    ...new Array(9).fill(0).map((_, idx) => idx + 2)
]

