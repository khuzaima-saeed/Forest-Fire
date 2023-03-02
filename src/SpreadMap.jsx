/* eslint-disable */
import { Map, GoogleApiWrapper, Polygon, Marker} from "google-maps-react";

const SimpleMap = (locations) => {
    let temp = locations["locations"]
    if (temp === ''){
        return (
            <div style={{ height: '50vh', width: '100%' }}>
            </div>
        );
    }
    else {
        let temp2 = []
        {Object.values(temp).map((value) => {
            let temp3 = {}
            temp3["lat"] = value[1]
            temp3["lng"] = value[0]
            temp2.push(temp3)
        })}
        let url = "http://maps.google.com/mapfiles/ms/icons/";
        url += "firedept.png";
        return (
            <div style={{ height: '50vh', width: '100%' }}>
            <Map style={{ height: '100%', width: '100%' }}
                google={google}
                initialCenter={{
                    lat: temp2[0].lat, 
                    lng: temp2[0].lng
                }}
                defaultCenter={{ lat: temp2[0].lat, lng: temp2[0].lng}}
                defaultZoom={2}
            >
            <Marker
                position = {{
                lat: temp2[0].lat,
                lng: temp2[0].lng
                }}
                icon = {{
                    url:url,
                    scaledSize: new google.maps.Size(15, 15)
                }}
            />
            <Polygon
            paths= {temp2}
            strokeColor= "#FF0000"
            strokeOpacity= {0.8}
            strokeWeight= {2}
            fillColor= "#FF0000"
            fillOpacity= {0.35}
            />
            </Map>
            </div>
        );
    }
};

export default GoogleApiWrapper({
    apiKey: "AIzaSyAghkx61FRH1BREoHHWjMI64pZcCiL56SU",
})(SimpleMap);
