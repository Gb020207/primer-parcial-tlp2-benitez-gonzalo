import { AssetModel } from "../models/mongoose/asset.model.js";



export const createAsset = async (req, res) => {
  const {inventoryNumber, decription,brand,model,satatus,acquisitionDate,acquisitionValue,responsile,category} = req.body;
  try {
    // TODO: crear asset (usuario autenticado)
    const Asset = await AssetModel.create(
  {inventoryNumber, decription,brand,model,satatus,acquisitionDate,acquisitionValue,responsile,category})
    
    return res.status(201).json({ msg: "Asset creado correctamente",data:Asset });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
export const getAllAssets = async (_req, res) => {
  try {
    // TODO: listar assets con el responsible y sus categories (populate) (solo admin)
    const assets = await AssetModel.find().populate('responsible').populate('category');
    return res.status(200).json({ data: assets });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getMyAssets = async (req, res) => {
  const {id} = req.params;
  try {
    // TODO: assets con sus categories (populate) del usuario logueado (solo si el usuario logueado es responsible de assets)
    const myAssets = await AssetModel.findById(id).populate('responsible');
    return res.status(200).json({ data: myAssets });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteAsset = async (req, res) => {
  const {id} = req.params;
  try {
    // TODO: eliminar un asset (solo si el usuario logueado es el responsible del asset)
    const asset = await AssetModel.findByIdAndDelete(id)
    return res.status(204).json({ msg: "Asset eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
