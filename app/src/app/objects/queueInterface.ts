export interface Queue {
    id: string,
    name: string,
    deadline: number[],
    bots: object[],
    lastStatus: string,
    log: any
}

export interface QueueStatus {
    status: string
    progress?: string,
    results?: {place: number, botId: string, points: string}
}