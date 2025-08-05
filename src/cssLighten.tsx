export function cssLighten(color: string) {
    return `color-mix(in srgb, ${color} 40%, white)`
}