import "./grid.css"
import {cloneObj} from "./cloneObj.tsx"
import {useState} from "preact/hooks"
import {calculateResults} from "./calculateResults.tsx"
import {values} from "./values.tsx"
import {colors, Expedition} from "./expedition.tsx"
import {cssLighten} from "./cssLighten.tsx"
import {ScoringTable} from "./scoringTable.tsx"

export type State = Record<Expedition, Record<number, boolean>>;

export function Grid() {
    const totalCells = 12 * 5
    const [reverse, setReverse] = useState(false)
    const cells = Array.from({length: totalCells}, (_, i) => i + 1)
    const [selected, setSelected] = useState(colors.reduce((acc, it) => ({
        ...acc,
        [it]: {},
    }), {} as State))
    const results = calculateResults(selected)
    const total = results.map((r) => r.total).reduce((a, b) => a + b, 0)
    return <>
        <div className="grid-container">
            {cells.map((cellNumber) => {
                    const colorIndex = (cellNumber - 1) % colors.length
                    const expedition = colors[reverse ? (colors.length - 1 - colorIndex) : colorIndex]
                    const cardIndex = Math.ceil(cellNumber / 5) - 1
                    return <GridButton key={cellNumber}
                                       cardIndex={cardIndex}
                                       column={expedition}
                                       selected={selected[expedition][cardIndex]}
                                       onClick={(cardIndex, column) => {
                                           setSelected((prev: any) => {
                                               const s = cloneObj(prev)
                                               s[column][cardIndex] = !s[column][cardIndex]
                                               return s
                                           })
                                       }}/>
                },
            )}
        </div>
        <ScoringTable value={results}/>
        <h1>{total}</h1>
        <h1>
            <button onClick={() => setReverse(v => !v)}>⟳</button>
        </h1>
    </>
}

function GridButton(props: {
    cardIndex: number,
    column: Expedition,
    selected?: boolean,
    onClick: (cardIndex: number, column: Expedition) => void
}) {
    const color = props.column
    return <div className="grid-item" style={{
        backgroundColor: props.selected ? color : cssLighten(color),
        borderWidth: props.selected ? 3 : 1,
        borderColor: props.selected ? "darkBlue" : "lightGray",
        cursor: "pointer",
    }} onClick={() => props.onClick(props.cardIndex, props.column)}>
        {values[props.cardIndex]}
    </div>
}