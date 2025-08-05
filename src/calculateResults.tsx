import {State} from "./grid.tsx";
import {values} from "./values.tsx";

export type Result = ReturnType<typeof calculateResults>[number];
export type Results = Result[];

export function calculateResults(selected: State) {
    return Object.values(selected).map((cards) => {
        const selectedCards = Object.entries(cards)
            .filter(([, selected]) => selected)
            .map(([cardIndex,]) => values[Number(cardIndex)]);
        console.log({selectedCards, selected})
        const expeditionCards = selectedCards.filter(card => typeof (card) === 'number').reduce((a, b) => a + b, 0);
        const expeditionCost = selectedCards.length === 0 ? 0 : -20;
        const sponsors = selectedCards.filter(card => card === 'x2').length + 1;
        const greatExpedition = selectedCards.length >= 8;
        const total = (expeditionCards + expeditionCost) * sponsors + (greatExpedition ? 20 : 0);
        return {
            total,
            expeditionCards,
            expeditionCost,
            sponsors,
            greatExpedition,
        };
    });
}