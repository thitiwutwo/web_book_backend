import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface borrowAttributes {
    borrow_id?: number;
    book_id?: number;
    user_id?: number;
    date_borrow?: string;
    is_return?: number;
    date_return?: string;
}

@Table({
	tableName: "borrow",
	timestamps: false 
})
export class borrow extends Model<borrowAttributes, borrowAttributes> implements borrowAttributes {

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
    	borrow_id?: number;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	book_id?: number;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	user_id?: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(500) 
    })
    	date_borrow?: string;

    @Column({
    	type: DataType.TINYINT,
    	defaultValue: "0" 
    })
    	is_return?: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(500) 
    })
    	date_return?: string;

}