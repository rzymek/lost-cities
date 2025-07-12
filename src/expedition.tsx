export const colors = [
    'yellow',
    'blue',
    'violet',
    'green',
    'orange',
] as const;
export type Expedition = typeof colors[number];