import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Walk } from './Walk'

@Entity()
export class WalkImage {

    @PrimaryGeneratedColumn("uuid", { name : "id" } )
    id: number

    @Column("varchar", { name : "name", length: 255, nullable: false, default: null } )
    name: string

    @ManyToOne(() => Walk, walk => walk.images)
    walk: Walk
}
