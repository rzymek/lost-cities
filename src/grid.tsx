import "./grid.css"
import {cloneObj} from "./cloneObj.tsx"
import {useState} from "preact/hooks"
import {calculateResults} from "./calculateResults.tsx"
import {values} from "./values.tsx"
import {Expedition, expeditionColors, expeditions} from "./expedition.tsx"
import {cssLighten} from "./cssLighten.tsx"
import {ScoringTable} from "./scoringTable.tsx"
import {CSSProperties, ReactNode} from "preact/compat"

export type State = Record<Expedition, Record<number, boolean>>;

const neutralColor = "#dab184"

function MileStoleSelect() {
    return <div>
        <div style={{textAlign:'center'}}><label><input type="checkbox"/>Kamienie milowe</label></div>
        <div style={{textAlign:'center'}}>
            Kto pierwszy ten lepszy:
        </div>
        <div className="grid-container">
            {expeditions.map((expedition) =>
                <GridButton color={expeditionColors[expedition]} key={expedition}>
                    3 karty
                    {/*TODO:i18n*/}
                </GridButton>,
            )}
            <GridButton color={neutralColor}>
                5 kart
            </GridButton>
            <GridButton color={neutralColor} style={{
                gridColumn: "span 2",
            }}>
                3 rozpoczęte
            </GridButton>
            <GridButton color={neutralColor} style={{
                gridColumn: "span 2",
                fontSize: '65%',
                padding: '1mm',
            }}>
                3 karty o kolejnych wartościach
            </GridButton>
        </div>
    </div>
}

export function Grid() {
    const totalCells = 12 * 5
    const [reverse, setReverse] = useState(false)
    const cells = Array.from({length: totalCells}, (_, i) => i + 1)
    const [selected, setSelected] = useState(expeditions.reduce((acc, it) => ({
        ...acc,
        [it]: {},
    }), {} as State))
    const results = calculateResults(selected)
    const total = results.map((r) => r.total).reduce((a, b) => a + b, 0)
    return <>
        <div className="grid-container">
            {cells.map((cellNumber) => {
                    const expeditionIndex = (cellNumber - 1) % expeditions.length
                    const expedition = expeditions[reverse ? (expeditions.length - 1 - expeditionIndex) : expeditionIndex]
                    const cardIndex = Math.ceil(cellNumber / 5) - 1
                    return <GridButton key={cellNumber}
                                       color={expeditionColors[expedition]}
                                       selected={selected[expedition][cardIndex]}
                                       onClick={() => {
                                           setSelected((prev: any) => {
                                               const s = cloneObj(prev)
                                               s[expedition][cardIndex] = !s[expedition][cardIndex]
                                               return s
                                           })
                                       }}>
                        {values[cardIndex]}
                    </GridButton>
                },
            )}
        </div>
        <MileStoleSelect/>
        <ScoringTable value={results}/>
        <h1>{total}</h1>
        <h1>
            <button onClick={() => setReverse(v => !v)}>⟳</button>
        </h1>
    </>
}

function GridButton(props: {
    children: ReactNode,
    color: string,
    style?: CSSProperties,
    selected?: boolean,
    onClick?: () => void
}) {
    return <div className="grid-item" style={{
        backgroundColor: props.selected ? props.color : cssLighten(props.color),
        borderWidth: props.selected ? 3 : 1,
        borderColor: props.selected ? "darkBlue" : "lightGray",
        cursor: "pointer",
        width: "auto",
        ...props.style ?? {},
    }} onClick={props.onClick}>
        {props.children}
    </div>
}