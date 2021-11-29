import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import styled from "styled-components";
import { apiBaseUrl } from "../constants";
import { Asset as AssetDto } from "../models/Asset";

// const tags = [
//   "Layer-1",
//   "Layer-2",
//   "zkRollups",
//   "NFT"
// ];

//for testing
const asset: AssetDto = {
  assetId: 3,
  assetName: "Loopring",
  ticker: "LRC",
  website: "https://loopring.org/",
  subreddit: "r/loopringorg",
};

const tags = [
  { tagId: 1, tagName: "Layer-1" },
  { tagId: 2, tagName: "Layer-2" },
  { tagId: 3, tagName: "zkRollups" },
  { tagId: 4, tagName: "NFT" },
  { tagId: 5, tagName: "Privacy" },
];

const Container = styled.div`
  margin: 50px;
`;

interface AssetProps {}

const Asset: React.FC<AssetProps> = (props: AssetProps) => {
  console.log("Asset evaluated");
  const [filteredTags, setFilteredTags] = useState<any>(null);
  const [selectedTags, setSelectedTags] = useState<any>(null);

  const searchTag = (event: { query: string }) => {
    setTimeout(() => {
      let _filteredTags;
      if (!event.query.trim().length) {
        _filteredTags = [...tags];
      } else {
        _filteredTags = tags.filter((tag) => {
          return tag.tagName.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      setFilteredTags(_filteredTags);
    }, 250);
  };

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
    <Container>
      <h3>
        {asset.assetName} ({asset.ticker})
      </h3>
      <br />
      <b>Website:</b> {asset.website}
      <br />
      <b>Subreddit:</b> {asset.subreddit}
      <br />
      <br />
      Input fields for notes/ratings on different metrics:
      <br />
      <ul>
        <li>Transaction speed</li>
        <li>Transaction cost</li>
        <li>Decentralization</li>
        <li>Tokenomics</li>
        <li>Team</li>
        <li>Roadmap</li>
        <li>Social Media Presence</li>
        <li>Hype</li>
      </ul>
      <br />
      <br />
      Asset tags
      <br />
      <AutoComplete
        value={selectedTags}
        suggestions={filteredTags}
        completeMethod={searchTag}
        field="tagName"
        multiple
        onChange={(e) => setSelectedTags(e.value)}
      />
      <br />
      <br />
      Allow user to add links/notes to competitor projects (e.g. Loopring/Polygon) - PrimeReact
      Autocomplete (Multiple)
      {/* <br/><br/>
      <button onClick={handleSaveClick}>Save</button> */}
    </Container>
  );
};

export default Asset;
