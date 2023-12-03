import React, { useState } from 'react';
import { useEffect } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayjs from "dayjs";
import "../styles.css";

export default function Calendar() {

    // statet treeneille
    const [trainings, setTrainings] = useState([]);

    // haetaan treenit ja niiden asiakkaat
    const fetchTrainings = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error in fetch: " + response.statusText);
                }
            })
            .then(data => setTrainings(data))
            .catch(err => console.error("There is an error with fetch: " + err))
    }

    // kutsutaan treenien hakua
    useEffect(() => {
        fetchTrainings();
    }, [])

    // määritellään kalenteriin tulevat tapahtumat 
    // ja niiden alkamis- ja päättymisajat
    const events = trainings.map(training => ({
        title: training.activity + " / " + training.customer.firstname + " " + training.customer.lastname,
        start: dayjs(training.date).format('YYYY-MM-DD HH:mm'),
        end: dayjs(training.date).add(training.duration, 'minutes').format('YYYY-MM-DD HH:mm')
    }))

    // return, joka palauttaa kalenterinäkymän, jossa näkyy treenit 
    // niiden oikeina ajankohtina, ja treeniin kuuluva asiakas
    return (
        <>
            <FullCalendar
                events={events}
                firstDay={1}
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