export function addCommas(a: string[]): string {
    if (a.length < 2) return a.join();
    return `${a.slice(0, a.length - 1).join(", ")} or ${a.at(-1)}`;
}