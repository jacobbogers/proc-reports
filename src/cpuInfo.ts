export default function (text: string) {
    const keys = [
        'processor',
        'vendor_id',
        'cpu family',
        'model name',
        'physical id',
        'siblings',
        'cpu MHz',
        'cache size',
        'cpu cores',
        'apicid',
    ];
    const results: Record<string, unknown>[] = [];
    for (const processor of text.split(/\n{2,}/).filter((f) => f)) {
        const entryLines = processor.split('\n').filter((f) => f);
        const cpu: Record<string, unknown> = {};
        for (const line of entryLines) {
            const [key, value] = line.split(':').map((s) => s.trim());
            if (keys.includes(key) && value) {
                cpu[key] = value;
            }
        }
        if (Object.keys(cpu).length === keys.length) {
            results.push(cpu);
        }
    }
    return results;
}
