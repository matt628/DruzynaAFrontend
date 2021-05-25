export interface Bot { // TODO reafactor when backend ready
    id?: string,
    queueId?:string,
    name:string,
    version:string,
    zip?: File
}