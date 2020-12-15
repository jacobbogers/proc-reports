import * as fs from 'fs';
import cpuinfo from './cpuInfo';
import io from './io';
import smaps from './smaps';
import statm from './statm';
import status from './status';
import buddy from './buddy';
import loadavg from './loadavg';
import meminfo from './memInfo';
import netDev from './netDev';
import uptime from './uptime';
import limits from './limits';
import stat from './stat';

enum C {
    CPUINFO = '/proc/cpuinfo',
    MEMINFO = '/proc/meminfo',
    LOADAVG = '/proc/loadavg',
    UPTIME = '/proc/uptime',
    BUDDYINFO = '/proc/buddyinfo',
    SELF_IO = '/proc/self/io',
    SELF_STAT = '/proc/self/stat',
    SELF_SMAPS = '/proc/self/smaps',
    SELF_STATM = '/proc/self/statm',
    SELF_STATUS = '/proc/self/status',
    SELF_LIMITS = '/proc/self/limits',
    SELF_NET_DEV = '/proc/self/net/dev',
}

export { C as constants };

export const handlerMap = {
    [C.CPUINFO]: { cpuinfo },
    [C.LOADAVG]: { loadavg },
    [C.MEMINFO]: { meminfo },
    [C.UPTIME]: { uptime },
    [C.SELF_STAT]: { stat },
    [C.SELF_IO]: { io },
    [C.SELF_SMAPS]: { smaps },
    [C.SELF_STATM]: { statm },
    [C.SELF_STATUS]: { status },
    [C.BUDDYINFO]: { buddy },
    [C.SELF_LIMITS]: { limits },
    [C.SELF_NET_DEV]: { netDev },
};

function loadFile(path: string): Promise<string> {
    const readable = fs.createReadStream(path, { flags: 'r', emitClose: true, start: 0 });
    readable.setEncoding('utf8');
    return new Promise((resolve, reject) => {
        const chunks: string[] = [];
        readable.on('data', (chunk: string) => {
            chunks.push(chunk);
        });
        readable.on('close', () => {
            resolve(chunks.join(''));
        });
        readable.on('end', () => {
            resolve(chunks.join(''));
        });
        readable.on('error', (err) => {
            reject(err);
        });
    });
}

export type Slice<X extends Record<string, unknown>> = {
    [P in keyof X]: X[P];
};

type Handler = (s: string) => Record<string, any>;

export function getProcReports<T extends Record<string, unknown>>(handlers: Slice<T>, ...procList: (keyof T)[]) {
    const promises: Promise<string>[] = [];
    if (procList.length === 0) {
        procList = Object.keys(handlers);
    }

    for (let i = 0; i < procList.length; i++) {
        promises.push(loadFile(procList[i] as string));
    }

    return Promise.allSettled(promises).then((allSettled) => {
        // process all raw data
        const result: Record<string, any | Handler> = {};
        allSettled.reduce((final, settle, i) => {
            const [[shortName, handler]] = Object.entries<Handler>(handlers[procList[i]] as any);
            if (settle.status === 'rejected') {
                final[shortName] = String(settle.reason);
            } else {
                const resultObj = handler(settle.value);
                if (resultObj) {
                    final[shortName] = resultObj;
                }
            }
            return final;
        }, result);
        return result;
    });
}
