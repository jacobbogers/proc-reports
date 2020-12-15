'use strict';

import { constants as CO } from '../src';
import { getProcReports, handlerMap } from '../src';

import expectedResult from './fixtures/result_smaps';

// remap handlers to fun and profit
const { cpuinfo } = handlerMap[CO.CPUINFO];
const { loadavg } = handlerMap[CO.LOADAVG];
const { meminfo } = handlerMap[CO.MEMINFO];
const { uptime } = handlerMap[CO.UPTIME];
const { buddy } = handlerMap[CO.BUDDYINFO];

const { io } = handlerMap[CO.SELF_IO];
const { smaps } = handlerMap[CO.SELF_SMAPS];
const { statm } = handlerMap[CO.SELF_STATM];
const { status } = handlerMap[CO.SELF_STATUS];
const { limits } = handlerMap[CO.SELF_LIMITS];
const { netDev } = handlerMap[CO.SELF_NET_DEV];
const { stat } = handlerMap[CO.SELF_STAT];

const C = {};

// point to fixtures instead

C[CO.CPUINFO] = require.resolve('./fixtures/cpuinfo.txt');
C[CO.LOADAVG] = require.resolve('./fixtures/loadavg.txt');
C[CO.MEMINFO] = require.resolve('./fixtures/meminfo.txt');
C[CO.UPTIME] = require.resolve('./fixtures/uptime.txt');
C[CO.BUDDYINFO] = require.resolve('./fixtures/buddyinfo.txt');

C[CO.SELF_IO] = require.resolve('./fixtures/self_io.txt');
C[CO.SELF_SMAPS] = require.resolve('./fixtures/self_smaps.txt');
C[CO.SELF_STATM] = require.resolve('./fixtures/self_statm.txt');
C[CO.SELF_STATUS] = require.resolve('./fixtures/self_status.txt');
C[CO.SELF_LIMITS] = require.resolve('./fixtures/self_limits.txt');
C[CO.SELF_STAT] = require.resolve('./fixtures/self_stat.txt');
C[CO.SELF_NET_DEV] = require.resolve('./fixtures/self_net_dev.txt');

const fixtureMap = {
    [C[CO.CPUINFO]]: { cpuinfo },
    [C[CO.LOADAVG]]: { loadavg },
    [C[CO.MEMINFO]]: { meminfo },
    [C[CO.UPTIME]]: { uptime },
    [C[CO.BUDDYINFO]]: { buddy },
    [C[CO.SELF_STAT]]: { stat },
    [C[CO.SELF_IO]]: { io },
    [C[CO.SELF_SMAPS]]: { smaps },
    [C[CO.SELF_STATM]]: { statm },
    [C[CO.SELF_STATUS]]: { status },
    [C[CO.SELF_LIMITS]]: { limits },
    [C[CO.SELF_NET_DEV]]: { netDev },
};

