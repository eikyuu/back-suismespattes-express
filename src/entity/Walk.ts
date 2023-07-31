import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { WalkImage } from './WalkImage'

@Entity()
export class Walk {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ name : "name" })
    name: string

    @Column()
    slug: string

    @Column()
    description: string

    @Column()
    city: string

    @Column({ name : "postal_code" })
    postalCode: string

    @Column()
    street: string

    @Column()
    country: string

    @Column({ name : "latitude", type: "float", nullable: true})
    latitude: number

    @Column({ name : "longitude", type: "float", nullable: true})
    longitude: number

    @Column({ name : "obligatory_leash" })
    obligatoryLeash: boolean

    @Column({ name : "water_point" })
    waterPoint: boolean

    @Column({ name : "processionary_caterpillar_alert" })
    processionaryCaterpillarAlert: boolean

    @Column({ name : "cyanobacteria_alert"})
    cyanobacteriaAlert: boolean

    @Column()
    note: number
    
    @CreateDateColumn({ name : "created_at"})
    createdAt: Date

    @UpdateDateColumn({ name : "updated_at"})
    updatedAt: Date

    @OneToMany(() => WalkImage, walkImage => walkImage.walk)
    images: WalkImage[]



}
