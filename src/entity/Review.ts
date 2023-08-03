import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Review {

    @PrimaryGeneratedColumn("uuid", { name  : "id"})
    id: number

    @Column("string", { name : "name", length: 255, nullable: false, default: null })
    content: string
    
    @Column({ name : "created_at"})
    createdAt: Date

    @Column({ name : "updated_at"})
    updatedAt: Date

}
