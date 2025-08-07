import {state} from "./state.tsx"
import {update} from "./update.ts"

export function ExpansionCheckbox() {
    return <div style={{textAlign: "center"}}><label>
        <input type="checkbox" checked={state.milestonesExpansion}
               onChange={update((e) => {
                   state.milestonesExpansion = e.currentTarget.checked
               })}
        />Kamienie milowe</label>
    </div>
}