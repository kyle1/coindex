import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import styled from "styled-components";
import Button from "../../../components/Button";
import { apiBaseUrl } from "../../../constants";
import { Asset } from "../../../models/Asset";

const Container = styled.div`
  margin: 10px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface AssetEditProps {
  asset: Asset;
  onSave: () => void;
  onCancel: () => void;
}

const AssetEdit: React.FC<AssetEditProps> = (props: AssetEditProps) => {
  const [assetName, setAssetName] = useState<string>(props.asset?.assetName);
  const [ticker, setTicker] = useState<string>(props.asset?.ticker);
  const [website, setWebsite] = useState<string | undefined>(props.asset?.website);
  const [subreddit, setSubreddit] = useState<string | undefined>(props.asset?.subreddit);
  const [notes, setNotes] = useState<string>(props.asset.notes);

  const handleSaveClick = () => {
    //TODO: validate, then save.
    const asset: Asset = {
      assetId: props.asset?.assetId ?? 0,
      assetName: assetName,
      ticker: ticker,
      website: website,
      subreddit: subreddit,
      notes: notes,
    };

    if (asset.assetId === 0) {
      createAsset(asset);
    } else {
      updateAsset(asset);
    }
  };

  const createAsset = (asset: Asset): void => {
    let options: any = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(asset),
    };
    fetch(`${apiBaseUrl}/assets`, options)
      .then((response) => console.log(response))
      .then(
        () => props.onSave(),
        (error) => console.log(error)
      );
  };

  const updateAsset = (asset: Asset): void => {
    let options: any = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(asset),
    };
    fetch(`${apiBaseUrl}/assets/${asset.assetId}`, options)
      .then((response) => console.log(response))
      .then(
        () => props.onSave(),
        (error) => console.log(error)
      );
  };

  return (
    <Container>
      <b>New Asset</b>
      <br />
      <br />
      Asset name*:
      <br />
      <InputText
        type="text"
        value={assetName}
        style={{ width: "300px" }}
        onChange={(e) => setAssetName(e.target.value)}
      ></InputText>
      <br />
      <br />
      Ticker*:
      <br />
      <InputText
        type="text"
        value={ticker}
        style={{ width: "300px" }}
        onChange={(e) => setTicker(e.target.value)}
      ></InputText>
      <br />
      <br />
      Website:
      <br />
      <InputText
        type="text"
        value={website}
        style={{ width: "300px" }}
        onChange={(e) => setWebsite(e.target.value)}
      ></InputText>
      <br />
      <br />
      Subreddit:
      <br />
      <InputText
        type="text"
        value={subreddit}
        style={{ width: "300px" }}
        onChange={(e) => setSubreddit(e.target.value)}
      ></InputText>
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
        rows={5}
        style={{ width: "100%" }}
      />
      <br />
      <br />
      <Footer>
        <Button onClick={props.onCancel}>Cancel</Button>
        <Button onClick={() => handleSaveClick()}>Save</Button>
      </Footer>
    </Container>
  );
};

export default AssetEdit;
