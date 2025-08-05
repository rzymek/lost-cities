import {Result} from "./calculateResults.tsx"
import {cssLighten} from "./cssLighten.tsx"
import {colors} from "./expedition.tsx"

interface ScoringTableProps {
    value: Result[]
}

function ScoreCell({value, idx}: { value: string | number, idx: number }) {
    return <td style={{backgroundColor: cssLighten(colors[idx])}}>
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
        </tbody>
    </table>
}