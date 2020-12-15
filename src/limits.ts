import isNumStr from './isNumStr';

export default function selfLimits(text: string) {
    const lines = text
        .split('\n')
        .filter((f) => f)
        .map((s) => s.toLowerCase());
    // get position from headers
    if (lines.length === 0) {
        return;
    }
    const header = lines.shift() as string;
    const p2 = header.search(/soft limit/);
    const p3 = header.search(/hard limit/);
    const p4 = header.search(/units/);

    const result: Record<string, any> = {};
    for (const line of lines) {
        const name = line.slice(0, p2).trim();
        const soft = line.slice(p2, p3).trim();
        const hard = line.slice(p3, p4).trim();
        const unit = line.slice(p4).trim();
        result[name] = {
            soft: isNumStr(soft) ? parseInt(soft, 10) : soft,
            hard: isNumStr(hard) ? parseInt(hard, 10) : hard,
        };
        if (unit) {
            result[name].unit = unit;
        }
    }
    return Object.keys(result).length ? result : undefined;
}
