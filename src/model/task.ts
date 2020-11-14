
const TASK_INIT = 1;
const TASK_RUNNING = 2;
const TASK_END = 3;

export {
    TASK_INIT, TASK_RUNNING, TASK_END
}

export interface TaskCommon {
    state: number;
    result: string;
    status: string;
}


export interface TaskParam {
    name: string;
    data: File | null;
    jobType: string[];
    sampleRate: number;
    common: TaskCommon;
}

export class Task implements TaskParam {
    name: string;
    data: File | null;
    jobType: string[];
    sampleRate: number;
    common: TaskCommon;

    constructor(
        name: string,
        data: File | null,
        jobType: string[],
        sampleRate: number,
        common: TaskCommon = {
            state: TASK_INIT,
            result: "",
            status: ""
        }
    ) {
        this.name = name;
        this.data = data;
        this.jobType = jobType;
        this.sampleRate = sampleRate;
        this.common = common
    }
}
