import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface authorAttributes {
    author_id?: number;
    author_name?: string;
}

@Table({
	tableName: "author",
	timestamps: false 
})
export class author extends Model<authorAttributes, authorAttributes> implements authorAttributes {

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
    	author_id?: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(400) 
    })
    	author_name?: string;

}