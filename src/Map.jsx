/* eslint-disable*/
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import React, { useState } from "react";

  const Map2 = (locations) => {
    const [selectedElement, setSelectedElement] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null);
    const [showInfoWindow, setInfoWindowFlag] = useState(true);
    console.log(locations)
    var temp = locations["locations"][0]
    var temp2 = locations["locations"]
    if (temp === undefined) {
        return (
          <div style={{ height: '50vh', width: '100%' }}>
          </div>
        );
    }
    else {
        return (
          <div>
            <Map style={{ height: '50%', width: '50%' }}
              google={google}
              initialCenter={{
                lat: 31.5,
                lng: 74.35
              }}
              zoom={5}
            >
              {Object.values(temp2).map((value, index) => {
                if (((value[0] > 34.05) || (value[0] < 23.35)) || ((value[1] > 74.5) || (value[1] < 60.5))) {
                  let x=1
                }
                else {
                  let url = "http://maps.google.com/mapfiles/ms/icons/";
                  url += "red" + "-dot.png";
                  return (
                    <Marker
                      key={index}
                      position={{
                        lat: value[0],
                        lng: value[1]
                      }}
                      icon={{
                        url:url,
                        scaledSize: new google.maps.Size(20, 20)
                      }}
                      onClick={(props, marker) => {
                        setSelectedElement(value);
                        setActiveMarker(marker);
                      }}
                    />
                  );
                }
              })}
              {selectedElement ? (
                <InfoWindow
                  visible={showInfoWindow}
                  marker={activeMarker}
                  onCloseClick={() => {
                    setSelectedElement(null);
                  }}
                >
                  <div>
                    <p>Latitude: {selectedElement[0]}</p>
                    <p>Longitude: {selectedElement[1]}</p>
                    <p>Bright_Ti4: {selectedElement[2]}</p>
                    <p>Scan: {selectedElement[3]}</p>
                    <p>Track: {selectedElement[4]}</p>
                    <p>Acquired Date: {selectedElement[5]}</p>
                    <p>Acquired Time: {selectedElement[6]}</p>
                    <p>Satellite: {selectedElement[7]}</p>
                    <p>Confidence: {selectedElement[8]}</p>
                    <p>Version: {selectedElement[9]}</p>
                    <p>Bright_Ti5: {selectedElement[10]}</p>
                    <p>FRP: {selectedElement[11]}</p>
                    <p>Daynight: {selectedElement[12]}</p>
                  </div>
                </InfoWindow>
              ) : null}
            </Map>
          </div>
        );
    }
   };
   
export default GoogleApiWrapper({
    apiKey: "AIzaSyAghkx61FRH1BREoHHWjMI64pZcCiL56SU",
})(Map2);


