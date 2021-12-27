import { Asset } from "./models/Asset";
import { AssetEvent } from "./models/AssetEvent";
import { AssetTag } from "./models/AssetTag";
import { PortfolioAsset } from "./models/PortfolioAsset";

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

const assets: Asset[] = [
  {
    assetId: 1,
    assetName: "Bitcoin",
    ticker: "BTC",
    website: "https://bitcoin.org",
    subreddit: "r/bitcoin",
    mentions: 1536,
    tags: [tags[0]],
    competitors: [],
  },
  {
    assetId: 2,
    assetName: "Ethereum",
    ticker: "ETH",
    website: "https://ethereum.org",
    subreddit: "r/ethereum",
    mentions: 1324,
    tags: [tags[0]],
    competitors: [],
  },
  {
    assetId: 3,
    assetName: "Cardano",
    ticker: "ADA",
    website: "https://cardano.org/",
    subreddit: "r/cardano",
    mentions: 1,
    tags: [tags[0]],
    competitors: [],
  },
  {
    assetId: 4,
    assetName: "Algorand",
    ticker: "ALGO",
    website: "https://www.algorand.com/",
    subreddit: "r/AlgorandOfficial",
    mentions: 1337,
    tags: [tags[0]],
    competitors: [],
  },
  {
    assetId: 5,
    assetName: "Loopring",
    ticker: "LRC",
    website: "https://loopring.org",
    subreddit: "r/loopringorg",
    mentions: 934,
    tags: [tags[1], tags[3]],
    competitors: [],
  },
];

assets[1].competitors = [assets[2], assets[3]];
assets[2].competitors = [assets[1], assets[3]];
assets[3].competitors = [assets[1], assets[2]];

const portfolioAssets: PortfolioAsset[] = [
  { asset: assets[0], quantity: 1, percentageOfPortfolio: 35 },
  { asset: assets[1], quantity: 4.8, percentageOfPortfolio: 25 },
  { asset: assets[4], quantity: 15000, percentageOfPortfolio: 30 },
];

const events: AssetEvent[] = [
  {
    assetEventId: 1,
    eventName: "Decipher",
    assetId: 4,
    startDate: new Date(2021, 10, 29),
    endDate: new Date(2021, 10, 30),
    notes: "https://www.algorand.com/resources/blog/whats-new-on-algorand-decipher-is-coming",
    isConfirmed: true,
    isStarred: true,
    asset: assets[3], // Algorand
  },
  {
    assetEventId: 2,
    eventName: "Counterfactual wallet release",
    assetId: 5,
    startDate: new Date(),
    isConfirmed: true,
    isStarred: false,
    asset: assets[4], // Loopring
  },
  {
    assetEventId: 3,
    eventName: "GameStop marketplace release",
    assetId: 5,
    startDate: new Date(2021, 11, 6),
    isConfirmed: false,
    isStarred: true,
    asset: assets[4], // Loopring
  },
];

export { tags, assets, portfolioAssets, events };
