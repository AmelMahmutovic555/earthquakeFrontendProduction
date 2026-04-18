import EarthquakeInfo from "./EarthquakeInfo";
import "./style/EarthquakeInfo.css"
import { Link } from "react-router";
import useHandleEarthquakes from "./customHooks/useHandleEarthquakes";

export default function FilterEartquakeInfo(){
    const {deleteQuakes, earthquakes, magnitude, time, magError, timeError, deletionError, formInfo, setFormInfo,
        loading,
        earthquakeInfo
    } = useHandleEarthquakes();



    function handleChange(e) {
        const {name, value} = e.target;

        setFormInfo((prevState) => (
            {
                ...prevState,
                [name]: value
            }
        ))
    }

    
    
   return (
        <div className="earthquake-page">
            <div className="earthquake-container">
                

            <Link to={"/earth"}><button className="mapViewBtn">Map View</button></Link>

            <div className="tmpWrapper">
                <EarthquakeInfo earthquakeInfo={earthquakeInfo} loading={loading} />
            </div>
                <div className="earthquake-header">
                    <h1>Earthquake Dashboard</h1>
                    <p>Track and filter earthquake data in a clean and professional view.</p>
                </div>

                <div className="earthquake-controls">
                    <button className="primary-btn" onClick={earthquakes}>
                        Display All
                    </button>

                    <button className="secondary-btn" onClick={magnitude}>
                        Sort by Magnitude
                    </button>
                    {magError.length > 0 &&
                    <div className="error">
                        {magError}
                    </div>
                    }
                    <form className="time-form" onSubmit={time}>
                        <label className="time-label">Filter by Time</label>

                        <div className="time-inputs">
                            <input
                                type="number"
                                name="hour"
                                placeholder="Hour"
                                value={formInfo.hour}
                                onChange={handleChange}
                                required
                                min="0"
                                max="23"
                            />

                            <span>:</span>

                            <input
                                type="number"
                                name="minute"
                                placeholder="Minute"
                                value={formInfo.minute}
                                onChange={handleChange}
                                required
                                min="0"
                                max="59"
                            />
                        </div>

                        <button className="submit-btn" type="submit">
                            Submit
                        </button>
                        {timeError.length > 0 &&
                    <div className="error">
                        {timeError}
                    </div>
                    }
                    </form>

                    <form className="time-form" onSubmit={deleteQuakes}>
                        <label className="time-label">Delete by Place</label>

                        <div className="time-inputs">
                            <input
                                type="text"
                                name="place"
                                placeholder="Place"
                                value={formInfo.place}
                                onChange={handleChange}
                                required
                               
                            />

                      
                        </div>

                        <button className="submit-btn" type="submit">
                            Submit
                        </button>
                        {localStorage.getItem("deletion") !== null &&
                        <div id="succDelete">
                            {localStorage.getItem("deletion")}
                        </div>
                        }

                        {deletionError.length > 0 &&
                            <div className="error">
                                {deletionError}
                            </div>
                        }
                    </form>
                </div>

                {/* <EarthquakeInfo earthquakeInfo={earthquakeInfo} loading={loading} /> */}
            </div>
        </div>
    );
}