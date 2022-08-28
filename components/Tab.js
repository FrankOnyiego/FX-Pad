import {View, Text, Button, video} from "react-native"
import React from "react"
import { Video, AVPlaybackStatus } from 'expo-av';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from "moment";

import Brokers from "../screens/Brokers";
import News from "../screens/news";
import Strength from "../screens/strength";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  AdMobBanner
} from 'expo-ads-admob';
const Tab = createBottomTabNavigator();

export default function Tabs() {
  const greet="Hello"
  return (
    <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Strength Meter" component={Strength} 
                options={{
                    tabBarIcon: ({ tintColor }) => (
                        <Icon name="steam" size={30} color="#900" />
                      )
                }}
                />
                <Tab.Screen name="Forex News" component={News} 
                                options={{
                                    tabBarIcon: ({ tintColor }) => (
                                        <Icon name="calendar" size={30} color="#900" />
                                      ),
                                      headerRight: ()=>{
                                        return(
                                          <Text
                                          style={{
                                            fontWeight: 'bold'
                                          }}
                                          >Today: {moment().format('YYYY-MM-DD')}</Text>
                                        )
                                      }
                                }}
                />
                <Tab.Screen name="Forex Brokers" component={Brokers} 
                                options={{
                                    tabBarIcon: ({ tintColor }) => (
                                        <Icon name="link" size={30} color="#900" />
                                      )
                                }}
                />
            </Tab.Navigator>
            <AdMobBanner
                bannerSize="fullBanner"
                adUnitID="ca-app-pub-4266400232196448/4132650032" // Test ID, Replace with your-admob-unit-id
                servePersonalizedAds={true}
              />
    </NavigationContainer>
  );
}