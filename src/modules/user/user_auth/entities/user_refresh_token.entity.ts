import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserAccountEntity } from "../../user_account/entities/user_account.entity";

@Entity("user_refresh_token")
export class UserRefreshTokenEntity {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column({type:"text",name:"user_agent"})
    userAgent:string

    @Column({type:"varchar",length:80})
    ip:string;

    @Column({type:"timestamp"})
    expiration:Date;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true, select: false })
    deletedAt: Date;

    @Column({name:"user_id"})
    userId:number;

    @ManyToOne(() => UserAccountEntity)
    @JoinColumn({name:"user_id"})
    user:UserAccountEntity;

}
