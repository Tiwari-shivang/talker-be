import { DataTypes } from "sequelize";
import { sequlize } from "../db_connect/dbConnect";

const ConnectionModel = sequlize.define("connection", {
  id: {
    type: DataTypes.STRING,
    autoIncrement: true,
    primaryKey: true,
  },
  uuid1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uuid2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default ConnectionModel;
