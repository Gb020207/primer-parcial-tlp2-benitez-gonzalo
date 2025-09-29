import { AssetModel } from "../models/mongoose/asset.model.js";
import { CategoryModel } from "../models/mongoose/category.model.js";

export const createCategory = async (req, res) => {
  const {name, description} = req.body;
  try {
    // TODO: crear category (solo admin)
    if(name === "" || name === undefined){
      return res.status(400).json({
        msg:"El campo name es requerido",
      })
    }
    const category = await CategoryModel.create({name,description});
    return res.status(201).json({ msg: "Categoría creada correctamente",data:category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
export const getAllCategories = async (_req, res) => {
  try {
    // TODO: listar categories con sus assets (populate inverso) (solo admin)
    const categories = await CategoryModel.find().populate('assets')
    return res.status(200).json({ data: categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteCategory = async (req, res) => {
  const {id} = req.params;
  try {
    // TODO: eliminar category (solo admin) y actualizar assets que referencian
    const category = await CategoryModel.findByIdAndDelete(id);
    await AssetModel.updateMany(
            {category:id},
            {$pull: {category:id}}
        );
    return res.status(204).json({ msg: "Categoría eliminada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
