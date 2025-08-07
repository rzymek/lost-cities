import {calculateResults, total} from "./calculateResults.tsx"
import {cssLighten} from "./cssLighten.tsx"
import {colors} from "./expedition.tsx"
import {state} from "./state.tsx"
import {reverse} from "remeda"

function ScoreCell({value, idx, colSpan}: { value: string | number, idx?: number, colSpan?: number }) {
    const reversed = state.selectedPlayer === 1
    return <td
        style={{
            backgroundColor: idx !== undefined
                ? cssLighten(colors[reversed ? colors.length - 1 - idx : idx])
                : undefined,
        }}
        colSpan={colSpan}>
        {value}
    </td>
}

export function ScoringTable() {
    const value = calculateResults(state.match().expeditions)
    const reversed = state.selectedPlayer === 1
    const result = reversed ? reverse(value) : value
    return <table>
        <tbody>
        <tr>
            <th>karty ekspedycji</th>
            {result.map((v, idx) =>
                <ScoreCell value={v.expeditionCards} idx={idx}/>,
            )}
        </tr>
        <tr>
            <th>sponsorzy</th>
            {result.map((v, idx) =>
                <ScoreCell value={v.sponsors > 1 ? `x${v.sponsors}` : "-"} idx={idx}/>,
            )}
        </tr>
        <tr>
            <th>wielka ekspedycja</th>
            {result.map((v, idx) =>
                <ScoreCell value={v.greatExpedition ? "+20" : "-"} idx={idx}/>,
            )}
        </tr>
        <tr>
            <th>suma ekspedycji</th>
            {result.map((v, idx) =>
                <ScoreCell value={v.total} idx={idx}/>,
            )}
        </tr>
        {state.milestonesExpansion && <>
            <tr>
                <th>kamienie milowe</th>
                <th colSpan={result.length}></th>
            </tr>
            <tr>
                <th>- kto pierwszy ten lepszy</th>
                <th colSpan={result.length}></th>
            </tr>
            <tr>
                <th>- więcej rozpoczętych ekspedycji</th>
                <th colSpan={result.length}></th>
            </tr>
            <tr>
                <th>- więcej rozpoczętych ekspedycji</th>
                <th colSpan={result.length}></th>
            </tr>
            <tr>
                <th>- ekspedycja (bez sponsorów) z największą liczbą punktów</th>
                <th colSpan={result.length}></th>
            </tr>
            <tr>
                <th>- w ręku karty o mniejszej sumie wartości</th>
                <th colSpan={result.length}></th>
            </tr>
        </>}
        <tr>
            <th>wynik</th>
            <ScoreCell colSpan={result.length} value={total(result)}/>
        </tr>
        </tbody>
    </table>
}