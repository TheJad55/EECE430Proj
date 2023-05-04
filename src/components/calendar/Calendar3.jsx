import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Header from "./Header";
import { tokens } from "./theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  // Fetch events from the backend
  const fetchEvents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/myteamevents", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        },
      });
  
      if (response.ok) {
        const data = await response.json();
  
        // Set a minimum duration of 30 minutes for events with the same start and end times
        const updatedData = data.map((event) => {
          if (event.EventStart === event.EventEnd) {
            const startDate = new Date(event.EventStart);
            const endDate = new Date(startDate);
            endDate.setMinutes(startDate.getMinutes() + 30);
            event.EventEnd = endDate.toISOString();
          }
          return event;
        });
  
        setCurrentEvents(updatedData);
      } else {
        console.error("Failed to fetch events");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  
  

  useEffect(() => {
    fetchEvents();
  }, []);
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <section id="calendar" className="w-full py-20 border-b-[1px] border-b-black">
      <Box m="20px">
        <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

        <Box display="flex" justifyContent="space-between">
          {/* CALENDAR */}
          <Box flex="1 1 100%" ml="15px">
            <FullCalendar
              height="75vh"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              initialView="dayGridMonth"
              editable={false}
              events={currentEvents.map((event) => ({
                id: event.id,
                title: event.EventName,
                start: new Date(event.EventStart).toISOString(),
                end: new Date(event.EventEnd).toISOString(),
                allDay: event.allDay || false,
                backgroundColor: "#2d3748",
                borderColor: "#2d3748",
                textColor: "white",
              }))}
            />
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default Calendar;
