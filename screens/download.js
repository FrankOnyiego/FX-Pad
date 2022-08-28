import {View,Text, ScrollView, StyleSheet, Button, Linking} from "react-native"
import React, { useEffect } from "react"

import axios from 'axios';
import { useState } from "react"

const baseUrlH1 = 'https://fxpesa.pie.co.ke/brokerlist.php';
 
export default function Download(){
    const[brokers, setBrokers]=useState([]);

    useEffect(()=>{
        axios({
            method: 'get',
            url: `${baseUrlH1}`,
          }).then((response) => {
            setBrokers(response.data);
          });
    },[])

     return (
              <View style={styles.container}>
                <Text style={{
                  fontWeight: 'bold'
                }} >UPDATE REQUIRED</Text>
                <Button title="Download"
                onPress={()=>{
                  Linking.openURL('https://play.google.com/store/apps/details?id=ke.co.pie');
                }}
                />
              </View>
    );
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4287f5'
  },

})

  