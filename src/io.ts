export default function selfIo(text: string) {
    const lines = text.split('\n').filter((f) => f);
    const results = lines.reduce((c, line) => {
        const [key, value] = line.split(':').map((s) => s.trim());
        if (value) {
            c[key] = parseInt(value, 10);
        }
        return c;
    }, {} as Record<string, unknown>);
    return results;
}
