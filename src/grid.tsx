import "./grid.css"
import {values} from "./values.tsx"
import {Expedition, expeditionColors, expeditions} from "./expedition.tsx"
import {GridButton} from "./gridButton.tsx"
import {state} from "./state.tsx"
import {update} from "./update.ts"

export type PlayerState = Record<Expedition, Record<number, boolean>>;

export function Grid() {
    const totalCells = 12 * 5
    const reverse = false
    const cells = Array.from({length: totalCells}, (_, i) => i + 1)
    return <>
        <div className="grid-container">
            {cells.map((cellNumber) => {
                    const expeditionIndex = (cellNumber - 1) % expeditions.length
                    const expedition = expeditions[reverse ? (expeditions.length - 1 - expeditionIndex) : expeditionIndex]
                    const cardIndex = Math.ceil(cellNumber / 5) - 1
                    return <GridButton key={cellNumber}
                                       color={expeditionColors[expedition]}
                                       selected={state.match().expeditions[expedition][cardIndex]}
                                       onClick={update(() => {
                                           state.match().expeditions[expedition][cardIndex] =
                                               !state.match().expeditions[expedition][cardIndex]
                                       })}>
                        {values[cardIndex]}
                    </GridButton>
                },
            )}
        </div>
    </>
}

