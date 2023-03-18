import { UserBusinessProfileEntity } from "../../../user/user_account/entities/user_account.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BusinessLocationEntity } from "../../business_location/entities/business_location.entity";
import { BusinessProfileEntity } from "../../business_profile/entities/business_profile.entity";
import { SaleProductBranchEntity } from "../../../sale/sale_product/entities/sale_product_branch.entity";

@Entity("business_branch")
export class BusinessBranchEntity extends BaseEntity {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "varchar", length: 100 })
    name: string;

    @Column({ type: "varchar", length: 200, nullable: true })
    address: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true ,select:false})
    deletedAt: Date;

    @Column({ name: "business_id" })
    businessId: number;

    @ManyToOne(() => BusinessProfileEntity, bpe => bpe.branches)
    @JoinColumn({ name: "business_id" })
    business: BusinessProfileEntity;

    @Column({ name: "location_id" })
    locationId: number;

    @ManyToOne(() => BusinessLocationEntity, bl => bl.branches)
    @JoinColumn({ name: "location_id" })
    location: BusinessLocationEntity[]

    @OneToMany(type => UserBusinessProfileEntity, user => user.businessProfile)
    users: UserBusinessProfileEntity[]


    @OneToMany(()=> SaleProductBranchEntity, spb => spb.branch)
    products:SaleProductBranchEntity[];
}
