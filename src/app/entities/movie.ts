import { Category } from "./category";
import { Streaming } from "./streaming";

export interface Movie {
    id: number;
    title: string;
    description: string;
    releaseDate: string;
    rating: number;
    categories: Category[];
    streamings: Streaming[];
    urlMovie: string;
    
}