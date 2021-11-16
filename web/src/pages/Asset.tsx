import React from "react";
import { apiBaseUrl } from "../constants";

interface AssetProps {}

const Asset: React.FC<AssetProps> = (props: AssetProps) => {
  console.log("Asset evaluated");

  const saveAsset = (asset: any) => {
    console.log("saving asset...");
    let options: any = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(asset),
    };
    fetch(`${apiBaseUrl}/assets`, options)
      .then((response) => response.json())
      .then(
        () => console.log("save completed"),
        (error) => console.log(error)
      );
  };

  const handleSaveClick = () => {
    saveAsset({});
  };

  return (
    <div>
      TODO:
      <br />
      Rate asset on different metrics. Save.
      <br />
      <br />
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
};

export default Asset;
