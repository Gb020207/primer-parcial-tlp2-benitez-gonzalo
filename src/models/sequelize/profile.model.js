import { DataTypes } from "sequelize";
import { UserModel } from "./user.model";

export const ProfileModel = sequelize.define("Profile", {
  user_id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    unique:true,
    references:{
      model:"User",
      key:'id',
    },
  employee_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  first_name: { type: DataTypes.STRING(50), allowNull: false },
  last_name: { type: DataTypes.STRING(50), allowNull: false },
  phone: { type: DataTypes.STRING(20), allowNull: true },
}
});

// TODO: Relación uno a uno con User (1 User tiene 1 Profile)
// * 1:1 Profile ↔ User
// * 'profile' (User) y 'user' (Profile)
// ! FALTA COMPLETAR ACA
UserModel.hasOne(ProfileModel,{foreignKey:'user_id', as:'user'});
ProfileModel.hasOne(UserModel,{foreignKey:'user_id', as:'profile'});
