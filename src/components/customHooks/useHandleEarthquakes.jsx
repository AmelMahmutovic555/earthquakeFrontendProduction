import axios from "axios";
import { useEffect, useState } from "react";

export default function useHandleEarthquakes(){
        const [earthquakeInfo, setEarthquakeInfo] = useState([]);
        const [formInfo, setFormInfo] = useState({
            hour: 0,
            minute: 0,
            place: ""
        })

        const [loading, setLoading] = useState(true);

    
        const [deletionError, setDeletionError] = useState("");
        const [magError, setMagError] = useState("");
        const [timeError, setTimeError] = useState("");
    

    useEffect(() => {
        async function getInfo() {
            try {
                const result = await axios.get(`https://earthquakebackend.onrender.com/`)
                
                setEarthquakeInfo(result.data)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        getInfo()
    }, [])

    async function handleAll() {
          try {
                setLoading(true);

                const result = await axios.get(`https://earthquakebackend.onrender.com/`)
                
                setEarthquakeInfo(result.data)
            } catch (error) {
                console.error(error);
                            setEarthquakeInfo([]);

            } finally {
                setLoading(false);
            }
    }

    async function handleMagnitude(){
        try {
            setLoading(true);

            const result = await axios.get(`https://earthquakebackend.onrender.com/byMagnitude`);

            setEarthquakeInfo(result.data)
        } catch (error) {
            console.error(error)
            setMagError("No earthquakes found with this magnitude.")
                        setEarthquakeInfo([]);

        } finally {
            setLoading(false);
        }
    }

    async function handleTime(e) {
        e.preventDefault();
         try {
            setLoading(true);

            const result = await axios.get(`https://earthquakebackend.onrender.com/byTime/${formInfo.hour}/${formInfo.minute}`);

            setEarthquakeInfo(result.data)
        } catch (error) {
            console.error(error)
            setTimeError("No earthquakes found at this time.")
                        setEarthquakeInfo([]);

        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(e) {
        e.preventDefault();
         try {

            setLoading(true);

            const result = await axios.delete(`https://earthquakebackend.onrender.com/delete/${formInfo.place}`);

            localStorage.setItem("deletion", "Successfully deleted!");

            setEarthquakeInfo(result.data)

            setInterval(() => {
                localStorage.removeItem("deletion");
            }, 1000)
        } catch (error) {
            console.error(error)
            setDeletionError("The place you provided doesn't have any earthquake records.")
            setEarthquakeInfo([]);
        } finally {
            setLoading(false);
        }
    }

    return {deleteQuakes: handleDelete, time: handleTime, magnitude: handleMagnitude, earthquakes: handleAll, 
        deletionError: deletionError, timeError: timeError, magError: magError, formInfo: formInfo, setFormInfo: setFormInfo,
        earthquakeInfo: earthquakeInfo, loading: loading
    }
}
