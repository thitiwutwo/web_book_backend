import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface publisherAttributes {
    publisher_id?: number;
    publisher_name?: string;
}

@Table({
	tableName: "publisher",
	timestamps: false 
})
export class publisher extends Model<publisherAttributes, publisherAttributes> implements publisherAttributes {

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
    	publisher_id?: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(400) 
    })
    	publisher_name?: string;

}