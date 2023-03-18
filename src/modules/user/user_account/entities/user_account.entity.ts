import { BusinessBranchEntity } from "../../../business/business_branch/entities/business_branch.entity";
import { BusinessProfileEntity } from "../../../business/business_profile/entities/business_profile.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum UserAccountStatus {
    ACTIVO = "ACTIVO",
    INACTIVO = "INACTIVO"
}

@Entity("user_account")
export class UserAccountEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "bool",default:false, name:"is_admin"})
    isAdmin: boolean;

    @Column({ type: "varchar", length: 150, unique: true })
    email: string;

    @Column({ type: "varchar", length: 255, select: false })
    password: string;

    @Column({ type: "varchar", length: 100, name: "display_name" })
    displayName: string;

    @Column({ type: "text", nullable: true })
    photo: string

    @Column({ type: "varchar", length: 10, default: UserAccountStatus.INACTIVO })
    status: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true, select: false })
    deletedAt: Date;

    @OneToMany(type => UserBusinessProfileEntity, ubp => ubp.userAccount)
    business: UserBusinessProfileEntity[]

    @OneToMany(type => UserBusinessBranchEntity, ubb => ubb.userAccount)
    branches: UserBusinessBranchEntity[]
}

@Entity("user_business_profile")
export class UserBusinessProfileEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "bool", default: false })
    default: boolean

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;

    @Column({ name: "user_account_id" })
    userAccountId: number;

    @ManyToOne(() => UserAccountEntity, uae => uae.business)
    @JoinColumn({ name: "user_account_id" })
    userAccount: UserAccountEntity;

    @Column({ name: "business_profile_id" })
    businessProfileId: number;

    @ManyToOne(() => BusinessProfileEntity, bpe => bpe.users)
    @JoinColumn({ name: "business_profile_id" })
    businessProfile: BusinessProfileEntity;
}


@Entity("user_business_branch")
export class UserBusinessBranchEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "bool", default: false })
    default: boolean

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;

    @Column({ name: "user_account_id" })
    userAccountId: number;

    @ManyToOne(() => UserAccountEntity, uae => uae.business)
    @JoinColumn({ name: "user_account_id" })
    userAccount: UserAccountEntity;

    @Column({ name: "business_branch_id" })
    businessBranchId: number;

    @ManyToOne(() => BusinessBranchEntity, bpe => bpe.users)
    @JoinColumn({ name: "business_branch_id" })
    businessBranch: BusinessBranchEntity;
}
