import React, { useState } from "react";
import { Button as PrimeButton } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import styled from "styled-components";
import EventEdit from "./EventEdit";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { AssetEvent } from "../../models/AssetEvent";
import { events as testEvents } from "../../testData";
import { apiBaseUrl } from "../../constants";

const Container = styled.div`
  margin: 10px;

  .p-datatable {
    font-size: 13px;
  }
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 26px;
`;

interface EventsMaintenanceProps {}

const EventsMaintenance: React.FC<EventsMaintenanceProps> = (props: EventsMaintenanceProps) => {
  console.log("Evaluating EventsMaintenance...");
  console.log(props);
  const [showEventEdit, setShowEventEdit] = useState<boolean>(false);
  const [events, setEvents] = useState<AssetEvent[]>(testEvents);
  const [selectedEvent, setSelectedEvent] = useState<AssetEvent | null>();

  const getEvents = (): void => {
    // fetch(`${apiBaseUrl}/events`)
    //   .then((response) => response.json())
    //   .then(
    //     (events: AssetEvent[]) => setEvents(events),
    //     (error) => console.log(error)
    //   );
    setEvents(testEvents);
  };

  const deleteEvent = (id: number): void => {
    let options: any = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: null,
    };
    fetch(`${apiBaseUrl}/events/${id}`, options)
      .then((response) => console.log(response))
      .then(
        () => getEvents(),
        (error) => console.log(error)
      );
  };

  const header: JSX.Element = (
    <Heading>
      Assets
      <Button onClick={() => handleNewClick()}>
        <i className="fas fa-plus" />
      </Button>
    </Heading>
  );

  const handleNewClick = (): void => {
    setSelectedEvent(null);
    setShowEventEdit(true);
  };

  const handleEditClick = (event: AssetEvent): void => {
    setSelectedEvent(event);
    setShowEventEdit(true);
  };

  const handleEventSave = (): void => {
    setShowEventEdit(false);
    getEvents();
  };

  const startDateTemplate = (event: AssetEvent): JSX.Element => (
    <>{event.startDate.toDateString()}</>
  );
  const endDateTemplate = (event: AssetEvent): JSX.Element => <>{event?.endDate?.toDateString()}</>;

  const actionBodyTemplate = (event: AssetEvent): JSX.Element => (
    <>
      <PrimeButton
        icon="pi pi-pencil"
        className="p-button-rounded p-button-success"
        style={{ height: "30px", width: "30px", marginRight: "15px" }}
        onClick={() => handleEditClick(event)}
      />
      <PrimeButton
        icon="pi pi-trash"
        className="p-button-rounded p-button-warning"
        style={{ height: "30px", width: "30px" }}
        onClick={() => deleteEvent(event.assetEventId)}
      />
    </>
  );

  return (
    <>
      {showEventEdit && (
        <Modal onConfirm={() => {}} onClose={() => setShowEventEdit(false)}>
          <EventEdit
            event={selectedEvent!}
            onSave={handleEventSave}
            onCancel={() => setShowEventEdit(false)}
          />
        </Modal>
      )}
      {!showEventEdit && (
        <Container>
          <DataTable
            value={events}
            //size="small"
            className="p-datatable-sm"
            header={header}
            // paginator
            // paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            // currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            // rows={20}
            // rowsPerPageOptions={[10, 20, 50]}
          >
            <Column
              field="startDate"
              header="Start"
              headerStyle={{ width: "200px" }}
              body={startDateTemplate}
              sortable
            />
            <Column
              field="endDate"
              header="End"
              headerStyle={{ width: "200px" }}
              body={endDateTemplate}
              sortable
            />
            <Column
              field="asset.assetName"
              header="Asset"
              headerStyle={{ width: "200px" }}
              sortable
            />
            <Column field="eventName" header="Event" headerStyle={{ width: "500px" }} sortable />
            {/* <Column field="notes" header="Notes" headerStyle={{ width: "100px" }} sortable /> */}
            <Column
              field="isConfirmed"
              header="Confirmed"
              headerStyle={{ width: "100px" }}
              sortable
            />
            <Column field="isStarred" header="Starred" headerStyle={{ width: "100px" }} sortable />
            <Column header="" body={actionBodyTemplate} sortable />
          </DataTable>
        </Container>
      )}
    </>
  );
};

export default EventsMaintenance;
