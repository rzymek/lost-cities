import {update} from "./update.ts"
import {resetState} from "./state.tsx"

export function NewGame() {
    return <div style={{textAlign: "center", margin: "5mm"}}>
        <button style={{height: "1cm", padding: "3mm"}}
                onClick={update(resetState)}>
            Nowa gra
        </button>
    </div>
}