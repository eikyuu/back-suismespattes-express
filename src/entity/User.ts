import { IsEmail, IsStrongPassword } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid" , { name : "id" })
    id: number;

    @Column("varchar" , { name : "pseudo", unique: true, length: 255, nullable: false, default: null })
    pseudo: string;

    @Column("varchar" , { name : "email", unique: true, length: 255, nullable: false, default: null })
    @IsEmail()
    email: string;

    @Column("varchar" , { name : "password", length: 255, nullable: false, default: null })
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1
    })
    password: string;

    @Column("json" , { name : "roles", nullable: false, default: null })
    roles: string[];
}