import React, { useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import styled from "styled-components";
import { Asset } from "../models/Asset";
import { AssetEvent } from "../models/AssetEvent";

//for testing
const algorand: Asset = {
  assetId: 4,
  assetName: "Algorand",
  ticker: "ALGO",
  website: "https://www.algorand.com/",
  subreddit: "r/AlgorandOfficial",
  mentions: 1337,
};

const loopring: Asset = {
  assetId: 5,
  assetName: "Loopring",
  ticker: "LRC",
  website: "https://loopring.org",
  subreddit: "r/loopringorg",
  mentions: 934,
};

//for testing
const dummyEvents: AssetEvent[] = [
  {
    assetEventId: 1,
    eventName: "Decipher",
    assetId: loopring.assetId,
    startDate: new Date(2021, 10, 29),
    endDate: new Date(2021, 10, 30),
    notes: "https://www.algorand.com/resources/blog/whats-new-on-algorand-decipher-is-coming",
    isConfirmed: true,
    isStarred: true,
    asset: algorand,
  },
  {
    assetEventId: 2,
    eventName: "Counterfactual wallet release",
    assetId: loopring.assetId,
    startDate: new Date(),
    isConfirmed: true,
    isStarred: false,
    asset: loopring,
  },
  {
    assetEventId: 3,
    eventName: "GameStop marketplace release",
    assetId: loopring.assetId,
    startDate: new Date(2021, 11, 6),
    isConfirmed: false,
    isStarred: true,
    asset: loopring,
  },
];

const Container = styled.div`
  margin: 50px;
`;

interface EventsProps {}

const Events: React.FC<EventsProps> = (props: EventsProps) => {
  const [events, setEvents] = useState<AssetEvent[]>(dummyEvents);
  const startDateTemplate = (event: AssetEvent): JSX.Element => (
    <>{event.startDate.toDateString()}</>
  );
  const endDateTemplate = (event: AssetEvent): JSX.Element => <>{event?.endDate?.toDateString()}</>;

  return (
    <Container>
      <DataTable
        value={events}
        className="p-datatable-sm p-datatable-striped"
        paginator
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rows={20}
        rowsPerPageOptions={[10, 20, 50]}
      >
        <Column
          field="startDate"
          header="Start"
          headerStyle={{ width: "100px" }}
          body={startDateTemplate}
          sortable
        />
        <Column
          field="endDate"
          header="End"
          headerStyle={{ width: "100px" }}
          body={endDateTemplate}
          sortable
        />
        <Column field="asset.assetName" header="Asset" headerStyle={{ width: "100px" }} sortable />
        <Column field="eventName" header="Event" headerStyle={{ width: "100px" }} sortable />
        <Column field="notes" header="Notes" headerStyle={{ width: "100px" }} sortable />
        <Column field="isConfirmed" header="Confirmed" headerStyle={{ width: "70px" }} sortable />
        <Column field="isStarred" header="Starred" headerStyle={{ width: "70px" }} sortable />
      </DataTable>
    </Container>
  );
};

export default Events;
