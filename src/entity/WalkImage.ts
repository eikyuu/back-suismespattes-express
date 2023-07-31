import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Walk } from './Walk'

@Entity()
export class WalkImage {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => Walk, walk => walk.images)
    walk: Walk
}
