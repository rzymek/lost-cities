export const expeditionColors = {
    yellow: "rgb(255,210,0)",
    blue: "rgb(76,186,235)",
    purple: "rgb(124,93,165)",
    green: "rgb(82,175,48)",
    orange: "rgb(237,115,1)",
} as const;

export const colors = Object.values(expeditionColors);
export type Expedition = keyof typeof expeditionColors;
export const expeditions = Object.keys(expeditionColors) as Expedition[];
