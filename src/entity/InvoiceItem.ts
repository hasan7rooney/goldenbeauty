import { type } from "os";
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity, ManyToOne} from "typeorm";
import { Invoice } from "./Invoice";
import { Product } from "./Products";

@Entity("invoiceItems")
export class InvoiceItem extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number

    @Column({ type: "float"})
    subtotal: number
    
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @CreateDateColumn()
    updatedAt: Date;

// ------------------------------relations------------------------
@ManyToOne ((type)=> Product, (product)=>product.invoiceItems)
product: Product

@ManyToOne ((type)=> Invoice, (invoice)=>invoice.invoiceItems)
invoice : InvoiceItem[];

}
