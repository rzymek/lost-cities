import {clone, range} from "remeda"
import {Expedition, expeditions} from "./expedition.tsx"

const initialExpeditions = () => expeditions.reduce((acc, it) => ({
    ...acc,
    [it]: {},
}), {} as Record<Expedition, Record<number, boolean>>)

const initialMilestones = () => ({
    cards3: {
        yellow: false as boolean,
        blue: false as boolean,
        purple: false as boolean,
        green: false as boolean,
        orange: false as boolean,
    } satisfies Record<Expedition, boolean>,
    cards5: false as boolean,
    started3: false as boolean,
    consecutive3: false as boolean,
})
const initialState = {
    milestonesExpansion: false,
    selectedPlayer: 0,
    selectedMatch: 0,
    players: range(0, 2).map((playerIndex) => ({
        name: `Gracz ${playerIndex + 1}`,
        matches: range(0, 3).map(() => ({
            expeditions: initialExpeditions(),
            milestones: initialMilestones(),
        })),
    })),
    match() {
        return this.players[this.selectedPlayer].matches[this.selectedMatch]
    }
}

export const state = clone(initialState)

export function resetState() {
    const preserve: Partial<typeof state> = {
        milestonesExpansion: state.milestonesExpansion,
    }
    Object.assign(state, clone(initialState), preserve)
}