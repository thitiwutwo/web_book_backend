import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface book_languageAttributes {
    language_id?: number;
    language_code?: string;
    language_name?: string;
}

@Table({
	tableName: "book_language",
	timestamps: false 
})
export class book_language extends Model<book_languageAttributes, book_languageAttributes> implements book_languageAttributes {

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
    	language_id?: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(8) 
    })
    	language_code?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(50) 
    })
    	language_name?: string;

}