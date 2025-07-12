export function cloneObj<T extends {}>(obj: T): T {
    if (typeof structuredClone === 'function') {
        return structuredClone(obj);
    } else {
        return JSON.parse(JSON.stringify(obj))
    }
}