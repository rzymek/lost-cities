import {CSSProperties, ReactNode } from "preact/compat"
import {cssLighten} from "./cssLighten.tsx"

export function GridButton(props: {
    children: ReactNode,
    color: string,
    style?: CSSProperties,
    selected?: boolean,
    onClick?: () => void
}) {
    return <div className="grid-item" style={{
        backgroundColor: props.selected ? props.color : cssLighten(props.color),
        borderWidth: props.selected ? 3 : 1,
        borderColor: props.selected ? "darkBlue" : "lightGray",
        cursor: "pointer",
        width: "auto",
        ...props.style ?? {},
    }} onClick={props.onClick}>
        {props.children}
    </div>
}