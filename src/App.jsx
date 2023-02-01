import Papa from 'papaparse';
import React, { useState, useEffect } from 'react';
import Map from './Map';
import SimpleMap from './SpreadMap';
import './App.css'

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [dataPred, setPredData] = useState([]);
  const [data2, setData2] = useState([]);
  const [dataPred2, setPredData2] = useState([]);
  const [files, setFiles] = useState("");
  const [message, setMessage] = useState("");
  const [files2, setFiles2] = useState("");
  var allData = {}
  var coords = {}
  var coords2 = {}

  // useEffect(() => {
  //   fetch("http://localhost:8000/message")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message));
  // }, []);

  function handleFile (file) {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        complete (results) {
          resolve(results.data)
        },
        error (err) {
          reject(err)
        }
      })
    })
  }

  function handleFile2 (file) {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        complete (results) {
          resolve(results.data)
        },
        error (err) {
          reject(err)
        }
      })
    })
  }

  const showData = () => {
    let header = "latitude,longitude,bright_ti4,scan,track,acq_date,acq_time,satellite,confidence,version,bright_ti5,frp,daynight";
    data.map((row, index) => (
      allData[index] = row[header]
    ))
    console.log(allData)
  }
  

  const setCoords = () => {
    let header = "latitude,longitude,bright_ti4,scan,track,acq_date,acq_time,satellite,confidence,version,bright_ti5,frp,daynight";
    data.map((row, index) => (
      coords[index] = row[header].split(",",2)
    ))
    const len = Object.keys(coords).length;
    for (let i = 0; i < len; i++){
      let num = Number(coords[i][0]);
      let num2 = Number(coords[i][1]);
      coords[i][0] = num 
      coords[i][1] = num2
    }
    delete coords[len-1] 
    setData2(coords)
  }

  const setCoords2 = () => {
    dataPred.map((row, index) => (
      coords2[index] = [row.latitude, row.longitude]
    ))
    const len = Object.keys(coords2).length;
    for (let i = 0; i < len; i++){
      let num = Number(coords2[i][0]);
      let num2 = Number(coords2[i][1]);
      coords2[i][0] = num 
      coords2[i][1] = num2
    }
    delete coords2[len-(len+1)] 
    setPredData2(coords2)
  }

  const myfunc = async (e) => {
    if (!e.target.files) return;
    else {
      let temp = await handleFile(e.target.files[0])
      setData(temp)
    }
  }

  const myfunc2 = async (e) => {
    if (!e.target.files) return;
    else {
      let temp = await handleFile2(e.target.files[0])
      setPredData(temp)
    }
  }

  function handleChange (e) {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      let obj = JSON.parse(e.target.result)
      setFiles(obj);
    };
  };

  const showPredData = () => {
    console.log("datapred2 here",dataPred2)
  }

  function showFiles () {
      let temp = files["features"][0]["geometry"]["coordinates"][0]
      setFiles2(temp)
  }

  const changeText = () => {
    document.getElementById('label-text').innerHTML = 'CSV File Uploaded';
  }

  const changeText2 = () => {
    document.getElementById('label-text2').innerHTML = 'GeoJSON File Uploaded';
  }

  const changeText3 = () => {
    document.getElementById('label-text3').innerHTML = 'CSV File Uploaded';
  }


  const oneFunc  = (e) => {
    myfunc(e);
    changeText();
  }

  const twoFunc  = (e) => {
    handleChange(e);
    changeText2();
  }

  const threeFunc  = (e) => {
    myfunc2(e);
    changeText3();
  }


  return (
    <div>
        <div className='header'>
            Welcome to Forest Fire Web App
        </div>
        <div className='row'>
          <div className='column'>
          <input type="file" id='files' className='hidden' style={{display:'none'}} onChange={oneFunc}/>
              <div className='input-file'>
                <label id='label-text' htmlFor="files">Upload your CSV File here</label>
              </div>
            <div className='button-div'>
              <button onClick={setCoords}>Load Markers on Map</button>
            </div>
            <div className='map-div'>
              <Map locations={data2}/>
            </div>
          </div>
          <div className='column'>
          <input type="file" id='files2' className='hidden' style={{display:'none'}} onChange={twoFunc} />
            <div className='input-file'>
              <label id='label-text2' htmlFor="files2">Upload your GeoJSON File here</label>
            </div>
            <div className='button-div'>
              <button onClick={showFiles}>Load Spread On Map</button>
            </div>
            <div className='map-div'>
              <SimpleMap locations={files2}/>
            </div>
          </div>
          {/* <div className='column'>
          <input type="file" id='files3' className='hidden' style={{display:'none'}} onChange={threeFunc}/>
              <div className='input-file'>
                <label id='label-text3' htmlFor="files3">Upload your CSV File here</label>
              </div>
            <div className='button-div'>
              <button onClick={setCoords2}>Load Predictions on Map</button>
              <button onClick={showPredData}>Show Pred Data</button>
            </div>
            <div className='map-div'>
               <Map locations={dataPred2}/> 
            </div>
          </div> */}
        </div>
    </div>
  );
};

export default MyComponent;
