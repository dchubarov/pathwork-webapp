export function clipText(s: any, max: number, breakWords?: boolean, ellipsis?: string | boolean): string | undefined {
    if (s === undefined) return undefined;
    const text: string = (typeof s === "string") ? s : s.toString();

    if (max < 1 || text.length < max)
        return text;

    let remaining = max;
    return text.trim().split(/\s/)
            .map(value => value.trim())
            .map((value, index) => {
                const l = value.length;
                if (l > 0) {
                    const whitespace = index > 0 ? 1 : 0
                    if (remaining >= value.length + whitespace) {
                        remaining -= value.length + whitespace;
                        return value;
                    } else {
                        const end = remaining - whitespace; remaining = 0;
                        return (breakWords || index === 0 ? value.substring(0, end) : "");
                    }
                }
                return "";
            })
            .filter(value => value.length > 0)
            .join(" ")
        + (ellipsis !== false ? (typeof ellipsis === "string" ? ellipsis : "\u2026") : "");
}
