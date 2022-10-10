import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface bookAttributes {
    book_id?: number;
    title?: string;
    isbn13?: string;
    language_id?: number;
    num_pages?: number;
    publication_date?: string;
    publisher_id?: number;
    book_img?: string;
    borrowed?: number;
}

@Table({
	tableName: "book",
	timestamps: false 
})
export class book extends Model<bookAttributes, bookAttributes> implements bookAttributes {

    @Column({
    	primaryKey: true,
    	autoIncrement: true,
    	type: DataType.INTEGER 
    })
    @Index({
    	name: "PRIMARY",
    	using: "BTREE",
    	order: "ASC",
    	unique: true 
    })
    	book_id?: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(400) 
    })
    	title?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(13) 
    })
    	isbn13?: string;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    @Index({
    	name: "fk_book_lang",
    	using: "BTREE",
    	order: "ASC",
    	unique: false 
    })
    	language_id?: number;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	num_pages?: number;

    @Column({
    	allowNull: true,
    	type: DataType.DATEONLY 
    })
    	publication_date?: string;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    @Index({
    	name: "fk_book_pub",
    	using: "BTREE",
    	order: "ASC",
    	unique: false 
    })
    	publisher_id?: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(100) 
    })
    	book_img?: string;

    @Column({
    	type: DataType.TINYINT,
    	defaultValue: "0" 
    })
    	borrowed?: number;

}