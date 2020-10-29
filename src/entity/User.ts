import {Entity, Column, OneToMany, BeforeInsert, BeforeUpdate} from 'typeorm'
import { Base } from './Base';
import { Recipe } from './Recipes';

@Entity()
export class User extends Base {

    @Column({unique: true})
    email!: string

    @Column()
    password!: string

    @OneToMany( () => Recipe, recipe => recipe.user )
    recipe!: Recipe[]
}

