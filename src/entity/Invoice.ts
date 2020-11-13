import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity, ManyToOne, OneToMany} from "typeorm";
import { InvoiceItem } from "./InvoiceItem";
import { User } from "./User";

@Entity("invoices")
export class Invoice extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "float"})
    total: number;
    
    @Column({ nullable: true })
    type: string;

    @Column({ nullable: true })
    zcTransactionId: string;
  
    @Column({ nullable: true })
    zcMsisdn: string;
  
    @Column({ nullable: true })
    zcOperation: string;
  
    @Column({ nullable: true })
    zcMsg: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @CreateDateColumn()
    updatedAt: Date;

    @Column()
    address: string;

    @Column()
    status: string;

    @Column({ nullable: true})
    long: number;

    @Column({ nullable: true})
    lat: number;


  
    //-----------------------relations-------------------------
  
    @OneToMany((type)=> InvoiceItem, (invoiceItem)=> invoiceItem.invoice)
    invoiceItems: InvoiceItem[];

    @ManyToOne((type)=>User, (user)=>user.invoices)
    user:InvoiceItem

}
