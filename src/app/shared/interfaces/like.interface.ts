import { IdItem } from "./id-item.interface";
import { MapId } from "./map.inteface";

export interface Like{
    likes:string[]
}

export interface LikeMap extends MapId<Like>{
}

export interface TableLikeItem extends Like,IdItem{}