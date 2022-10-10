import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface oauth_clientsAttributes {
    id?: number;
    name?: string;
    client_id?: string;
    client_secret?: string;
    redirect_uri?: string;
    grant_types?: string;
    scope?: string;
    user_id?: number;
}

@Table({
	tableName: "oauth_clients",
	timestamps: false 
})
export class oauth_clients extends Model<oauth_clientsAttributes, oauth_clientsAttributes> implements oauth_clientsAttributes {

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
    	name: "oauth_clients_id_unique",
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
    	id?: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(255) 
    })
    	name?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(80) 
    })
    	client_id?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(80) 
    })
    	client_secret?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(2000) 
    })
    	redirect_uri?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(80) 
    })
    	grant_types?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(255) 
    })
    	scope?: string;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    @Index({
    	name: "user_id",
    	using: "BTREE",
    	order: "ASC",
    	unique: false 
    })
    	user_id?: number;

}