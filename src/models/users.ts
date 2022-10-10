import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface usersAttributes {
    id?: number;
    username?: string;
    password?: string;
    scope?: string;
    name?: string;
    role_id?: number;
}

@Table({
	tableName: "users",
	timestamps: false 
})
export class users extends Model<usersAttributes, usersAttributes> implements usersAttributes {

    @Column({
    	primaryKey: true,
    	autoIncrement: true,
    	type: DataType.INTEGER 
    })
    @Index({
    	name: "id",
    	using: "BTREE",
    	order: "ASC",
    	unique: true 
    })
    @Index({
    	name: "PRIMARY",
    	using: "BTREE",
    	order: "ASC",
    	unique: true 
    })
    @Index({
    	name: "users_id_unique",
    	using: "BTREE",
    	order: "ASC",
    	unique: true 
    })
    	id?: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(32) 
    })
    	username?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(255) 
    })
    	password?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(255) 
    })
    	scope?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(255) 
    })
    	name?: string;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	role_id?: number;

}