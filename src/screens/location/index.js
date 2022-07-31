import React,{useState,useEffect} from "react";
import { StatusBar, View, Text, SafeAreaView, FlatList, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import color from "../../themes/color";
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
const axios = require('axios');
import GetLocation from 'react-native-get-location'
import Api from '../../api';

import { useIsFocused } from "@react-navigation/native";
const access_token='pk.eyJ1IjoiYXNhYWRzaGVpa2giLCJhIjoiY2w1NTRneWVhMTFlbDNibjVmNXhuZXRzeiJ9.mLk4MkdGUubg4NyRCoemZw'
const App = () => {

    const [reload, setReload] = useState(false)
    const [pre_loca, setPreLoc] = useState([])
    const [current, setCurrent] = useState({
        title:'',
        points:[0,0]
    })
    
    const isFocused = useIsFocused();

    useEffect(
        () => {

            const fetchTasks = async () => {
                await axios.get(Api.url+'location')
                    .then(
                        (res) => {
                           setPreLoc(res.data)
                           setCurrent({
                            title:res.data[0].location_name,
                            points:res.data[0].points
                           })
                        }
                    )
                    .catch(
                        (error) => console.log(error)
                    )
            }

            fetchTasks()

        }
        , [reload,isFocused]
    )


   const getCurrentLocation=async ()=>{
    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
    })
    .then(async location => {
        await axios.get(
            'https://api.mapbox.com/geocoding/v5/mapbox.places/'+location.longitude+','+location.latitude+'.json?access_token='+access_token
        )
        .then(
          async  (res)=>{
                let reverse=res.data.features[0]?.context 
         
                await axios.post(Api.url+'location',
                {
                    location_name:reverse[reverse.length-3].text+', ' +reverse[reverse.length-1].text, 
                    points:[location.longitude, location.latitude]
                })
                .then(
                    (res) => {
                        setReload(!reload)
                    }
                )
                .catch(
                    (error) => console.log(error)
                )
            }
        )
    })
    .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
    })

   

    }
 

    return (
        <SafeAreaView>
            <StatusBar barStyle={'dark-content'} />
            <View style={{
                width: '100%',
                height: '100%'
            }}>
 
                <FlatList

                    ListHeaderComponent={
                        () => {
                            return (
                                <View style={{
                                    width: '100%',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        fontSize: 30,
                                        fontWeight: '500',
                                        marginTop: 30
                                    }}>
                                        Location
                                    </Text>

                                    <View style={{
                                        width: '100%',
                                        paddingHorizontal: '8%',
                                        marginTop: 30

                                    }}>

                                        <TouchableOpacity style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}
                                        onPress={()=>getCurrentLocation()}
                                        >
                                            <AntDesign
                                                name="plus"
                                                size={20}
                                                color={color.dark}
                                            />
                                            <Text style={{
                                                fontSize: 18,
                                                fontWeight: '500',
                                                paddingHorizontal: 8
                                            }}>
                                                Check in
                                            </Text>

                                        </TouchableOpacity>

                                        <View style={{
                                            flexDirection: 'row',
                                            marginTop: 30,
                                            marginBottom: 8
                                        }}>

                                            <Text style={{
                                                fontSize: 16,
                                                fontWeight: '500',

                                            }}>
                                                Current location
                                            </Text>

                                        </View>

                                        <View style={{
                                    width: '100%', 
                                    flexDirection: 'row',
                                    alignItems:'flex-start',
                                    paddingVertical: 10,
                                    minHeight: 50, 
                                }}>


                                    <Image
                                        style={{
                                            width: 16,
                                            height: 16, 
                                            marginTop:6
                                        }}
                                        source={require('../../assets/icon/pin.png')}

                                    />
                                    <View style={{
                                        width: '90%',
                                        height: '100%',
                                        paddingHorizontal: 10,
                                    }}>

                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: '400',
                                            color: color.dark
                                        }}>
                                           {current.title}
                                        </Text>


                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: '400',
                                            color: '#888',
                                            marginTop:4
                                        }}>


                                           {current.points[0]}° N, {current.points[1]}° E
                                        </Text>
                                    </View>


                                </View>
                                <View style={{
                                            flexDirection: 'row',
                                            marginTop: 30,
                                            marginBottom: 8
                                        }}>

                                            <Text style={{
                                                fontSize: 16,
                                                fontWeight: '500',

                                            }}>
                                                Previous location
                                            </Text>

                                        </View>

                                    </View>
                                </View>
                            )
                        }
                    }
                    data={pre_loca}
                    ItemSeparatorComponent={
                        () => {
                            return (
                                <View
                                    style={{
                                        height: 0,
                                    }}

                                />
                            )
                        }
                    }
                    renderItem={
                        ({item}) => {
                            return (
                                <View style={{
                                    width: '100%',
                                    paddingHorizontal: '8%',
                                    flexDirection: 'row',
                                    alignItems:'flex-start',
                                    paddingVertical: 10,
                                    minHeight: 50, 
                                }}>


                                    <Image
                                        style={{
                                            width: 16,
                                            height: 16, 
                                            marginTop:6
                                        }}
                                        source={require('../../assets/icon/pin.png')}

                                    />
                                    <View style={{
                                        width: '90%',
                                        height: '100%',
                                        paddingHorizontal: 10,
                                    }}>

                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: '400',
                                            color: color.dark
                                        }}>
                                          {item.location_name}
                                        </Text>


                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: '400',
                                            color: '#888',
                                            marginTop:4
                                        }}>


                                           {item.points[0]}° N, {item.points[1]}° E
                                        </Text>
                                    </View>


                                </View>
                            )
                        }
                    }


                />


            </View>
        </SafeAreaView>
    )
}

export default App