import Training from './components/TrainingList';
import CustomerList from './components/CustomerList';
import Calendar from './components/Calendar';
import Chart from './components/Chart';
import { Tab, Tabs } from "@mui/material";
import { useState } from 'react';

function App() {

  // state navigaation arvolle, eli sille, mikä sivu näkyy
  const [value, setValue] = useState('CustomerList');

  // funktio, joka hoitaa sivun vaihdon
  const handleChange = (event, value) => {
    setValue(value);
  }

  // return, joka näyttää sivun yläreunassa navigaation, 
  // jonka avulla eri sivuille siirrytään
  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        <Tab value="CustomerList" label="Customer"></Tab>
        <Tab value="Training" label="Training"></Tab>
        <Tab value="Calendar" label="Calendar"></Tab>
        <Tab value="Chart" label="Chart"></Tab>
      </Tabs>
      {value === "CustomerList" && <CustomerList />}
      {value === "Training" && <Training />}
      {value === "Calendar" && <Calendar />}
      {value === "Chart" && <Chart />}
    </>
  )
}

export default App
