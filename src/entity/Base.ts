import {Column, PrimaryGeneratedColumn, BaseEntity} from 'typeorm'

export abstract class Base extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;
}