export default function selfStatus(text: string) {
    const lines = text.split('\n').filter((f) => f);
    const result: Record<string, unknown> = {};
    for (const line of lines) {
        const [key, value] = line.split(':').map((s) => s.trim().toLowerCase());
        if (
            [
                'uid',
                'gid',
                'groups',
                'sigq',
                'sigpnd',
                'shdpnd',
                'sigblk',
                'sigign',
                'sigcgt',
                'capinh',
                'capprm',
                'capeff',
                'capbnd',
                'capamb',
                'seccomp',
            ].includes(key)
        ) {
            continue;
        }
        result[key] = value;
    }
    return result;
}
