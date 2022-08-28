import React, { useEffect} from "react"
import { StyleSheet, Text, View, Vibration,  AppState} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Tabs from './components/Tab';
import Download from './screens/download';

import axios from 'axios';
import { useState } from "react" 

const baseUrlH1 = 'https://fxpesa.pie.co.ke/version/';
const baseUrlBroker = 'https://fxpesa.pie.co.ke/brokerlist.php';
const baseUrlNews = 'https://fxpesa.pie.co.ke/newsapi/index.php';
const baseUrlStrength = 'https://fxpesa.pie.co.ke/newsapi/index.php';
const baseUrlH = 'https://fxpesa.pie.co.ke/strength/changeH1.php';
const baseUrlH4 = 'https://fxpesa.pie.co.ke/strength/changeH4.php';
const baseUrlD1 = 'https://fxpesa.pie.co.ke/strength/changeD1.php';
const baseUrlW1 = 'https://fxpesa.pie.co.ke/strength/changeW1.php';
const current_version = 7;

export default function App() {
  const[version, setVersion]=useState(7);

  const[brokers,setBroker] = useState([]);
  const[news, setNews]=useState([]);

  const save = (key,value)=>{
    try{
      useEffect(()=>{
        //Vibration.vibrate(10 * ONE_SECOND_IN_MS);
        //FETCH BROKER'S DATA
        axios({
            method: 'get',
            url: `${baseUrlBroker}`,
          }).then((response) => {
            AsyncStorage.setItem("storedBrokers", JSON.stringify(response.data));
            setBroker(response);
          });
          //FETCH NEWS DATA
          function news(){
            axios({
              method: 'get',
              url: `${baseUrlNews}`,
            }).then((response) => {
              AsyncStorage.setItem("storedNews", JSON.stringify(response.data));
              console.log("First time");
            });
          }

          //APP STATE CHANGE
          AppState.addEventListener("change",()=>{
            news();
          })
          //RUNS FO THE FIRST TIME ONLY
          news();
          //RUNS EVERY 50 SECONDS
          setInterval(()=>{
            news();
          },50000)

                    axios({
            method: 'get',
            url: `${baseUrlH1}`,
          }).then((response) => {
            console.log(response.data);
            setVersion(response.data);
          });
          //FETCH STRENGTH DATA
          //1 HOUR TIMEFRAME
          axios({
            method: 'get',
            url: `${baseUrlH}`,
          }).then((response) => {
            AsyncStorage.setItem("H1", JSON.stringify(response.data));
          });
          //4 HOUR TIMEFRAM
          axios({
            method: 'get',
            url: `${baseUrlH4}`,
          }).then((response) => {
            AsyncStorage.setItem("H4", JSON.stringify(response.data));
          });
          //DAILY TIMEFRAME
          axios({
            method: 'get',
            url: `${baseUrlD1}`,
          }).then((response) => {
            AsyncStorage.setItem("D1", JSON.stringify(response.data));
          });
          //WEEKLY TIMEFRAME
          axios({
            method: 'get',
            url: `${baseUrlW1}`,
          }).then((response) => {
            AsyncStorage.setItem("W1", JSON.stringify(response.data));
          });

    },[])
    }catch (err){
      console.log(err);
    }
  }
  save();

    if(current_version == version){
      console.log("version match");
      return(
        <Tabs />
      ) 
    }
    else{
      console.log("version mismatch - updates required");
      return (
        <Download />
      )

    }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
