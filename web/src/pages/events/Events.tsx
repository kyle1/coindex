import React, { useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import styled from "styled-components";
import CreateEvent from "./CreateEvent";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { AssetEvent } from "../../models/AssetEvent";
import { events as testEvents } from "../../testData";

const Container = styled.div`
  margin: 50px;
`;

interface EventsProps {}

const Events: React.FC<EventsProps> = (props: EventsProps) => {
  const [showCreateEvent, setShowCreateEvent] = useState<boolean>(false);
  const [events, setEvents] = useState<AssetEvent[]>(testEvents);

  const startDateTemplate = (event: AssetEvent): JSX.Element => (
    <>{event.startDate.toDateString()}</>
  );
  const endDateTemplate = (event: AssetEvent): JSX.Element => <>{event?.endDate?.toDateString()}</>;

  return (
    <>
      {showCreateEvent && (
        <Modal onConfirm={() => {}} onClose={() => setShowCreateEvent(false)}>
          <CreateEvent />
        </Modal>
      )}
      {!showCreateEvent && (
        <Container>
          <Button onClick={() => setShowCreateEvent(true)}>New</Button>
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
            <Column
              field="asset.assetName"
              header="Asset"
              headerStyle={{ width: "100px" }}
              sortable
            />
            <Column field="eventName" header="Event" headerStyle={{ width: "100px" }} sortable />
            <Column field="notes" header="Notes" headerStyle={{ width: "100px" }} sortable />
            <Column
              field="isConfirmed"
              header="Confirmed"
              headerStyle={{ width: "70px" }}
              sortable
            />
            <Column field="isStarred" header="Starred" headerStyle={{ width: "70px" }} sortable />
          </DataTable>
        </Container>
      )}
    </>
  );
};

export default Events;
