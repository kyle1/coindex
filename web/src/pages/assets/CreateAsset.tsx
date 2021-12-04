import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { Calendar } from "primereact/calendar";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { InputTextarea } from "primereact/inputtextarea";
import { Asset } from "../../models/Asset";

interface CreateAssetProps {}

const CreateAsset: React.FC<CreateAssetProps> = (props: CreateAssetProps) => {
  const [assetName, setAssetName] = useState<string>("");
  const [ticker, setTicker] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [subreddit, setSubreddit] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const handleSaveClick = () => {
    //TODO: validate, then save.
    console.log("TODO");
  };

  return (
    <div>
      <b>New Event</b>
      <br />
      <br />
      Asset name*:
      <br />
      <Input
        type="text"
        value={assetName}
        style={{ width: "300px" }}
        onChange={(e) => setAssetName(e.target.value)}
      ></Input>
      <br />
      <br />
      Ticker*:
      <br />
      <Input
        type="text"
        value={ticker}
        style={{ width: "300px" }}
        onChange={(e) => setTicker(e.target.value)}
      ></Input>
      <br />
      <br />
      Website:
      <br />
      <Input
        type="text"
        value={ticker}
        style={{ width: "300px" }}
        onChange={(e) => setWebsite(e.target.value)}
      ></Input>
      <br />
      <br />
      Subreddit:
      <br />
      <Input
        type="text"
        value={ticker}
        style={{ width: "300px" }}
        onChange={(e) => setSubreddit(e.target.value)}
      ></Input>
      <br />
      <br />
      Notes:
      <br />
      {/* <Input
        type="text"
        value={notes}
        style={{ width: "300px" }}
        onChange={(e) => setNotes(e.target.value)}
      ></Input> */}
      <InputTextarea
        id="notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        required
        rows={3}
        cols={20}
      />
      <br />
      <br />
      <Button>Cancel</Button>
      <Button onClick={() => handleSaveClick()}>Save</Button>
    </div>
  );
};

export default CreateAsset;
