import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from "sequelize-typescript";

export interface oauth_refresh_tokensAttributes {
  id?: number;
  refresh_token?: string;
  expires?: string;
  scope?: string;
  client_id?: number;
  user_id?: number;
}

@Table({
  tableName: "oauth_refresh_tokens",
  timestamps: false,
})
export class oauth_refresh_tokens
  extends Model<oauth_refresh_tokensAttributes, oauth_refresh_tokensAttributes>
  implements oauth_refresh_tokensAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  @Index({
    name: "id",
    using: "BTREE",
    order: "ASC",
    unique: true,
  })
  @Index({
    name: "oauth_refresh_tokens_id_unique",
    using: "BTREE",
    order: "ASC",
    unique: true,
  })
  @Index({
    name: "PRIMARY",
    using: "BTREE",
    order: "ASC",
    unique: true,
  })
  id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(256),
  })
  refresh_token?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
  })
  expires?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
  })
  scope?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  @Index({
    name: "client_id",
    using: "BTREE",
    order: "ASC",
    unique: false,
  })
  client_id?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  @Index({
    name: "user_id",
    using: "BTREE",
    order: "ASC",
    unique: false,
  })
  user_id?: number;
}
