import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { Calendar } from "primereact/calendar";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Asset } from "../../models/Asset";

//for testing
const assets: Asset[] = [
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

interface CreateEventProps {}

const CreateEvent: React.FC<CreateEventProps> = (props: CreateEventProps) => {
  const [eventName, setEventName] = useState<string>("");
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset>();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [notes, setNotes] = useState<string>("");

  const searchAsset = (event: { query: string }) => {
    setTimeout(() => {
      let _filteredAssets;
      if (!event.query.trim().length) {
        _filteredAssets = [...assets];
      } else {
        _filteredAssets = assets.filter((asset) =>
          asset.assetName.toLowerCase().startsWith(event.query.toLowerCase())
        );
      }
      setFilteredAssets(_filteredAssets);
    }, 250);
  };

  const handleSaveClick = () => {
    //TODO: validate, then save.
    console.log("TODO");
  };

  return (
    <div>
      <b>New Event</b>
      <br />
      <br />
      Event name*:
      <Input
        type="text"
        value={eventName}
        style={{ width: "300px", marginLeft: "10px" }}
        onChange={(e) => setEventName(e.target.value)}
      ></Input>
      <br />
      Asset*:
      <AutoComplete
        value={selectedAsset}
        suggestions={filteredAssets}
        completeMethod={searchAsset}
        field="assetName"
        onChange={(e) => setSelectedAsset(e.value)}
      />
      <br />
      <br />
      Start Date*:
      <Calendar id="basic" value={startDate} onChange={(e) => setStartDate(e.value as Date)} />
      <br />
      <br />
      End Date:
      <Calendar id="basic" value={endDate} onChange={(e) => setStartDate(e.value as Date)} />
      <br />
      <br />
      Notes:
      <Input
        type="text"
        value={notes}
        style={{ width: "300px", marginLeft: "10px" }}
        onChange={(e) => setNotes(e.target.value)}
      ></Input>
      <br />
      <br />
      Confirmed
      <br />
      <br />
      Starred
      <br />
      <br />
      <Button>Cancel</Button>
      <Button onClick={() => handleSaveClick()}>Save</Button>
    </div>
  );
};

export default CreateEvent;
