import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { signToken } from "../helpers/jwt.helper.js";
import { UserModel } from "../models/mongoose/user.model.js";

export const register = async (req, res) => {
  const {username,email,password,role,profile} = req.body;
  try {
    // TODO: crear usuario con password hasheada y profile embebido
     const userExist = await UserModel.findOne({email})
      if(userExist){
        return res.status(400).json({
            ok: false,
            msg: "El email ya esta registrado",
        })
      }  
      if(!password){
        return res.status(400).json({
            msg:"Contraseña obligatoria"
        })
      }
      const hashed = await hashPassword(password)
      const newUser = new UserModel({
        username,
        email,
        profile,
        role,
        password: hashed,
      })
      await newUser.save();
    return res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    // TODO: buscar user, validar password, firmar JWT y setear cookie httpOnly
   const user = await UserModel.findOne({email});
        console.log("Este es el usuario", user)
        if(!user){
            return res.status(400).json({
                ok:false,
                msg:"El email es incorrecto",
            })
        }
        const isMatch = await comparePassword(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                msg:"Contraseña incorrecta",
            })
        }
        const token = signToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
              maxAge: 1000 * 60 * 60,


        })
    return res.status(200).json({ msg: "Usuario logueado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  try {
    // TODO: devolver profile del user logueado actualmente
    return res.status(200).json({ data: profile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (_req, res) => {
  res.clearCookie("token");
  return res.status(204).json({ msg: "Sesión cerrada correctamente" });
};
