import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface book_authorAttributes {
    book_id?: number;
    author_id: number;
}

@Table({
	tableName: "book_author",
	timestamps: false 
})
export class book_author extends Model<book_authorAttributes, book_authorAttributes> implements book_authorAttributes {

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
    	primaryKey: true,
    	type: DataType.INTEGER 
    })
    @Index({
    	name: "fk_ba_author",
    	using: "BTREE",
    	order: "ASC",
    	unique: false 
    })
    @Index({
    	name: "PRIMARY",
    	using: "BTREE",
    	order: "ASC",
    	unique: true 
    })
    	author_id!: number;

}