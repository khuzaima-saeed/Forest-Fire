import GoogleMapReact from 'google-map-react'
import './map.css'
import './marker.css'

const handleApiLoaded = (map, maps, coords) => {

        var bermudaTriangle = new maps.Polygon({
        paths: coords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35
    });
    bermudaTriangle.setMap(map);
}

const SimpleMap = (locations) => {
    let temp = locations["locations"]
    if (temp === ''){
        return (
            <div style={{ height: '50vh', width: '100%' }}>
            {/* <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyAghkx61FRH1BREoHHWjMI64pZcCiL56SU' }}
                defaultCenter={{ lat: 31.5, lng: 74.35}}
                defaultZoom={12}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, [{ lat: 31.5, lng: 74.35}])}
            > 
            </GoogleMapReact> */}
            </div>
        );
    }
    else {
        let temp2 = []
        {Object.values(temp).map((value) => {
            let temp3 = {}
            temp3["lat"] = value[0]
            temp3["lng"] = value[1]
            temp2.push(temp3)
        })}
        return (
            <div style={{ height: '50vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyAghkx61FRH1BREoHHWjMI64pZcCiL56SU' }}
                defaultCenter={{ lat: temp2[0].lat, lng: temp2[0].lng}}
                defaultZoom={12}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, temp2)}
            > 
            </GoogleMapReact>
            </div>
        );
    }
};

export default SimpleMap;
