import { IsEmail, IsStrongPassword } from 'class-validator';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Destination } from './Destination';

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

    @CreateDateColumn({ name : "created_at"})
    createdAt: Date;

    @UpdateDateColumn({ name : "updated_at"})
    updatedAt: Date;
    
    @Column("boolean" , { name : "is_active", default: true })
    isActive: boolean;

    @Column("boolean" , { name : "is_admin", default: false })
    isAdmin: boolean;

    @Column("boolean" , { name : "is_verified", default: false })
    isVerified: boolean;

    @Column("boolean" , { name : "is_banned", default: false })
    isBanned: boolean;

    @Column("boolean" , { name : "is_deleted", default: false })
    isDeleted: boolean;

    @Column("varchar" , { name : "token", length: 255, nullable: true, default: null })
    token: string;

    @Column("varchar" , { name : "token_expires_at", length: 255, nullable: true, default: null })
    tokenExpiresAt: Date;

    @Column("varchar" , { name : "reset_token", length: 255, nullable: true, default: null })
    resetToken: string;

    @Column("varchar" , { name : "reset_token_expires_at", length: 255, nullable: true, default: null })
    resetTokenExpiresAt: Date;

    @Column("varchar" , { name : "email_verification_token", length: 255, nullable: true, default: null })
    emailVerificationToken: string;

    @Column("varchar" , { name : "email_verification_token_expires_at", length: 255, nullable: true, default: null })
    emailVerificationTokenExpiresAt: string;

    @Column("varchar" , { name : "email_verified_at", length: 255, nullable: true, default: null })
    emailVerifiedAt: string;

    @Column("varchar" , { name : "password_reset_at", length: 255, nullable: true, default: null })
    passwordResetAt: Date;

    @Column("varchar" , { name : "last_login_at", length: 255, nullable: true, default: null })
    lastLoginAt: string;

    @Column("varchar" , { name : "last_login_ip", length: 255, nullable: true, default: null })
    lastLoginIp: string;

    @Column("varchar" , { name : "last_login_user_agent", length: 255, nullable: true, default: null })
    lastLoginUserAgent: string;

    @Column("varchar" , { name : "current_login_at", length: 255, nullable: true, default: null })
    currentLoginAt: string;

    @Column("varchar" , { name : "current_login_ip", length: 255, nullable: true, default: null })
    currentLoginIp: string;

    @Column("varchar" , { name : "current_login_user_agent", length: 255, nullable: true, default: null })
    currentLoginUserAgent: string;

    @Column("int" , { name : "login_count", nullable: true, default: null })
    loginCount: number;

    @Column("varchar" , { name : "confirmed_at", length: 255, nullable: true, default: null })
    confirmedAt: string;

    @Column("varchar" , { name : "blocked_at", length: 255, nullable: true, default: null })
    blockedAt: string;

    @Column("varchar" , { name : "unconfirmed_email", length: 255, nullable: true, default: null })
    unconfirmedEmail: string;

    @Column("varchar" , { name : "unconfirmed_email_token", length: 255, nullable: true, default: null })
    unconfirmedEmailToken: string;

    @Column("varchar" , { name : "unconfirmed_email_token_expires_at", length: 255, nullable: true, default: null })
    unconfirmedEmailTokenExpiresAt: string;

    @Column("varchar" , { name : "current_sign_in_at", length: 255, nullable: true, default: null })
    currentSignInAt: string;

    @Column("varchar" , { name : "current_sign_in_ip", length: 255, nullable: true, default: null })
    currentSignInIp: string;

    @Column("varchar" , { name : "last_sign_in_at", length: 255, nullable: true, default: null })
    lastSignInAt: string;

    @Column("varchar" , { name : "last_sign_in_ip", length: 255, nullable: true, default: null })
    lastSignInIp: string;

    @OneToMany(() => Destination, destination => destination.user)
    destinations: Destination

    @Column("varchar" , { name : "picture", length: 255, nullable: true, default: null })
    picture: string;
}