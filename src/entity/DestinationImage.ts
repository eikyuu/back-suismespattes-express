import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Destination } from './Destination'

@Entity()
export class DestinationImage {

    @PrimaryGeneratedColumn("uuid", { name : "id" } )
    id: number

    @Column("varchar", { name : "name", length: 255, nullable: false } )
    name: string

    @ManyToOne(() => Destination, destination => destination.images, { onDelete: 'CASCADE' })
    destination: Destination
}
