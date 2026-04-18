import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import "./style/EarthquakeMapInfo.css"
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});
export default function EarthquakeMapInfo(){
   const [earthquakes, setEarthquakes] = useState([]);
 const [loading, setLoading] = useState(true);

  // Default map center (World view)
  const defaultPosition = [20, 0];

  useEffect(() => {
     async function getInfo() {
            try {
                const result = await axios.get(`https://earthquakebackend.onrender.com`)
                
                setEarthquakes(result.data)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        getInfo()
  }, []);

  // Dynamically center map on first earthquake with valid coordinates
  const validEarthquakes = earthquakes.filter(
    (e) => e.latitude !== null && e.longitude !== null
  );

  const mapCenter =
    validEarthquakes.length > 0
      ? [validEarthquakes[0].latitude, validEarthquakes[0].longitude]
      : defaultPosition;

  if (loading) {
    return <h2 style={{ textAlign: "center", marginBlock: "50vh" }}>Loading earthquake data...</h2>;
  }
   
   
    return <>
    
      <div style={{ height: "100vh", width: "100%", position: "relative" }}>
     
     {/* <div className='mapMagnitudeFilter'>
        <p>Hello</p>
      </div> */}
      <MapContainer
        center={mapCenter}
        zoom={validEarthquakes.length > 0 ? 5 : 2}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
         

        {validEarthquakes.map((e) => (
          <Marker key={e.id} position={[e.latitude, e.longitude]}>
            <Popup>
              <strong>{e.place}</strong>
              <br />
              Magnitude: {e.magnitude}
              <br />
              Type: {e.magType}
              <br />
              Depth: {e.depth} km
              <br />
              Time: {e.time}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
    </>
}
