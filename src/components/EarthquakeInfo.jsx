import { useEffect, useState } from "react"
import axios from "axios"
import "./style/EarthquakeInfo.css"
export default function EarthquakeInfo({earthquakeInfo, loading}){

     if(loading){
        return <>
            Loading...
        </>
    }
   return (
        <section className="earthquake-table-section">
            <div className="table-wrapper">
                <table className="earthquake-table">
                    <thead>
                        <tr>
                            <th>Place</th>
                            <th>Title</th>
                            <th>Magnitude</th>
                            <th>Magnitude Type</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {earthquakeInfo.length > 0 ? (
                            earthquakeInfo.map((e) => (
                                <tr key={e.id}>
                                    <td>{e.place}</td>
                                    <td>{e.title}</td>
                                    <td>{e.magnitude}</td>
                                    <td>{e.magType}</td>
                                    <td>{e.time.split(".")[0]}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="no-data">
                                    No earthquake data found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}