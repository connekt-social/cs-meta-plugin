import { InferAttributes } from "sequelize";
import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table
export class UserAccessToken extends Model<InferAttributes<UserAccessToken>> {
  @Column(DataType.INTEGER)
  userId!: string;

  @Column(DataType.STRING)
  token!: string;

  @Column(DataType.JSON)
  authResponse?: object;
}
