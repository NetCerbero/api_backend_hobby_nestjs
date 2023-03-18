import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BusinessBranchEntity } from "../../business_branch/entities/business_branch.entity";

@Entity("business_location")
export class BusinessLocationEntity extends BaseEntity {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "varchar", length: 100 })
    name: string;

    @Column({ type: "bool", default: false })
    default: boolean

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true, select: false })
    deletedAt: Date;

    @OneToMany(() => BusinessBranchEntity, bb => bb.location)
    branches: BusinessBranchEntity[];
}
