import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from "sequelize-typescript";

export interface oauth_authorization_codesAttributes {
  id?: number;
  authorization_code?: string;
  expires?: string;
  redirect_uri?: string;
  scope?: string;
  client_id?: number;
  user_id?: number;
}

@Table({
  tableName: "oauth_authorization_codes",
  timestamps: false,
})
export class oauth_authorization_codes
  extends Model<
    oauth_authorization_codesAttributes,
    oauth_authorization_codesAttributes
  >
  implements oauth_authorization_codesAttributes
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
    name: "oauth_authorization_codes_id_unique",
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
  authorization_code?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
  })
  expires?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(2000),
  })
  redirect_uri?: string;

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
    name: "oauth_client_id",
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
