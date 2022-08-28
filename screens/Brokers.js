import {View,Text, ScrollView, StyleSheet, Button} from "react-native"
import React, { useEffect } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import { useState } from "react"

const baseUrlH1 = 'https://fxpesa.pie.co.ke/brokerlist.php';
 
export default function Brokers({navigation}){
    const[brokers, setBrokers]=useState([]);
   
    const load = ()=>{
      let data = AsyncStorage.getItem("storedBrokers").then(value=>{
        value=JSON.parse(value);
        setBrokers(value);
      });
    }
    load();

     return (
      <ScrollView style={{
        backgroundColor: 'white'
      }}>
              <View style={styles.container}>
                        {brokers.map(broker => (
                            <View
                            style={{
                                padding: 5,
                                marginBottom: 5
                            }}
                            >
                                    <Text
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: 20,
                                    }}
                                    >{broker['broker']}</Text>


                                    <Text>{broker['spread']}</Text>
                                    <Text>{broker['payment']}</Text>
                                    <Text>{broker['min']}</Text>
                                    <Button  onPress={() => Linking.openURL(broker['affiliate_link'])} title='REGISTER' /> 
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
      backgroundColor: 'white',
      flexDirection: 'column'
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
    },
  });
  