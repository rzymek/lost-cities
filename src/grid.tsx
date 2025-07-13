import './grid.css';
import {cloneObj} from "./cloneObj.tsx";
import {useState} from "preact/hooks";
import {calculateResults, Result} from "./calculateResults.tsx";
import {values} from "./values.tsx";
import {colors, Expedition} from "./expedition.tsx"; // Make sure to create this CSS file

export type State = Record<Expedition, Record<number, boolean>>;

export function Grid() {
    const totalCells = 12 * 5;
    const [reverse, setReverse]=useState(false);
    const cells = Array.from({length: totalCells}, (_, i) => i + 1);
    const [selected, setSelected] = useState(colors.reduce((acc, it) => ({
        ...acc,
        [it]: {}
    }), {} as State));
    const results = calculateResults(selected);
    const total = results.map(([subtotal]) => subtotal as number).reduce((a, b) => a + b, 0);
    return <>
        <div className="grid-container">
            {cells.map((cellNumber) => {
                    const colorIndex = 
                    const expedition = colors[reverse ? colors.length-1 - colorIndex:colorIndex];
                    const cardIndex = Math.ceil(cellNumber / 5) - 1
                    return <GridButton key={cellNumber}
                                       cardIndex={cardIndex}
                                       column={expedition}
                                       selected={selected[expedition][cardIndex]}
                                       onClick={(cardIndex, column) => {
                                           setSelected((prev: any) => {
                                               const s = cloneObj(prev);
                                               s[column][cardIndex] = !s[column][cardIndex];
                                               return s;
                                           })
                                       }}/>;
                }
            )}
            {results.map((result, idx) =>
                <GridValue key={idx} value={result}/>)}
        </div>
        <h1>{total}</h1>
        <button onClick={()=>setReverse(v=>!v)}>⟳</button>
    </>;
}

function GridValue(props: { value: Result }) {
    return <div className="grid-item" style={{
        whiteSpace: 'pre-line',
        height: 'auto'
    }}>{props.value.join('\n')}</div>
}

function GridButton(props: {
    cardIndex: number,
    column: Expedition,
    selected?: boolean,
    onClick: (cardIndex: number, column: Expedition) => void
}) {
    const color = props.column;
    return <div className="grid-item" style={{
        backgroundColor: props.selected ? color : `color-mix(in srgb, ${color} 40%, white)`,
        borderWidth: props.selected ? 3 : 1,
        borderColor: props.selected ? 'darkBlue' : 'lightGray',
        cursor: 'pointer',
    }} onClick={() => props.onClick(props.cardIndex, props.column)}>
        {values[props.cardIndex]}
    </div>
}