import { BusinessProfileEntity } from "../../../business/business_profile/entities/business_profile.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SaleCategoryEntity } from "../../sale_category/entities/sale_category.entity";
import { SaleProductBranchEntity } from "./sale_product_branch.entity";

export enum SaleProductTypeEnum{
    ALMACENABLE="ALMACENABLE",
    SERVICIO="SERVICIO",
    CONSUMIBLE="CONSUMIBLE"
}

@Entity("sale_product")
export class SaleProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn({type:"bigint"})
    id: number;

    @Column({type:"text",nullable:true})
    photo:string;

    @Column({type:"varchar",length:150,name:"display_name"})
    displayName:string;

    @Column({type:"varchar",length:100,nullable:true})
    sku: string;

    @Column({type:"varchar",length:100, nullable:true})
    description:string;

    @Column({type:"varchar",length:20,default:SaleProductTypeEnum.ALMACENABLE})
    type:string;

    @Column({type:"bool",default:true,name:"is_active"})
    isActive:boolean;

    @Column({type:"bool",default:true,name:"can_be_sold"})
    canBeSold:boolean;

    @Column({type:"bool",default:true,name:"can_be_bought"})
    canBeBought:boolean;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true ,select:false})
    deletedAt: Date;

    @Column({name:"category_id"})
    categoryId:number;

    @ManyToOne(()=> SaleCategoryEntity, sce=>sce.products)
    @JoinColumn({name:"category_id"})
    category:SaleCategoryEntity;

    @OneToMany(()=> SaleProductBranchEntity, spb=>spb.product)
    avaibleInBranch:SaleProductBranchEntity[];

    @Column({ name: "business_id" })
    businessId: number;

    @ManyToOne(() => BusinessProfileEntity)
    @JoinColumn({ name: "business_id" })
    business: BusinessProfileEntity;
}



