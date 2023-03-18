import { UserAccountEntity, UserBusinessProfileEntity } from "../../../user/user_account/entities/user_account.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BusinessBranchEntity } from "../../business_branch/entities/business_branch.entity";

@Entity("business_profile")
export class BusinessProfileEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "varchar", length: 150, name: "trade_name" })
    tradeName: string;

    @Column({ type: "text", nullable: true })
    logo: string;

    @Column({ type: "varchar", length: 80, nullable: false, unique: true,name:"tenant_key" })
    tenantKey: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true,select:false })
    deletedAt: Date;

    @OneToMany(type => UserBusinessProfileEntity, user => user.businessProfile)
    users: UserBusinessProfileEntity[]

    @OneToMany(() => BusinessBranchEntity, bb => bb.business)
    branches: BusinessBranchEntity[]
}
