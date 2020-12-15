export default function selfStatm(text: string) {
    const values = text.split(/\s+/).map((n) => parseInt(n, 10));
    const result = ['size', 'resident', 'share', 'text', 'lib', 'data', 'dt'].reduce((c, s, i) => {
        c[s] = values[i];
        return c;
    }, {} as Record<string, unknown>);
    delete result.lib;
    delete result.dt;
    return result;
}
