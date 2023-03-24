import { ColumnNumericTransformer } from "../../../../core/transform/columnNumericTransformer";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BusinessBranchEntity } from "../../../business/business_branch/entities/business_branch.entity";
import { SaleProductEntity } from "./sale_product.entity";

@Entity("sale_product_branch")
export class SaleProductBranchEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "int", default: 0 })
    stock: number;

    @Column({
        type: "decimal", default: 0, precision: 16, scale: 2, transformer: new ColumnNumericTransformer(),
    })
    price: number

    @Column({ type: "bool", default:true,name:"is_active" })
    isActive: boolean;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true ,select:false})
    deletedAt: Date;

    @Column({name:"branch_id"})
    branchId:number;

    @ManyToOne(()=> BusinessBranchEntity, bbe=>bbe.products)
    @JoinColumn({name:"branch_id"})
    branch:BusinessBranchEntity;

    @Column({name:"product_id"})
    productId:number;

    @ManyToOne(()=>SaleProductEntity,spe => spe.avaibleInBranch)
    @JoinColumn({name:"product_id"})
    product:SaleProductEntity;
}