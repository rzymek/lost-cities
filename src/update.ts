import {state} from "./state.tsx"

update.rerender = ()=>{};

export function update<T, A extends unknown[]>(fn: (...args: A) => T): (...args: A) => T {
    return (...args: A) => {
        try {
            console.log(state);
            console.log(args);
            return fn(...args)
        } finally {
            update.rerender()
        }
    }
}