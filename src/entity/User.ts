import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { Invoice } from "./Invoice";
import {IsEmail} from "class-validator"

@Entity("users")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column( {unique: true})
    phone: string;

    @Column({unique: true})
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @Column()
    otp: number;

    @Column()
    complete: boolean;

    @Column()
    active: boolean;



    //----------------------------relations-------------------------


    @OneToMany((type) => Invoice, (invoice)=>invoice.user)
    invoices: User
}
