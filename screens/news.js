import {View,Text, ScrollView, StyleSheet, Image,  AppState} from "react-native"
import React, { useEffect, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function News({navigation}){
    const[news, setNews] = useState([]);
    const load = ()=>{
      AsyncStorage.getItem("storedNews").then(value=>{
        value=JSON.parse(value);
        setNews(value);
      });
    }

    useEffect(()=>{
      AppState.addEventListener("change",()=>{
        load();
        console.log("change"); 
      })
    })

    useEffect(()=>{
      load();
      console.log("loaded");
    },[])

    useEffect(()=>{
      setInterval(()=>{
        load();
        console.log("1 minute elapsed");
      },60000)
    })

    let flag;

      return (
        <ScrollView style={{
          backgroundColor: 'white'
        }}>
                <View style={styles.container}>
                    <Text style={{
                        marginLeft: 5,
                        fontWeight: 'bold',
                        color: 'red'
                    }}>HIGH IMPACT NEWS THIS WEEK</Text>
                    
                {news.map(news => (
                    flag=news["economy"],

                       <View style={{
                        marginBottom: 7,
                        borderBottomWidth: 2,  
                        padding: 5, 
                       }}>
                                <View
                                style={{
                                  flexDirection: 'row',
                                  
                                }}
                                >
                                    <Text >{news['name']} 
                                    <Text>  </Text>
                                    <Image
                                    style={{
                                        height: 15,
                                        width:20,
                                    }} 
                                    source={{
                                    uri: `https://fxpesa.pie.co.ke/flags/${flag}.png`, 
                                    }}
                                />
                               
                                </Text> 
                                
                                </View>  
                                <Text style={{
                                  color: 'green',
                                  fontWeight: 'bold'
                                }}>{news['data']}</Text> 
                                <View>                                                     
                                                                           
                                        <View style={{
                                          flexDirection: 'row',
                                          backgroundColor: 'yellow',
                                          padding: 5,
                                        }}>
                                            <Text style={{
                                            color: 'black',
                                            width: '50%',
                                            }}>
                                              {news['impact']}
                                            </Text>
  
                                            <Text style={{
                                               color: 'red',
                                               width: '50%',
                                             }}> {news['economy']}
                                             </Text>
                                        </View>
  
                                        <Text
                                        style={{
                                          width: '100%'
                                        }}
                                        >Actual: {news['actual']}%</Text>
  
                                        <View
                                        style={{
                                          flexDirection: 'row',
                                        
                                        }}
                                        >
                                            <Text style={{
                                              width: '50%'
                                            }}>Forecast: {news['forecast']}%</Text>
                                            <Text
                                            style={{
                                              marginRight: 0,
                                              width: '50%'
                                            }}
                                            >Previous: {news['previous']}%</Text>
                                        </View>
                                </View>
                    </View>
                ))}
                </View>

        </ScrollView>
      );

} 

const styles = StyleSheet.create({
    container: {
      margin: 3,
      padding: 2,
      backgroundColor: 'white'
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
    },
  });
  