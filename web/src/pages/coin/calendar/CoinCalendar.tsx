import React, { useState } from "react";
// import { FullCalendar } from "primereact/fullcalendar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { AssetEvent } from "../../../models/AssetEvent";

interface CoinCalendarProps {}

const CoinCalendar: React.FC<CoinCalendarProps> = (props: CoinCalendarProps) => {
  //const [events, setEvents] = useState<any[]>([]);

  const events: any[] = [
    {
      id: "a",
      title: "my event",
      start: "2021-01-05",
    },
  ];

  const options = {
    //plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    defaultView: "dayGridMonth",
    defaultDate: "2022-01-04",
    header: {
      left: "prev,next",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    editable: true,
  };

  return <div></div>; //<FullCalendar events={events} options={options} />;
};

export default CoinCalendar;
