export function PlayerName({value = "", onChange}: { value: string; onChange(name: string): void; }) {
    return <input size={value.length || 1}
                  maxLength={10}
                  value={value}
                  onChange={e => onChange(e.currentTarget.value)}
                  onFocus={e => e.currentTarget.select()}
                  style={{
                      fontSize: "100%",
                      width: "100%",
                      borderStyle: "none",
                      padding: 0,
                      textAlign: "center",
                  }}/>
}
