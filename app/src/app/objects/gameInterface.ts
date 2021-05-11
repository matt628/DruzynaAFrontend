import { Queue } from "./queueInterface";

export interface Game {
    id:string;
    name: string;
    version?: string;
    queues?: Queue[];
    currentBattleNumer?: number;
    totalBattleNumler?: number;
    shortDescription?: string;
    payload?: any;

    photoURL?: string;
  }