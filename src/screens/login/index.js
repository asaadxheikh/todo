import React, { useState } from "react";
import { SafeAreaView, StatusBar, View,Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import color from "../../themes/color";

import AsyncStorage from '@react-native-async-storage/async-storage';
const App=({onTokenAdded})=>{

    const [data,setData]=useState(
     {   email:'',
        password:''
    })
    const [error,setError]=useState(false)
    const [show,setShow]=useState(false)
    const [msg,setMsg]=useState('')

    const Login=async ()=>{
      if(!String(data.email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )){
        setError(true)
        setMsg('invalid email')
        return
    }
    
    if(data.password<8){
        setError(true)
        setMsg('password must be 8 character long')
        return
    }
    setError(false)
    setMsg('')

    try {
        await AsyncStorage.setItem('token', data.email)
        onTokenAdded(data.email)
        console.log('added');
      } catch (e) {
        console.log(e);
      }

    }



    return(
       <SafeAreaView style={{backgroundColor:color.background}}> 
       <StatusBar barStyle={'dark-content'} />
        <View style={{
            width:'100%',
            height:'100%',
            backgroundColor:color.background,
            paddingHorizontal:'8%',
            paddingVertical:40
        }}>

            <View style={{
                width:'100%',
                alignItems:'center'
            }}>
                <Text style={{
                    fontSize:28,
                    fontWeight:'600'
                }}>
                    Log In
                </Text>

                <TextInput

                style={{
                    width:'100%',
                    height:50,
                    borderRadius:8,
                    backgroundColor:color.input,
                    marginTop:60,
                    paddingHorizontal:20,
                    borderColor:color.inputBorder,
                    borderWidth:1
                }}
                placeholder='Email'
                placeholderTextColor='#BDBDBD'
                value={data.email}
                onChangeText={
                    (e)=>{
                        setData({...data,email:e})
                    }
                }


                    />


                <View   style={{
                    width:'100%',
                    height:50,
                    borderRadius:8,
                    backgroundColor:color.input,
                    marginTop:20,
                    paddingHorizontal:20,
                    borderColor:color.inputBorder,
                    borderWidth:1,
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between'
                }}>

                <TextInput

                style={{
                    width:'88%',
                    height:50, 
                   
                }}
                placeholder='Password'
                placeholderTextColor='#BDBDBD'
                value={data.password}
                onChangeText={
                    (e)=>{
                        setData({...data,password:e})
                    }
                }
                secureTextEntry={!show}

                    />

                    <Text style={{
                        fontSize:16,
                        fontWeight:'400'
                    }}
                    onPress={()=>setShow(!show)}
                    >
                      {show?'hide':'show'}  
                    </Text>
                </View>
{           error?
                <Text style={{
                        fontSize:16,
                        fontWeight:'400',
                        color:"red",
                        marginTop:20
                    }}>
                        {msg}
                    </Text>
                :
                <View/>    
                }

                    <TouchableOpacity
                        style={{
                            width:'90%',
                            height:50,
                            borderRadius:40,
                            backgroundColor:color.dark,
                            marginTop:error?80:100,
                            justifyContent:'center',
                            alignItems:'center'
                        }}
                        onPress={()=>Login()}
                    >
                        
                    <Text style={{
                        fontSize:16,
                        fontWeight:'400',
                        color:color.background
                    }}>
                        Log In
                    </Text>
                    </TouchableOpacity>
                    <Text style={{
                        fontSize:16,
                        fontWeight:'500',
                        marginTop:10
                        
                    }}>
                        Forgot you Password?
                    </Text>

            </View>

        </View>




       </SafeAreaView>
    )
}


export default App