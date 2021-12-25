import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import styled from "styled-components";
import { apiBaseUrl } from "../constants";
import { Asset as AssetDto } from "../models/Asset";
import { AssetTag } from "../models/AssetTag";

//for testing
const tags: AssetTag[] = [
  { assetTagId: 1, tagName: "Layer-1", description: "Layer-1" },
  { assetTagId: 2, tagName: "Layer-2", description: "Layer-2" },
  { assetTagId: 3, tagName: "Currency", description: "Currency" },
  { assetTagId: 4, tagName: "zkRollups", description: "zkRollups" },
  { assetTagId: 5, tagName: "NFT", description: "NFT" },
  { assetTagId: 6, tagName: "Privacy", description: "Privacy" },
  { assetTagId: 7, tagName: "Interoperability", description: "Interoperability" },
  { assetTagId: 8, tagName: "Fiat bridge", description: "Fiat bridge" },
];

//for testing
const assets: AssetDto[] = [
  {
    assetId: 1,
    assetName: "Bitcoin",
    ticker: "BTC",
    website: "https://bitcoin.org",
    subreddit: "r/bitcoin",
    mentions: 1536,
  },
  {
    assetId: 2,
    assetName: "Ethereum",
    ticker: "ETH",
    website: "https://ethereum.org",
    subreddit: "r/ethereum",
    mentions: 1324,
  },
  {
    assetId: 3,
    assetName: "Cardano",
    ticker: "ADA",
    website: "https://cardano.org/",
    subreddit: "r/cardano",
    mentions: 1,
  },
  {
    assetId: 4,
    assetName: "Algorand",
    ticker: "ALGO",
    website: "https://www.algorand.com/",
    subreddit: "r/AlgorandOfficial",
    mentions: 1337,
  },
  {
    assetId: 5,
    assetName: "Loopring",
    ticker: "LRC",
    website: "https://loopring.org",
    subreddit: "r/loopringorg",
    mentions: 934,
  },
];

//for testing
const asset: AssetDto = {
  assetId: 4,
  assetName: "Algorand",
  ticker: "ALGO",
  website: "https://www.algorand.com/",
  subreddit: "r/AlgorandOfficial",
  mentions: 1337,
  tags: [tags[0], tags[2]],
  competitors: [assets[1], assets[2]],
};

const Container = styled.div`
  margin: 50px;

  .link {
    color: white;
    text-decoration: none;
  }
`;

interface AssetProps {}

const Asset: React.FC<AssetProps> = (props: AssetProps) => {
  console.log("Asset evaluated");
  const [filteredTags, setFilteredTags] = useState<any>(null);
  const [selectedTags, setSelectedTags] = useState<AssetTag[]>(asset.tags!);
  const [filteredCompetitors, setFilteredCompetitors] = useState<any>(null);
  const [selectedCompetitors, setSelectedCompetitors] = useState<AssetDto[]>(asset.competitors!);

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

  const searchCompetitor = (event: { query: string }) => {
    setTimeout(() => {
      let _filteredCompetitors;
      if (!event.query.trim().length) {
        _filteredCompetitors = [...assets];
      } else {
        _filteredCompetitors = assets.filter((asset) => {
          return asset.assetName.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      setFilteredCompetitors(_filteredCompetitors);
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
      <b>Website:</b>{" "}
      <a href={asset.website} className="link">
        {asset.website}
      </a>
      <br />
      <b>Subreddit:</b>{" "}
      <a href={`https://reddit.com/${asset.subreddit}`} className="link">
        {asset.subreddit}
      </a>
      <br />
      <br />
      <b>Tags</b>
      {/* <br />
      {asset.tags?.map((tag, index, arr) => (
        <span>{tag.tagName + (index + 1 !== arr.length ? ", " : "")}</span>
      ))} */}
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
      <b>Competitors*</b>
      <br />
      {/* {asset.competitors?.map((competitor, index, arr) => (
        <span>{competitor.assetName + (index + 1 !== arr.length ? ", " : "")}</span>
      ))}
      <br /> */}
      <AutoComplete
        value={selectedCompetitors}
        suggestions={filteredCompetitors}
        completeMethod={searchCompetitor}
        field="assetName"
        multiple
        onChange={(e) => setSelectedCompetitors(e.value)}
      />
      <br />
      <div>*TODO: Allow notes. Link to other competitor assets.</div>
      <br />
      <br />
      Research ideas:
      https://ren-heinrich.medium.com/how-to-research-crypto-projects-a-step-by-step-guide-744fdc822b99
      <br />
      Input fields for notes/ratings on different metrics:
      <br />
      <ul>
        <li>Purpose</li>
        <li>Transaction speed</li>
        <li>Transaction cost</li>
        <li>Decentralization/security</li>
        <li>Tokenomics</li>
        <li>Website</li>
        <li>Whitepaper</li>
        <li>App(s)?</li>
        <li>Team</li>
        <li>Roadmap (what's coming up? has team shown ability to meet their goals on schedule?)</li>
        <ul>
          <li>Separate page will track upcoming events/goals for all assets.</li>
        </ul>
        <li>On-chain data (# of active addresses, # new addresses, transaction volume, etc.)</li>
        <li>Barriers to entry/Ease of use</li>
        <li>Staking/reward incentives</li>
        <li>Total value locked (higher TVL =&gt; lower downside?)</li>
        <li>Partnerships/funding</li>
        <li>Exchange listings</li>
        <li>Volume (high volume can lead to new exchange listings)</li>
        <li>Development activity (open source? regular contributions? most recent code update?)</li>
        <li>
          Developer adoption/adoptability (are developers interested in building on the platform?
          which programming languages are supported? good developer docs?)
        </li>
        <li>Marketing</li>
        <li>Social media presence &amp; following</li>
        <li>General sentiment (what are people saying?)</li>
        <li>
          Analysts to track (article writers, reddit posters, etc. who are dialed-in to project)
        </li>
        <li>Useful links (relevant websites, news articles, reddit posts/comments, etc.)</li>
        <li>Competitors/similar coins</li>
      </ul>
      <br />
      <br />
      <b>Mentions</b>
      <br />
      TODO
      {/* <br/><br/>
      <button onClick={handleSaveClick}>Save</button> */}
    </Container>
  );
};

export default Asset;
