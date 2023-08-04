import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Review {

    @PrimaryGeneratedColumn("uuid", { name  : "id"})
    id: number

    @Column("varchar", { name : "name", length: 255, nullable: false, default: null })
    content: string
    
    @CreateDateColumn({ name : "created_at"})
    createdAt: Date

    @UpdateDateColumn({ name : "updated_at"})
    updatedAt: Date

}
