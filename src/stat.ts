export default function selfstat(text: string) {
    //86383, pid            1
    // (node) , comm
    //S , state
    // 86371 , ppid
    // 86383 , pgrp         5
    // 86371 , session
    // 34817 , tty_nr
    // 86383 , tpgid
    // 4194304 , flags
    // 13348 ,  minflt      10
    //  0       , cminflt
    //14        , majflt
    // 0        , cmajflt
    //123   ,  utime
    //91    , stime  15
    //0 ,   cutime,
    //0 ,   cstime,
    //20,   priority ,
    //0     nice
    //11    num_threads     20
    //0     itrealvalue
    //6881749 starttime  (expressed in cock ticks)
    //636669952  vsize (virtual memory size in bytes)
    //10461    rss (resident set size, in nr of pages)
    //18446744073709551615  rsslim (soft limit of the rss of the process)       25
    //4194304  (startcode)
    //4199205  (endcode)
    //140732121962768 (startstack) address bottom of the stack
    //0     kstkesp current value of esp (stack pointer)
    //0     kstkeip (EIP pointer)                                                                30
    //0     signal  obsolete
    //0     blocked obsolete
    //4096  sigignore obsolete
    //134234626  sigcatch obsolete
    //0         wchan (place in the kernel where the process is sleeping)                           35
    //0
    //0
    //17        exit-signal
    //0         processor
    //0         rt_priority                                                                         40
    //0         policy
    //3         block io delays in clock ticks
    //0        guest time
    //0        (cguest_time)
    //4210024                                                                                  45
    //4210704
    //12226560
    //140732121964672
    //140732121964677
    //140732121964677                                                                       50
    //140732121968618
    //0                                                                                         52
    const lines = text.split('\n').filter((f) => f);
    const result: Record<string, unknown> = {};
    // there should be one line
    if (!lines.length) {
        return result;
    }
    const fields = lines[0].split(/\s+/).map((s) => {
        const trial = Number.parseInt(s, 10);
        if (isNaN(trial)) {
            return s;
        }
        return trial;
    });
    // stat
    result.pid = fields[0]; //86383
    result.comm = fields[1]; //  (node)
    result.state = fields[2]; // S
    result.ppid = fields[3]; // 86371
    result.pgrp = fields[4]; // 86383
    result.session = fields[5]; // 86371
    result.tty_nr = fields[6]; // 34817
    result.cminflt = fields[10];
    result.majflt = fields[11];
    result.cmajflt = fields[12];
    result.utime = fields[13];
    result.stime = fields[14];
    result.cutime = fields[15];
    result.cstime = fields[16];
    result.priority = fields[17];
    result.nice = fields[18];
    result.num_threads = fields[19];
    // skipped
    result.start_time = fields[21];
    result.vsize = fields[22];
    result.rss = fields[23];
    result.rsslim = fields[24];
    // skipped
    result.processor = fields[38];
    // skipped
    result.guest_time = fields[42];
    result.cguest_time = fields[43];
    return result;
}
