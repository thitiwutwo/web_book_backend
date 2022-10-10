import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface oauth_scopesAttributes {
    id?: number;
    scope?: string;
    is_default?: number;
}

@Table({
	tableName: "oauth_scopes",
	timestamps: false 
})
export class oauth_scopes extends Model<oauth_scopesAttributes, oauth_scopesAttributes> implements oauth_scopesAttributes {

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
    	name: "oauth_scopes_id_unique",
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
    	type: DataType.STRING(80) 
    })
    	scope?: string;

    @Column({
    	allowNull: true,
    	type: DataType.TINYINT 
    })
    	is_default?: number;

}