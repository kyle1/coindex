import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { apiBaseUrl } from "../constants";
import { AssetTag } from "../models/AssetTag";

//for testing
const TAGS: AssetTag[] = [
  { assetTagId: 1, tagName: "Layer-1" },
  { assetTagId: 2, tagName: "Layer-2" },
  { assetTagId: 3, tagName: "zkRollups" },
  { assetTagId: 4, tagName: "NFT" },
  { assetTagId: 5, tagName: "Privacy" },
];

const Container = styled.div`
  margin: 50px;
`;

interface AssetTagsProps {}

const AssetTags: React.FC<AssetTagsProps> = (props: AssetTagsProps) => {
  const [assetTags, setAssetTags] = useState<any>(null);

  const getTags = () => {
    // fetch(`${apiBaseUrl}/assets/tags`)
    //   .then((response) => response.json())
    //   .then(
    //     (tags) => setAssetTags(tags),
    //     (error) => console.log(error)
    //   );
    setAssetTags(TAGS); //for testing
  };

  useEffect(() => getTags(), []);

  return (
    <Container>
      Tags
      <br />
      <br />
      {assetTags && assetTags.map((tag: any) => <div key={tag.assetTagId}>{tag.tagName}</div>)}
    </Container>
  );
};

export default AssetTags;
