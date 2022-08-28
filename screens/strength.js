import {View,Text, Dimensions,ScrollView} from "react-native"
import React, { useEffect, useState } from "react"
import { BarChart } from "react-native-chart-kit";
import axios from 'axios';
const baseUrlH1 = 'https://fxpesa.pie.co.ke/strength/changeH1.php';
const baseUrlH4 = 'https://fxpesa.pie.co.ke/strength/changeH4.php';
const baseUrlD1 = 'https://fxpesa.pie.co.ke/strength/changeD1.php';
const baseUrlW1 = 'https://fxpesa.pie.co.ke/strength/changeW1.php';
export default function Strength({navigation}){
    const[Hour1, setH1]=useState([]);
    const[Hour4, setH4]=useState([]);
    const[Day1,setD1]=useState([]);
    const[Week1,setW1]=useState([]);
    const[label,setLabel]=useState([]);

    function apiload(){
      /*1 HOUR TIME FRAME*/
      axios({
        method: 'get',
        url: `${baseUrlH1}`,
      }).then((response) => {
        setH1(response.data);
      });
      
    /*4 HOUR TIME FRAME */
    axios({
        method: 'get',
        url: `${baseUrlH4}`,
      }).then((response) => {
        setH4(response.data);
      });

          /*4 HOUR TIME FRAME */
    axios({
        method: 'get',
        url: `${baseUrlD1}`,
      }).then((response) => {
        setD1(response.data);
      });

      /*WEEKLY TIMEFRAME*/  
      axios({
        method: 'get',
        url: `${baseUrlW1}`,
      }).then((response) => {
        setW1(response.data);
      });
    }

   useEffect(()=>{
        apiload();
        console.log("wow");
   }, [])

    useEffect(()=>{    
        setInterval(function(){                
          apiload();
          console.log("hello frank");
       }, 10000);//wait 10 seconds
   
    },[])

    const H1 = {
        labels: ["USD", "EUR", "GBP", "NZD", "CAD", "AUD","CHF","JPY"],
        datasets: [
          {
            data: Hour1
          }  
        ]
      }

      const H4 = {
        labels: ["USD", "EUR", "GBP", "NZD", "CAD", "AUD","CHF","JPY"],
        datasets: [
          {
            data: Hour4
          }  
        ]
      }

      const D1 = {
        labels: ["USD", "EUR", "GBP", "NZD", "CAD", "AUD","CHF","JPY"],
        datasets: [
          {
            data: Day1
          }  
        ]
      }

      const W1 = {
        labels: ["USD", "EUR", "GBP", "NZD", "CAD", "AUD","CHF","JPY"],
        datasets: [
          {
            data: Week1
          }  
        ]
      }

    const config = {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
      }

      const cstyle={
        marginVertical: 8,
        borderRadius: 16
      }

    return(
        <ScrollView>
            <View>
            <Text>1 HOUR</Text>
                    <BarChart
                        fromZero={false}
                        data={H1}
                        width={Dimensions.get("window").width}
                        height={220}
                        yAxisSuffix="%"
                        yAxisInterval={1}
                        chartConfig={config}
                        bezier
                        style={cstyle}
                    />
            </View>

            <View>
            <Text>4 HOUR</Text>
                    <BarChart
                        fromZero={false}
                        data={H4}
                        width={Dimensions.get("window").width}
                        height={220}
                        yAxisSuffix="%"
                        yAxisInterval={1}
                        chartConfig={config}
                        bezier
                        style={cstyle}
                    />
            </View>

            <View>
            <Text>DAILY</Text>
                    <BarChart
                        fromZero={false}
                        data={D1}
                        width={Dimensions.get("window").width}
                        height={220}
                        yAxisSuffix="%"
                        yAxisInterval={1}
                        chartConfig={config}  
                        bezier
                        style={cstyle}
                    />
            </View>

            <View>
            <Text>WEEKLY</Text>
                    <BarChart
                        fromZero={false}
                        data={W1}
                        width={Dimensions.get("window").width}
                        height={220}
                        yAxisSuffix="%"
                        yAxisInterval={1}
                        chartConfig={config}  
                        bezier 
                        style={cstyle}
                    />
            </View>
      </ScrollView>
        )
}