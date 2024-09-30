import cities from '../in.json';
import '../App.css';
import { useEffect, useState } from 'react';
function CityDropDown({ fetchtempDetails }) {
    // const weatherApiKey = "f0bc08b9e7984144a41337b2ea42374a";
    const [isOpen, setIsOpen] = useState(false);
    const [latNlong, setLatnLong] = useState({ lat: "", long: "" });
    // const [weatherDetails, setWeatherDetails] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }
    const getSelectedCityInfo = (currentCity) => {
        console.log(currentCity);
        setLatnLong({
            lat: currentCity.lat,
            long: currentCity.lng
        })
        // sendTempDetails();
    }
    // const sendTempDetails = () => {
    //     fetchtempDetails(weatherDetails);
    // }
    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (isMounted) {
            const fetchCurrentCityWeatherDetails = async () => {
                try {
                    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latNlong.lat}&longitude=${latNlong.long}&hourly=temperature_2m`;
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    } else {
                        const data = await response.json();
                        if (data) {
                            // setWeatherDetails(data);
                            fetchtempDetails(data);
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            fetchCurrentCityWeatherDetails();
        }
    }, [latNlong])


    return (
        <div>
            <div className="dropdown">
                <button onClick={toggleDropdown} className='dropdown_btn'>Dropdown</button>
                {isOpen && (
                    <div className="dropdown-content">
                        {
                            cities.map((city) => {
                                return (<a onClick={() => getSelectedCityInfo(city)} className='currentCity'>{city.city}</a>)
                            })
                        }
                    </div>
                )}
            </div>
        </div>
    )
}
export default CityDropDown;
