import {expeditionColors, expeditions} from "./expedition.tsx"
import {GridButton} from "./gridButton.tsx"
import {neutralColor} from "./neutralColor.tsx"
import {state} from "./state.tsx"
import {update} from "./update.ts"

export function MilestoneSelect() {
    return <div>
        <div style={{textAlign: "center"}}>
            Kto pierwszy ten lepszy:
        </div>
        <div className="grid-container">
            {expeditions.map((expedition) =>
                <GridButton color={expeditionColors[expedition]} key={expedition}
                            selected={state.match().milestones.cards3[expedition]}
                            onClick={update(() => state.match().milestones.cards3[expedition] = !state.match().milestones.cards3[expedition])}>
                    3 karty
                    {/*TODO:i18n*/}
                </GridButton>,
            )}
            <GridButton color={neutralColor}
                        selected={state.match().milestones.cards5}
                        onClick={update(() => state.match().milestones.cards5 = !state.match().milestones.cards5)}>
                5 kart
            </GridButton>
            <GridButton color={neutralColor}
                        selected={state.match().milestones.started3}
                        onClick={update(() => state.match().milestones.started3 = !state.match().milestones.started3)}
                        style={{gridColumn: "span 2"}}>
                3 rozpoczęte
            </GridButton>
            <GridButton color={neutralColor}
                        selected={state.match().milestones.consecutive3}
                        onClick={update(() => state.match().milestones.consecutive3 = !state.match().milestones.consecutive3)}
                        style={{
                            gridColumn: "span 2",
                            fontSize: "65%",
                            padding: "1mm",
                        }}>
                3 karty o kolejnych wartościach
            </GridButton>
        </div>
    </div>
}