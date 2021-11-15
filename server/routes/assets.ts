import express from "express";
import { getAssets, getAssetById, createAsset, deleteAsset } from "../controllers/assets";

const assetsRouter = express.Router();

assetsRouter.get("/", getAssets);

assetsRouter.get("/:id", getAssetById);

assetsRouter.post("/", createAsset);

assetsRouter.delete("/:id", deleteAsset);

export default assetsRouter;
