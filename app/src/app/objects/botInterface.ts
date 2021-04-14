export interface Bot { // TODO reafactor when backend ready
    id:string,
    name:string,
    version:string,
    team:string,
    games:string[],
    description?: string,
    photoURL?: string,
    zip?: File
}