import {Entity, Column, ManyToOne, JoinColumn} from 'typeorm'
import { User } from './User'
import { Category } from './Category'
import { Base } from './Base'

@Entity()
export class Recipe extends Base {

    @Column("varchar", { array: true })
    ingredients!: string[]

    @Column()
    description!: string

    @ManyToOne(() => User, user => user.recipe,{
        onDelete: "CASCADE", onUpdate: "CASCADE"
    })
    @JoinColumn()
    user!: User;

    @ManyToOne( () => Category, category => category.recipe,{
        eager: true, onDelete: "CASCADE", onUpdate: "CASCADE"
    })
    @JoinColumn()
    category!: Category
}