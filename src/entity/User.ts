import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, type: "text", nullable: false })
    username: string;

    @Column({ unique: true, type: "text", nullable: false })
    email: string;

    @Column({ type: "text", nullable: false })
    password: string;

    @Column({ type: "text", nullable: true })
    imgUrl: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
