import {state} from "./state.tsx"
import {PlayerName} from "./PlayerName.tsx"
import {update} from "./update.ts"
import {calculateResults, total} from "./calculateResults.tsx"
import {filter, flatMap, pipe, sum, values} from "remeda"

function isAnyExpeditionCardSelected(player: typeof state.players[0], matchIndex: number): boolean {
    return pipe(
        player.matches[matchIndex].expeditions,
        values(),
        flatMap(e => values(e)),
        cards => cards.some(c => c === true),
    )
}

export function MatchesTable() {
    const results = state.players[0].matches
        .map((_, matchIndex) =>
            state.players.map((player) =>
                isAnyExpeditionCardSelected(player, matchIndex)
                    ? total(calculateResults(player.matches[matchIndex].expeditions))
                    : NaN,
            ),
        )
    return <table style={{width: "auto", borderCollapse: "collapse", margin: "5mm", whiteSpace: "nowrap"}}>
        <tbody>
        <tr>
            <th style={{width: "1%", textAlign: "left"}}>Gracz:</th>
            {state.players.map((player, idx) =>
                <th key={idx} style={{padding: 0}}>
                    <PlayerName value={player.name}
                                onChange={update((s) => {
                                    state.players[idx].name = s
                                })}/>
                </th>)}
        </tr>
        {results.map((result, matchIndex) =>
            <tr key={matchIndex}>
                <th>Rozgrywka {matchIndex + 1}</th>
                {result.map((total, playerIndex) =>
                    <td key={playerIndex}
                        onClick={update(() => {
                            state.selectedPlayer = playerIndex
                            state.selectedMatch = matchIndex
                        })}
                        style={{
                            backgroundColor: state.selectedPlayer === playerIndex && state.selectedMatch === matchIndex
                                ? "lightblue" : undefined,
                            cursor: "pointer",
                            height: "1cm",
                        }}>
                        {isFinite(total) ? total : ""}
                    </td>,
                )}
            </tr>)}
        <tr>
            <th>Suma</th>
            {state.players.map((_, playerIndex) => {
                    const matchTotals = results.map(playerMatches => playerMatches[playerIndex])
                    return <td key={playerIndex} style={{padding: 0, height: "8mm"}}>{
                        matchTotals.some(isFinite)
                            ? pipe(matchTotals, filter(isFinite), sum)
                            : ""
                    }</td>
                },
            )}
        </tr>
        </tbody>
    </table>
}

