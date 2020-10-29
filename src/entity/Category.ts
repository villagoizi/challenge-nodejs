import { Entity, OneToMany } from 'typeorm'
import { Base } from './Base'
import { Recipe } from './Recipes';

@Entity()
export class Category extends Base {

    @OneToMany( () => Recipe, recipe => recipe.category, {cascade: true})
    recipe!: Recipe[]
}