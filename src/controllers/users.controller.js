import { UserModel } from "../models/mongoose/user.model.js";

export const getAllUsers = async (req, res) => {
  const {username, email, password,role,profile } = req.body;
  try {
    // TODO: devolver usuarios con profile y sus assets con sus categories (populate) (solo admin)
    const users = await UserModel.create({username, email, password,role,profile })
    return res.status(200).json({ data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteUser = async (req, res) => {
  const {id} = req.params

  try {
    // TODO: eliminación lógica (deletedAt) (solo admin)
    const user = await UserModel.findByIdAndDelete(id)
    return res.status(204).json({ msg: "Usuario eliminado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
