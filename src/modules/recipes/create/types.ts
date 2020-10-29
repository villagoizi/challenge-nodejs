import { Recipe } from "../../../entity";


export type CreateRecipe = {
    name: string;
    description: string;
    ingredients: string[];
    category: number;
}
export interface Data {
    data: CreateRecipe
}

export interface Parent {
    Recipe: Recipe
}