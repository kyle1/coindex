import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { Calendar } from "primereact/calendar";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { InputTextarea } from "primereact/inputtextarea";
import { Asset } from "../../models/Asset";
import { AssetEvent } from "../../models/AssetEvent";
import { assets } from "../../testData";

interface EventEditProps {
  event: AssetEvent;
  onSave: () => void;
  onCancel: () => void;
}

const EventEdit: React.FC<EventEditProps> = (props: EventEditProps) => {
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
      <br />
      <Input
        type="text"
        value={eventName}
        style={{ width: "300px" }}
        onChange={(e) => setEventName(e.target.value)}
      ></Input>
      <br />
      <br />
      Asset*:
      <br />
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
      <br />
      <Calendar id="basic" value={startDate} onChange={(e) => setStartDate(e.value as Date)} />
      <br />
      <br />
      End Date:
      <br />
      <Calendar id="basic" value={endDate} onChange={(e) => setStartDate(e.value as Date)} />
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

export default EventEdit;
