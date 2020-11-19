import { Entity, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "messages" })
export class Message extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column({ type: "text", nullable: false })
    content: string;

    @Column({ type: "text", nullable: false })
    from: string;

    @Column({ type: "text", nullable: false })
    to: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
