import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Destination } from './Destination'

@Entity()
export class DestinationImage {

    @PrimaryGeneratedColumn("uuid", { name : "id" } )
    id: number

    @Column("varchar", { name : "name", length: 255, nullable: false } )
    name: string

    @ManyToOne(() => Destination, destination => destination.images , { 
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        orphanedRowAction: 'delete'
     })
     @JoinColumn({ name : "destination_id"})
    destination: Destination
}

