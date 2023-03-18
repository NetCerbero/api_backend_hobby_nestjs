import { BusinessProfileEntity } from "../../../business/business_profile/entities/business_profile.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SaleProductEntity } from "../../sale_product/entities/sale_product.entity";

@Entity("sale_category")
export class SaleCategoryEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "varchar", length: 100 })
    name: string;

    @Column({ type: "int", default: 0 })
    order: number;

    @Column({ type: "bool", default: true, name: "is_active" })
    isActive: boolean;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true, select: false })
    deletedAt: Date;

    @Column({ name: "parent_id", nullable: true })
    parentId: number;

    @ManyToOne(() => SaleCategoryEntity, sc => sc.categories, { nullable: true })
    @JoinColumn({ name: "parent_id" })
    parent: SaleCategoryEntity;

    @OneToMany(() => SaleCategoryEntity, sc => sc.parent)
    categories: SaleCategoryEntity[]

    @OneToMany(() => SaleProductEntity, spe => spe.category)
    products: SaleProductEntity[]

    @Column({ name: "business_id" })
    businessId: number;

    @ManyToOne(() => BusinessProfileEntity)
    @JoinColumn({ name: "business_id" })
    business: BusinessProfileEntity;
}
