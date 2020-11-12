import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity, OneToMany} from "typeorm";

import { Product } from "./Products"
@Entity("categories")
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    active: string;
    
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @CreateDateColumn()
    updatedAt: Date;




    //----------------------Relations----------------------
 @OneToMany((type) => Product, (product)=>product.category)
 products: Product[];

}
