/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import 'react-native-gesture-handler';
import React,{useEffect,useState} from 'react';  

import { NavigationContainer } from '@react-navigation/native'; 
import Login from './src/screens/login'
import Home from './src/navigation/stack'
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const App= () => {
 
  const [token,setToken]=useState(null)

  useEffect(
    ()=>{
   const fetchToken=async ()=>{
       try {
        const value = await AsyncStorage.getItem('token')
        if(value !== null) {
          setToken(value)
        }
      } catch(e) {
        // error reading value
      }

    }

    fetchToken()
    },[]
  )
  
  const onTokenAdded=(tok)=>{
    setToken(tok)
  }
 
  return (
    <NavigationContainer>
    {
      token?
      <Home/>
      :
      <Login  onTokenAdded={onTokenAdded}/>
    }
     
    </NavigationContainer>
  );
};

 

export default App;
