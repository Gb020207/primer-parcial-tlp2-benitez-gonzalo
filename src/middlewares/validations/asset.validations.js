import { body, param } from "express-validator";
import { AssetModel } from "../../models/mongoose/asset.model.js";
import { validator } from '..validator.middleware.js/'

export const createAssetValidation = [
  // TODO: completar las validaciones para crear un recurso
body('inventoryNumber')
    .notEmpty().withMessage('inventoryNumber es obligatorio')
    .isLength({min: 3}).withMessage('El nombre de usuario debe tener al menos 3 caracteres'),
    body('description')
    .notEmpty().withMessage('description es obligatorio'),
    body('brand')
    .notEmpty().withMessage('Brand es obligatorio')
    .isLength({min: 2}).withMessage('Brand debe tener al menos 2 caracteres'),
    body('model')
    .notEmpty().withMessage("El campo model es requerido"),
    body('status').notEmpty().withMessage("El campo status es requerido"),
    body('acquisitionDate').notEmpty().withMessage("el campo acquisitionDate es requerido"),
   body('acquisitionValue').notEmpty().withMessage("el campo acquisitionValue es requerido"),
   body('acquisitionDate').notEmpty().withMessage("el campo acquisitionDate es requerido"),
    validator
];