describe('proc', () => {
    // point to fixtures
    it('/proc/cpuinfo', async () => {
        const result = await getProcReports(fixtureMap, C[CO.CPUINFO]);
        console.log(result.cpuinfo.length);
        /*expect(result).to.deep.equal({
            cpuinfo: [
                {
                    'processor': '0',
                    'cpu family': '6',
                    'model name': 'Intel(R) Core(TM) i7-7500U CPU @ 2.70GHz',
                    'cache size': '4096 KB',
                    'physical id': '0',
                    'siblings': '1',
                    'cpu cores': '1'
                }
            ]
        });*/
    });
    it('/proc/loadavg', async () => {
        const result = await getProcReports(fixtureMap, C[CO.LOADAVG]);
        expect(result).toEqual({
            loadavg: { '1m': 0.37, '5m': 0.51, '10m': 0.75, crp: 6, trp: 688, lpu: 87233 },
        });
    });
    it('/proc/meminfo', async () => {
        const result = await getProcReports(fixtureMap, C[CO.MEMINFO]);
        expect(result).toEqual({
            meminfo: {
                MemTotal: '2919216 kB',
                MemFree: '91460 kB',
                MemAvailable: '893796 kB',
                Buffers: '83040 kB',
                Cached: '722300 kB',
                SwapCached: '10512 kB',
                Active: '1630436 kB',
                Inactive: '953648 kB',
                'Active(anon)': '1166192 kB',
                'Inactive(anon)': '512992 kB',
                'Active(file)': '464244 kB',
                'Inactive(file)': '440656 kB',
                Unevictable: '48 kB',
                Mlocked: '48 kB',
                SwapTotal: '1368676 kB',
                SwapFree: '520080 kB',
                Dirty: '68 kB',
                Writeback: '0 kB',
                AnonPages: '1768724 kB',
                Mapped: '309828 kB',
                Shmem: '70952 kB',
                KReclaimable: '64876 kB',
                Slab: '146820 kB',
                SReclaimable: '64876 kB',
                SUnreclaim: '81944 kB',
                KernelStack: '11024 kB',
                PageTables: '36592 kB',
                NFS_Unstable: '0 kB',
                Bounce: '0 kB',
                WritebackTmp: '0 kB',
                CommitLimit: '2828284 kB',
                Committed_AS: '8257020 kB',
                VmallocTotal: '34359738367 kB',
                VmallocUsed: '35808 kB',
                VmallocChunk: '0 kB',
                Percpu: '768 kB',
                HardwareCorrupted: '0 kB',
                AnonHugePages: '0 kB',
                ShmemHugePages: '0 kB',
                ShmemPmdMapped: '0 kB',
                FileHugePages: '0 kB',
                FilePmdMapped: '0 kB',
                CmaTotal: '0 kB',
                CmaFree: '0 kB',
                HugePages_Total: '0',
                HugePages_Free: '0',
                HugePages_Rsvd: '0',
                HugePages_Surp: '0',
                Hugepagesize: '2048 kB',
                Hugetlb: '0 kB',
                DirectMap4k: '229312 kB',
                DirectMap2M: '2768896 kB',
            },
        });
    });
    it('/proc/uptime', async () => {
        const result = await getProcReports(fixtureMap, C[CO.UPTIME]);
        expect(result).toEqual({ uptime: { system: 778611.5, idle: 489146.81 } });
    });
    it('/proc/self/io', async () => {
        const result = await getProcReports(fixtureMap, C[CO.SELF_IO]);
        expect(result).toEqual({
            io: {
                rchar: 4292,
                wchar: 0,
                syscr: 13,
                syscw: 0,
                read_bytes: 0,
                write_bytes: 0,
                cancelled_write_bytes: 0,
            },
        });
    });
    it('/proc/self/smaps', async () => {
        const result = await getProcReports(fixtureMap, C[CO.SELF_SMAPS]);
        expect(result).toEqual(expectedResult);
    });
    it('/proc/self/statm', async () => {
        const result = await getProcReports(fixtureMap, C[CO.SELF_STATM]);
        expect(result).toEqual({ statm: { size: 155437, resident: 10461, share: 6356, text: 2, data: 23709 } });
    });
    it('/proc/self/status', async () => {
        const result = await getProcReports(fixtureMap, C[CO.SELF_STATUS]);
        expect(result).toEqual({
            status: {
                name: 'node',
                umask: '0002',
                state: 's (sleeping)',
                tgid: '86383',
                ngid: '0',
                pid: '86383',
                ppid: '86371',
                tracerpid: '0',
                fdsize: '256',
                nstgid: '86383',
                nspid: '86383',
                nspgid: '86383',
                nssid: '86371',
                vmpeak: '621752 kb',
                vmsize: '621748 kb',
                vmlck: '0 kb',
                vmpin: '0 kb',
                vmhwm: '41868 kb',
                vmrss: '41844 kb',
                rssanon: '16420 kb',
                rssfile: '25424 kb',
                rssshmem: '0 kb',
                vmdata: '94704 kb',
                vmstk: '132 kb',
                vmexe: '8 kb',
                vmlib: '21644 kb',
                vmpte: '536 kb',
                vmswap: '0 kb',
                hugetlbpages: '0 kb',
                coredumping: '0',
                thp_enabled: '1',
                threads: '11',
                nonewprivs: '0',
                speculation_store_bypass: 'vulnerable',
                cpus_allowed: '1',
                cpus_allowed_list: '0',
                mems_allowed:
                    '00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000001',
                mems_allowed_list: '0',
                voluntary_ctxt_switches: '1141',
                nonvoluntary_ctxt_switches: '1731',
            },
        });
    });
    it('/proc/buddyinfo', async () => {
        const result = await getProcReports(fixtureMap, C[CO.BUDDYINFO]);
        expect(result).toEqual({
            buddy: {
                'Node 0': {
                    DMA: [49, 18, 10, 4, 4, 1, 2, 2, 3, 1, 1],
                    DMA32: [3902, 2199, 335, 482, 125, 68, 11, 5, 1, 1, 1],
                },
            },
        });
    });
    it('/proc/self/limits', async () => {
        const result = await getProcReports(fixtureMap, C[CO.SELF_LIMITS]);
        expect(result).toEqual({
            limits: {
                'max cpu time': { soft: 'unlimited', hard: 'unlimited', unit: 'seconds' },
                'max file size': { soft: 'unlimited', hard: 'unlimited', unit: 'bytes' },
                'max data size': { soft: 'unlimited', hard: 'unlimited', unit: 'bytes' },
                'max stack size': { soft: 8388608, hard: 'unlimited', unit: 'bytes' },
                'max core file size': { soft: 0, hard: 'unlimited', unit: 'bytes' },
                'max resident set': { soft: 'unlimited', hard: 'unlimited', unit: 'bytes' },
                'max processes': { soft: 11182, hard: 11182, unit: 'processes' },
                'max open files': { soft: 1048576, hard: 1048576, unit: 'files' },
                'max locked memory': { soft: 67108864, hard: 67108864, unit: 'bytes' },
                'max address space': { soft: 'unlimited', hard: 'unlimited', unit: 'bytes' },
                'max file locks': { soft: 'unlimited', hard: 'unlimited', unit: 'locks' },
                'max pending signals': { soft: 11182, hard: 11182, unit: 'signals' },
                'max msgqueue size': { soft: 819200, hard: 819200, unit: 'bytes' },
                'max nice priority': { soft: 0, hard: 0 },
                'max realtime priority': { soft: 0, hard: 0 },
                'max realtime timeout': { soft: 'unlimited', hard: 'unlimited', unit: 'us' },
            },
        });
    });
    it('/proc/self/stat', async () => {
        const result = await getProcReports(fixtureMap, C[CO.SELF_STAT]);
        expect(result).toEqual({
            stat: {
                pid: 86383,
                comm: '(node)',
                state: 'S',
                ppid: 86371,
                pgrp: 86383,
                session: 86371,
                tty_nr: 34817,
                cminflt: 0,
                majflt: 14,
                cmajflt: 0,
                utime: 123,
                stime: 91,
                cutime: 0,
                cstime: 0,
                priority: 20,
                nice: 0,
                num_threads: 11,
                start_time: 6881749,
                vsize: 636669952,
                rss: 10461,
                rsslim: 18446744073709552000,
                processor: 0,
                guest_time: 0,
                cguest_time: 0,
            },
        });
    });
    it('/proc/self/net/dev', async () => {
        const result = await getProcReports(fixtureMap, C[CO.SELF_NET_DEV]);
        expect(result).toEqual({
            netDev: {
                lo: {
                    receive: {
                        bytes: 5548092,
                        packets: 85227,
                        errs: 0,
                        drop: 0,
                        fifo: 0,
                        frame: 0,
                        compressed: 0,
                        multicast: 0,
                    },
                    transmit: {
                        bytes: 5548092,
                        packets: 85227,
                        errs: 0,
                        drop: 0,
                        fifo: 0,
                        colls: 0,
                        carrier: 0,
                        compressed: 0,
                    },
                },
                enp0s3: {
                    receive: {
                        bytes: 1069906047,
                        packets: 813995,
                        errs: 0,
                        drop: 0,
                        fifo: 0,
                        frame: 0,
                        compressed: 0,
                        multicast: 0,
                    },
                    transmit: {
                        bytes: 14541176,
                        packets: 101662,
                        errs: 0,
                        drop: 0,
                        fifo: 0,
                        colls: 0,
                        carrier: 0,
                        compressed: 0,
                    },
                },
            },
        });
    });
});
