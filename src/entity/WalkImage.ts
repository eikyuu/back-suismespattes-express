import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Walk } from './Walk'

@Entity()
export class WalkImage {

    @PrimaryGeneratedColumn("uuid", { name : "id" } )
    id: number

    @Column("varchar", { name : "name", length: 255, nullable: false } )
    name: string

    @ManyToOne(() => Walk, walk => walk.images, { onDelete: 'CASCADE' })
    walk: Walk
}
