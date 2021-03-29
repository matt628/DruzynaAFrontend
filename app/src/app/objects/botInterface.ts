export interface Bot {
    id:string,
    name:string,
    version:string,
    team:string,
    games:string[],
    description?: string,
    photoURL?: string,
}