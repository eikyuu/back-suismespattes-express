import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Destination } from './Destination'

@Entity()
export class Category {

    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id: number

    @Column("varchar", { name: "name", length: 255, nullable: false, default: null })
    name: string

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date

    @OneToMany(() => Destination, destination => destination.category, { cascade: true })
    destinations: Destination[]

    @Column("enum", { name: "type", enum: ["ACTIVITY", "HEBERGEMENT", "AUTRE"], default: "AUTRE" })
    type: ["ACTIVITY", "HEBERGEMENT", "AUTRE"]

}
