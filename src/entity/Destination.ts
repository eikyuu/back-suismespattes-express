import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { DestinationImage } from './DestinationImage'

@Entity()
export class Destination {

    @PrimaryGeneratedColumn("uuid" , { name : "id" })
    id: number

    @Column("varchar", { name : "name", unique: true, length: 255, nullable: false })
    name: string

    @Column("varchar", { name : "slug", unique: true, length: 255, nullable: false })
    slug: string

    @Column("text", { name : "description", nullable: false })
    description: string

    @Column("varchar", { name : "city", length: 255, nullable: false })
    city: string

    @Column("varchar", { name : "postal_code", length: 5, nullable: false })
    postalCode: string

    @Column("varchar", { name : "street", length: 255, nullable: false })
    street: string

    @Column("varchar", { name : "country", length: 255, nullable: false })
    country: string

    @Column("float", { name : "latitude", nullable: true })
    latitude: number

    @Column("float", { name : "longitude", nullable: true })
    longitude: number

    @Column("enum", { name : "obligatory_leash", enum: ["YES", "NO", "RECOMANDED"], default: "NO" })
    obligatoryLeash: ["YES", "NO", "RECOMANDED"]

    @Column("boolean", { name : "water_point", default: false })
    waterPoint: boolean

    @Column("boolean", { name : "processionary_caterpillar_alert", default: false })
    processionaryCaterpillarAlert: boolean

    @Column("boolean", { name : "cyanobacteria_alert", default: false })
    cyanobacteriaAlert: boolean

    @Column("int", { name : "note", nullable: false})
    note: number
    
    @CreateDateColumn({ name : "created_at"})
    createdAt: Date

    @UpdateDateColumn({ name : "updated_at"})
    updatedAt: Date

    @OneToMany(() => DestinationImage, destinationImage => destinationImage.destination, { cascade: true })
    images: DestinationImage[]



}
