import { model, Schema } from "mongoose";
import { AssetModel } from "./asset.model.js";

// TODO: completar relacion embebida y configurar el virtuals para el populate inverso con assets

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["secretary", "administrator"],
      default: "secretary",
    },
    
    deletedAt: { type: Date, default: null },
    // ! FALTA COMPLETAR ACA
    profile:{
      employee_number:{
        type: String,
        unique:true,
        required: true,
      },
      firstName:{
        type:String,
        required:true,
        minlength:2,
        maxlength:50,

      },
      lastName:{
          type:String,
        required:true,
        minlength:2,
        maxlength:50,
      },
      phone:{
        type: String,
        required:false,
      }
    },
  },
  { timestamps: true }
);

UserSchema.pre(/^find/, function(next){
    if(!this.getOptions().includeDelete){
        this.where({deleteAt: null})
    };
    next();
})
UserSchema.method.softDelete = function(){
    this.deleteAt = new Date();
    return this.save();
}
// ! FALTA COMPLETAR ACA
UserSchema.virtual('assets', {
  ref:"Asset",
  localField:'_id',
  foreignField:"assets",
})
UserSchema.pre("findOneAndDelete", async function (next) {
    const user_id = this.getQuery()._id;

    console.log("Articulo eliminado", user_id);

    await AssetModel.deleteMany({responsible: user_id});

    next();
    
})

export const UserModel = model("User", UserSchema);
