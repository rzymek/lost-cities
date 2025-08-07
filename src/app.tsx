import "./app.css"
import {Grid} from "./grid.tsx"
import {state} from "./state.tsx"
import {MilestoneSelect} from "./milestoneSelect.tsx"
import {ScoringTable} from "./scoringTable.tsx"
import {ExpansionCheckbox} from "./expansionCheckbox.tsx"
import {NewGame} from "./newGame.tsx"
import {MatchesTable} from "./matchesTable.tsx"

export function App() {
    return <div>
        <Grid/>
        <ExpansionCheckbox/>
        {state.milestonesExpansion && <MilestoneSelect/>}
        <ScoringTable/>
        <MatchesTable/>
        <NewGame/>
        <pre>
            {JSON.stringify(state, null, 2)}
        </pre>
    </div>
}

