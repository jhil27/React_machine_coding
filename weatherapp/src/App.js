import CityDropDown from './dropdown/dropdown';
import './App.css';
import { useEffect, useState } from 'react';
import TempDetail from './tempCard/tempcard';
import LineChart from './chart/chart';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";


Chart.register(CategoryScale);

function App() {
  const chartData = {
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: [
          'blue',
        ],
        borderWidth: 1,
      }
    ]
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [isTempDataAvailable, setIsTempDataAvailable] = useState(false);
  const [weatherDetails, setWeatherDetails] = useState({});
  const [currentCityTempAvg, setCurrentCityTempAvg] = useState(0);
  const [chartDataSet, setChartDataSet] = useState(chartData);
  // const [whichDate, setWhichdate] = useState('');
  useEffect(() => {
    calculateCurrentCityTempAvg();
  }, [weatherDetails, isTempDataAvailable])


  const handleTempData = (data) => {
    setWeatherDetails({ ...data });
    console.log(data)
    if (Object.keys(data).length > 0) {
      setIsTempDataAvailable(true);
    }
  }

  const calculateCurrentCityTempAvg = () => {
    const average = weatherDetails?.hourly?.temperature_2m.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0) / weatherDetails.hourly?.temperature_2m?.length;
    setCurrentCityTempAvg(Math.ceil(average));
    if (weatherDetails.hourly?.temperature_2m?.length) populateChartData();
  }


  const populateChartData = () => {
    chartData.datasets[0].data = weatherDetails?.hourly?.temperature_2m;
    chartData.labels = weatherDetails?.hourly?.time
    chartData.labels = chartData.labels.map((time) => {
      const date = new Date(time);
      const day = date.getDate();
      const month = monthNames[date.getMonth()];
      return day + " " + month;
    })
    console.log(chartData.labels)
    setChartDataSet({ ...chartData });
  }
  return (
    <div className="App">
      <div>
        <div>
          <CityDropDown fetchtempDetails={handleTempData} />
        </div>
        {isTempDataAvailable ?
          <div style={{ border: 'solid,1px,black', marginTop: '350px' }}>
            {
              isTempDataAvailable ?
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <div>
                    <TempDetail cityTemp={currentCityTempAvg} unit={weatherDetails.hourly_units.temperature_2m} />
                  </div>
                  <div>
                    <LineChart chartData={chartDataSet} />
                  </div>
                </div>
                :
                <div></div>
            }
          </div>
          : null}
      </div>
    </div >
  );
}

export default App;
