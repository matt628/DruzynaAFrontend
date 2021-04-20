export interface Queue {
    ID?: string;
    parentGameID?: string;
    name: string,
    deadline: string,
    configuration?
}