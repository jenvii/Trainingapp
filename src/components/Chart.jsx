import { useState, useEffect } from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import _ from 'lodash';

export default function Chart() {

    const [chartData, setChartData] = useState([]);

    const fetchTrainings = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error in fetch: " + response.statusText);
                }
            })
            .then(data => {
                const groupData = _.groupBy(data, 'activity');
                const sumData = _.map(groupData, (group, activity) => ({ activity, duration: _.sumBy(group, 'duration') }))
                setChartData(sumData);
            })
            .catch(err => console.error("There is an error with fetch: " + err))
    }

    useEffect(() => {
        fetchTrainings();
    }, [])

    return (
        <>
            <div className="chart">
                <BarChart width={600} height={300} data={chartData}>
                    <XAxis dataKey="activity" interval={0} />
                    <YAxis dataKey="duration" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="duration" fill="pink" />
                </BarChart>
            </div>
        </>
    )

}