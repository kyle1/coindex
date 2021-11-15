import { Asset } from "../models/Asset";
import HttpError from "../models/http-error";

export const getAssets = (req: any, res: any, next: any) => {
  console.log("GET Request in assets");
  res.json({ message: "It works" });
};

export const getAssetById = (req: any, res: any, next: any) => {
  const assetId = req.params.id;

  const asset = null; //for testing
  if (asset == null) {
    const error: HttpError = {
      message: "Could not find an asset for the provided asset ID.",
      code: 404,
    };
    return next(error);
  }

  res.json({ assetId: assetId });
};

export const createAsset = (req: any, res: any, next: any) => {
  console.log(req.body);
  //   const { assetId, assetName, ticker, subreddit } = req.body;

  //   const newAsset: Asset = {
  //     assetId: assetId,
  //     assetName: assetName,
  //     ticker: ticker,
  //     subreddit: subreddit,
  //   };
  //   res.status(201).json({ asset: newAsset });
  res.status(201).json({ body: req.body });
};

export const updateAsset = (req: any, res: any, next: any) => {
  //update the object
  let asset = {};
  res.status(200).json({ asset: asset });
};

export const deleteAsset = (req: any, res: any, next: any) => {
  //delete the object
  res.status(200).json({ message: "Deleted asset." });
};
