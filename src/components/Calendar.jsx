import React, { useState } from 'react';
import { useEffect } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayjs from "dayjs";
import "../styles.css";

export default function Calendar() {

    const [trainings, setTrainings] = useState([]);

    // fetching trainings
    const fetchTrainings = () => {
        fetch('https://traineeapp.azurewebsites.net/api/trainings')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error in fetch: " + response.statusText);
                }
            })
            .then(data => setTrainings(data.content))
            .catch(err => console.error("There is an error with fetch: " + err))
    }

    useEffect(() => {
        fetchTrainings();
    }, [])

    const events = trainings.map(training => ({
        title: training.activity,
        start: dayjs(training.date).format('YYYY-MM-DD HH:mm:ss'),
        end: dayjs(training.date).add(training.duration, 'minutes').format('YYYY-MM-DD HH:mm:ss')
    }))

    return (
        <>
            <FullCalendar
                events={events}
                height="33em"
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'

                }}
            />
        </>
    )
}