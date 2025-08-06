import {Result} from "./calculateResults.tsx"
import {cssLighten} from "./cssLighten.tsx"
import {colors} from "./expedition.tsx"

interface ScoringTableProps {
    value: Result[]
}

function ScoreCell({value, idx, colSpan}: { value: string | number, idx?: number, colSpan?: number }) {
    return <td style={{backgroundColor: idx !== undefined ? cssLighten(colors[idx]) : undefined}}
               colSpan={colSpan}>
        {value}
    </td>
}

export function ScoringTable({value}: ScoringTableProps) {
    return <table>
        <tbody>
        <tr>
            <th>karty ekspedycji</th>
            {value.map((v, idx) =>
                <ScoreCell value={v.expeditionCards} idx={idx}/>,
            )}
        </tr>
        <tr>
            <th>sponsorzy</th>
            {value.map((v, idx) =>
                <ScoreCell value={v.sponsors > 1 ? `x${v.sponsors}` : "-"} idx={idx}/>,
            )}
        </tr>
        <tr>
            <th>wielka ekspedycja</th>
            {value.map((v, idx) =>
                <ScoreCell value={v.greatExpedition ? "+20" : "-"} idx={idx}/>,
            )}
        </tr>
        <tr>
            <th>kamienie milowe</th>
            {value.map((v, idx) =>
                <ScoreCell value={v.total /*TODO*/} idx={idx}/>,
            )}
        </tr>
        <tr>
            <th>suma ekspedycji</th>
            {value.map((v, idx) =>
                <ScoreCell value={v.total} idx={idx}/>,
            )}
        </tr>
        <tr>
            <th colSpan={value.length + 1}>kamienie milowe na koniec gry:</th>
        </tr>
        <tr>
            <th>więcej rozpoczętych ekspedycji</th>
            <th colSpan={value.length}></th>
        </tr>
        <tr>
            <th>więcej rozpoczętych ekspedycji</th>
            <th colSpan={value.length}></th>
        </tr>
        <tr>
            <th>ekspedycja (bez sponsorów) z największą liczbą punktów</th>
            <th colSpan={value.length}></th>
        </tr>
        <tr>
            <th>w ręku karty o mniejszej sumie wartości</th>
            <th colSpan={value.length}></th>
        </tr>
        <tr>
            <th>wynik</th>
            <ScoreCell colSpan={value.length} value={0}/>
        </tr>
        </tbody>
    </table>
}