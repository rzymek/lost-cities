/*
KOLORY KART

Niebieski
R 76 G 186 B 235

Żółty
R 255 G 210 B 0

Zielony
R 82 G 175 B 48

Fioletowy
R 124 G 93 B165

Pomarańczowy
R 237 G 115 B 1
 */
export const colors = [
    "rgb(255,210,0)", // yellow
    "rgb(76,186,235)", // blue
    "rgb(124,93,165)", // purple
    "rgb(82,175,48)",  // green
    "rgb(237,115,1)",  // orange
] as const
export type Expedition = typeof colors[number];