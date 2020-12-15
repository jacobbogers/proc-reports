export default function uptime(text: string) {
    const [system, idle] = text
        .split(/\s+/)
        .filter((f) => f)
        .map((v) => parseFloat(v));
    return {
        system,
        idle,
    };
}
