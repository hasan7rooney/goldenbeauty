import { type } from "os";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany} from "typeorm";
import { Category } from "./Category";
import { InvoiceItem } from "./InvoiceItem";

@Entity("products")
export class Product extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;


    @Column()
    price: number;

    @Column({ nullable: true})
    image: string;

    @Column()
    active: string;

    @Column()
    quantity: number;


    //------------------------------relations---------------

    @ManyToOne((type)=> Category,(category)=> category.products)
    category: Category;

    @OneToMany((type) => InvoiceItem, (invoiceItem)=> invoiceItem.product)
    invoiceItems: InvoiceItem[];
}
