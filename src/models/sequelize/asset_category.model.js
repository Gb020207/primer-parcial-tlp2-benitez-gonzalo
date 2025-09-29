import { DataTypes } from "sequelize";
import { AssetModel } from "./asset.model.js";
import { CategoryModel } from "../mongoose/category.model.js";

export const AssetCategoryModel = sequelize.define("AssetCategory", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});

// TODO: completar relaciones muchos a muchos entre Asset y Category mediante AssetCategory.
// * N:M Asset ↔ Category through AssetCategory
// * 'categories' (Asset) y 'assets' (Category)
// ! FALTA COMPLETAR ACA
AssetCategoryModel.belongsTo(AssetModel,{through: AssetCategoryModel, foreignKey:'id',onDelete:'CASCADE' })
AssetCategoryModel.belongsTo(CategoryModel,{through: AssetCategoryModel, foreignKey:'id', onDelete:'CASCADE'})
