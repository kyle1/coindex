import React from "react";

interface AssetProps {}

const Asset: React.FC<AssetProps> = (props: AssetProps) => {
  console.log("Asset evaluated");

  return <div>asset</div>;
};

export default Asset;
