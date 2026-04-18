import FilterEartquakeInfo from "./FilterEarthquakeInfo";
import "./style/Header.css"
export default function Home(){
    return <>
        <header className="headerEarthquake">
            <div>
                <h1>Welcome to Daily Earthquake Information</h1>
            </div>
        </header>

        <FilterEartquakeInfo/>
    </>
}