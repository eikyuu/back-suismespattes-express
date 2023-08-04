import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { WalkImage } from './WalkImage'

@Entity()
export class Walk {

    @PrimaryGeneratedColumn("uuid" , { name : "id" })
    id: number

    @Column("varchar", { name : "name", unique: true, length: 255, nullable: false, default: null })
    name: string

    @Column("varchar", { name : "slug", unique: true, length: 255, nullable: false, default: null })
    slug: string

    @Column("text", { name : "description", nullable: false, default: null })
    description: string

    @Column("varchar", { name : "city", length: 255, nullable: false, default: null })
    city: string

    @Column("varchar", { name : "postal_code", length: 5, nullable: false, default: null })
    postalCode: string

    @Column("varchar", { name : "street", length: 255, nullable: false, default: null })
    street: string

    @Column("varchar", { name : "country", length: 255, nullable: false, default: null })
    country: string

    @Column("float", { name : "latitude", nullable: true })
    latitude: number

    @Column("float", { name : "longitude", nullable: true })
    longitude: number

    @Column("boolean", { name : "obligatory_leash", default: false })
    obligatoryLeash: boolean

    @Column("boolean", { name : "water_point", default: false })
    waterPoint: boolean

    @Column("boolean", { name : "processionary_caterpillar_alert", default: false })
    processionaryCaterpillarAlert: boolean

    @Column("boolean", { name : "cyanobacteria_alert", default: false })
    cyanobacteriaAlert: boolean

    @Column("int", { name : "note", nullable: true })
    note: number
    
    @CreateDateColumn({ name : "created_at"})
    createdAt: Date

    @UpdateDateColumn({ name : "updated_at"})
    updatedAt: Date

    @OneToMany(() => WalkImage, walkImage => walkImage.walk)
    images: WalkImage[]



}
