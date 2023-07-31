import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Review {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string
    
    @Column({ name : "created_at"})
    createdAt: Date

    @Column({ name : "updated_at"})
    updatedAt: Date

}
