import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Destination } from './Destination'

@Entity()
export class City {

    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id: number

    @Column("varchar", { name: "postal_code", length: 5, nullable: true, default: null })
    postalCode: string

    @Column("varchar", { name: "label", length: 255, nullable: true, default: null })
    label: string

    @Column("varchar", { name: "latitude", length: 255, nullable: true, default: null })
    latitude: string

    @Column("varchar", { name: "longitude", length: 255, nullable: true, default: null })
    longitude: string

    @Column("varchar", { name: "department_name", length: 255, nullable: true, default: null })
    departmentName: string

    @Column("varchar", { name: "department_code", length: 255, nullable: true, default: null })
    departmentCode: string

    @Column("varchar", { name: "region_name", length: 255, nullable: true, default: null })
    regionName: string

    @OneToMany(() => Destination, destination => destination.city, { cascade: true })
    destinations: Destination[]

}
