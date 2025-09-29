import { DataTypes } from "sequelize";
import { UserModel } from "./user.model.js";

export const AssetModel = sequelize.define("Asset", {
  user_id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    unique:true,
    references:{
      model:"User",
      key:'id',
    }
  },
  inventory_number: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
  },
  description: { type: DataTypes.STRING(500), allowNull: false },
  brand: { type: DataTypes.STRING(100), allowNull: false },
  model: { type: DataTypes.STRING(100), allowNull: false },
  status: {
    type: DataTypes.ENUM("good", "regular", "bad", "out_of_service"),
    allowNull: false,
    defaultValue: "good",
  },
  acquisition_date: { type: DataTypes.DATE, allowNull: false },
  acquisition_value: { type: DataTypes.DECIMAL, allowNull: false },
});

// TODO: Relación muchos a uno con User (muchos Assets pueden tener un mismo responsable)
// * 1:N User → Asset (responsible)
// * 'assets' (User) y 'responsible' (Asset)
// ! FALTA COMPLETAR ACA
UserModel.hasOne(AssetModel, {foreignKey:'user_id', as: "assets"})
AssetModel.BelongsTo(UserModel,{foreignKey:'user_id', as:"user"});

