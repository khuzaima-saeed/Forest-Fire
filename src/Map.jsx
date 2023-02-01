import GoogleMapReact from 'google-map-react'
import './map.css'
import './marker.css'

const Marker = props => {
  return <>
    <div className="pin"></div>
    <div className="pulse"></div>
  </>
}

  const Map = (locations) => {
    console.log(locations)
    var temp = locations["locations"][0]
    var temp2 = locations["locations"]
    if (temp === undefined) {
        return (
          <div style={{ height: '50vh', width: '100%' }}>
           {/* <GoogleMapReact
             bootstrapURLKeys={{ key: 'AIzaSyAghkx61FRH1BREoHHWjMI64pZcCiL56SU' }}
             defaultCenter={{ lat: 31.5, lng: 74.35}}
             defaultZoom={5}
           >
           </GoogleMapReact> */}
          </div>
        );
    }
    else {
        return (
          <div style={{ height: '50vh', width: '100%' }}>
           <GoogleMapReact
             bootstrapURLKeys={{ key: 'AIzaSyAghkx61FRH1BREoHHWjMI64pZcCiL56SU' }}
             defaultCenter={{ lat: 31.5, lng: 74.35}}
             defaultZoom={2}
           > 
            {Object.values(temp2).map((value, index) => {
              return (
                <Marker lat={value[0]} lng={value[1]}>
                </Marker>
              );
            })}
           </GoogleMapReact>
          </div>
        );
    }
   };
   
   export default Map;


