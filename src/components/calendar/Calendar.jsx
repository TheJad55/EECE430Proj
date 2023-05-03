import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { startOfDay, endOfDay } from 'date-fns';
import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "./Header";
import { tokens } from "./theme";
import { color } from "framer-motion";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  // Fetch events from the backend
  const fetchEvents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/event", {
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

  const handleDateClick = async (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();
  
    if (title) {
      const startDate = new Date(selected.startStr);
      const endDate = new Date(startDate);
      const isAllDay = selected.allDay;
  
      if (isAllDay) {
        endDate.setDate(startDate.getDate() + 1);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
      } else {
        endDate.setMinutes(startDate.getMinutes() + 60);
      }
  
      const endStr = endDate.toISOString();
  
      const newEvent = {
        EventName: title,
        EventType: "Custom",
        Team: "Lebron",
        EventStart: new Date(startDate).toISOString(),
        EventEnd: new Date(endStr).toISOString(),
        EventParticipants: "AllTeam",
        EventOrganizer: "Botros",
        allDay: isAllDay,
      };
  
      try {
        const response = await fetch("http://127.0.0.1:8000/event", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("access_token"),
          },
          body: JSON.stringify(newEvent),
        });
  
        if (response.ok) {
          fetchEvents();
        } else {
          console.error("Failed to post new event");
        }
      } catch (error) {
        console.error("Error posting new event:", error);
      }
    }
  };
  
  


  const handleEventClick = async (info) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${info.event.title}'`
      )
    ) {
      info.event.remove(); // Remove the event from the calendar interface immediately

      try {
        const eventId = info.event.id;
        const response = await fetch(
          `http://127.0.0.1:8000/delete/event/${eventId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.getItem("access_token"),
            },
          }
        );
        fetchEvents();

        if (!response.ok) {
          console.error("Failed to delete the event");
          // Handle the error case, such as re-adding the event to the calendar or showing an error message
        }
      } catch (error) {
        console.error("Error deleting the event:", error);
        // Handle the error case, such as re-adding the event to the calendar or showing an error message
      }
    }
  };
  
  
  
  return (
    <section id="calendar" className="w-full py-20 border-b-[1px] border-b-black">
      <Box m="20px">
        <Header title="Calendar" subtitle="Full Calendar Interactive Page" />
  
        <Box display="flex" justifyContent="space-between">
          {/* CALENDAR SIDEBAR */}
          <Box
            flex="1 1 20%"
            backgroundColor={colors.primary[400]}
            p="15px"
            borderRadius="4px"
          >
            <Typography variant="h5">Events</Typography>
            <List>
              {currentEvents.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor: " #2d3748",
                    Color:" #2d3748",
                    textColor:"white",
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>
                        {new Date(event.start).toLocaleString("default", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
  
          {/* CALENDAR */}
          <Box flex="1 1 100%" ml="15px">
          <FullCalendar
          height="75vh"
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          }}
          initialView="dayGridMonth"
          editable={false}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          select={(selected) => {
            const isAllDay = selected.allDay;
            handleDateClick(selected, isAllDay);
          }}
          eventClick={handleEventClick}
          eventsSet={(events) => {
            if (events.length !== currentEvents.length) {
              setCurrentEvents(events);
            }
          }}
          events={currentEvents.map((event) => ({
            id: event.id,
            title: event.EventName,
            start: event.EventStart,
            end: event.EventEnd,
            allDay: event.allDay || false,
            backgroundColor:"#2d3748",
            color:" #2d3748"
          }))}
          
          selectConstraint={{
            minutes: 60,
          }}
          eventResizableFromStart={false} 
          eventResizableFromEnd={false} 
          eventDraggable={false} 
        />

          </Box>
        </Box>
      </Box>
    </section>
  );
 };

export default Calendar;
          