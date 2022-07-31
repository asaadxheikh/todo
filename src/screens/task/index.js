import React, { useEffect, useState } from "react";
import {Animated, StatusBar, View, Text, SafeAreaView, FlatList, Image, TouchableOpacity,Platform } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import color from "../../themes/color";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
var moment = require('moment');
const axios = require('axios');
import Api from '../../api';

import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useIsFocused } from "@react-navigation/native";
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const App = ({ navigation }) => {


    const [complete, setCompleteData] = useState([])
    const [incomplete, setInCompleteData] = useState([])
    const [reload, setReload] = useState(false)
    
  const [permissions, setPermissions] = useState({});
    const isFocused = useIsFocused();

    useEffect(
        () => {

            const fetchTasks = async () => {
                if(Platform.OS=='ios')
                PushNotificationIOS.requestPermissions();
               
                
                await axios.get(Api.url+'tasks')
                    .then(
                        (res) => {
                            setInCompleteData(res.data.filter(obj => obj.status == 'incomplete'))
                            setCompleteData(res.data.filter(obj => obj.status == 'complete'))
                            

                            res.data.filter(obj => obj.status == 'incomplete').forEach(element => {
                if(Platform.OS=='ios')
                             { 
                                PushNotificationIOS.addNotificationRequest({
                                    title:element.title,
                                    subtitle:"lets do this!", 
                                    id:element.title,
                                    fireDate:element.date
                                    
                                });
                            }
                            });
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

    
const delete_item=async (item)=>{
    await axios.delete(Api.url+'tasks/'+item._id)
    .then(
        (res) => { 
            setReload(!reload)
             }
    )
    .catch(
        (error) => console.log(error)
    )
}

const complete_task=async(item)=>{
    await axios.put(Api.url+'tasks/'+item._id)
    .then(
        (res) => { 
            setReload(!reload)
             }
    )
    .catch(
        (error) => console.log(error)
    )
}

 const    renderLeftActions = (progress, dragX,item) => {
    const trans = dragX.interpolate({
      inputRange: [0,30,70,71],
      outputRange: [ 0, 0, 0,20],
    });
    return (
      <RectButton style={{
        alignItems:'flex-end', 
      }}
      onPress={
        ()=>delete_item(item)
      }
      >
        <Animated.View
         style={[
            {
               width:60,
               height:50,
               backgroundColor:'red',
               justifyContent:'center',
               alignItems:'center'
            },

            {
              transform: [{ translateX: trans }],
            },
          ]}
          
          >
             
        <EvilIcons
        name="trash"
        size={30}
        color={color.background}

        />

        </Animated.View>
      </RectButton>
    );
  };

    return (
        <SafeAreaView>
            <StatusBar barStyle={'dark-content'} />
            <View style={{
                width: '100%',
                height: '100%',
                backgroundColor:color.background
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
                                        Task
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
                                            onPress={
                                                () => {
                                                    navigation.navigate('add')
                                                }
                                            }
                                        >
                                            <AntDesign
                                                name="plus"
                                                size={20}
                                                color={color.dark}
                                            />
                                            <Text style={{
                                                fontSize: 18,
                                                fontWeight: '500',
                                                paddingHorizontal: 10
                                            }}>
                                                Add new task
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
                                                Incomplete
                                            </Text>

                                        </View>


                                    </View>
                                </View>
                            )
                        }
                    }
                    data={incomplete}
                    ItemSeparatorComponent={
                        () => {
                            return (
                                <View
                                    style={{
                                        height: 10,
                                    }}

                                />
                            )
                        }
                    }
                    renderItem={
                        ({ item }) => {
                            return (
                                <Swipeable
                                
                                
                                renderRightActions={(progress,dragX)=>renderLeftActions(progress,dragX,item)}>
                          
                               
                                <View style={{
                                    width: '100%',
                                    paddingHorizontal: '8%',
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    paddingVertical: 10,
                                    minHeight: 50,
                                    backgroundColor:color.background
                                }}>
         

                                    <TouchableOpacity style={{
                                        height: 20,
                                        width: 20,
                                        borderRadius: 5,
                                        backgroundColor: '#eee',
                                        borderColor: '#888',
                                        borderWidth: 1.7
                                    }}
                                    onPress={
                                        ()=>{
                                            complete_task(item)
                                        }
                                    }
                                    >
                                    </TouchableOpacity>


                                    <View style={{
                                        width: '90%',
                                        height: '100%',
                                        paddingHorizontal: 10
                                    }}>

                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: '400',
                                            color: color.dark
                                        }}>
                                            {item.title}
                                        </Text>

                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: 2
                                        }}>
                                            <Image
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                }}
                                                source={require('../../assets/icon/alarm.png')}

                                            />
                                            <Text style={{
                                                fontSize: 14,
                                                fontWeight: '400',
                                                color: '#888',
                                            }}>


                                                {moment(item.date).format('DD-MM-yy hh:mm a')}
                                            </Text>
                                        </View>
                                    </View>

 
                                </View> 
                                </Swipeable>
                            )
                        }
                    }
                    ListFooterComponent={
                        () => {
                            return (
                                <FlatList


                                    ListHeaderComponent={
                                        () => {
                                            return (
                                                <View style={{
                                                    flexDirection: 'row',
                                                    marginTop: 30,
                                                    marginBottom: 8,
                                                    paddingHorizontal: '8%'
                                                }}>

                                                    <Text style={{
                                                        fontSize: 16,
                                                        fontWeight: '500',

                                                    }}>
                                                        Complete
                                                    </Text>

                                                </View>
                                            )
                                        }
                                    }
                                    data={complete}
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
                                        ({ item }) => {
                                            return (
                                                <View style={{
                                                    width: '100%',
                                                    paddingHorizontal: '8%',
                                                    flexDirection: 'row',
                                                    alignItems: 'flex-start',
                                                    paddingVertical: 10,
                                                    minHeight: 40
                                                }}>


                                                    <View style={{
                                                        height: 20,
                                                        width: 20,
                                                        borderRadius: 5,
                                                        backgroundColor: '#eee',
                                                        borderColor: '#888',
                                                        borderWidth: 1.7,
                                                        justifyContent: 'center',
                                                        alignItems: 'center'

                                                    }}>
                                                        <Entypo
                                                            name="check"
                                                            size={12}
                                                            color={color.dark}
                                                        />

                                                    </View>


                                                    <View style={{
                                                        width: '90%',
                                                        height: '100%',
                                                        paddingHorizontal: 10
                                                    }}>

                                                        <Text style={{
                                                            fontSize: 16,
                                                            fontWeight: '400',
                                                            color: '#888'
                                                        }}>
                                                            {item.title}
                                                        </Text>


                                                    </View>


                                                </View>
                                            )
                                        }
                                    }


                                />
                            )
                        }
                    }

                />


            </View>
        </SafeAreaView>
    )
}

export default App