import React,{useState} from "react";
import { View, SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity } from "react-native";
import color from "../../themes/color";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Api from '../../api';


var moment = require('moment');

import DatePicker from 'react-native-date-picker' 
const axios = require('axios');

const App = ({navigation}) => {

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
        const [err,setErr]=useState('')

        const [data, setData] = useState({
            summary:"",
            description:"",
        })
    


     
    const saveTask=async()=>{
        if(data.summary==''){
            setErr('Summary cannot be empty')
            return
        }
        if(data.description==''){
            setErr('description cannot be empty')
            return
        }
        setErr('')
        await axios.post(Api.url+'tasks',
        {
            title:data.summary,
            status:data.description,
            date:date
        }
        )
        .then(
            (res) => {
               setData( {
                    summary:"",
                    description:"",
                }
               )
               navigation.goBack()
            }
        )
        .catch(
            (error) => console.log(error)
        )
    }

    return (

        <SafeAreaView>
            <StatusBar barStyle={'dark-content'} />
            <View style={{
                width: '100%',
                height: '100%'
            }}>

                <View style={{
                    width: '100%',
                    paddingHorizontal: '8%',
                    paddingVertical: 20,
                    marginTop: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>

                    <Text style={{
                        color: color.dark,
                        fontSize: 16,
                        fontWeight: '400',
                        width: 70
                    }}
                    
                    onPress={()=>navigation.goBack()}>
                        Back
                    </Text>
                    <Text style={{
                        color: color.dark,
                        fontSize: 34,
                        fontWeight: '500'
                    }}>
                        New Task
                    </Text>

                    <View style={{
                        width: 70
                    }} />

                </View>


                <View style={{
                    width: '100%',
                    paddingHorizontal: '8%',
                    marginTop: 20,
                    alignItems:'center'
                }}>

                    {
                        err!=''?
                        <Text style={{
                            color:'red'
                        }}>
                            {err}
                        </Text>
                        :
                        <View/>
                    }

                    <View style={{
                        flexDirection: 'row',
                        paddingHorizontal: 10,
                        height:50,
                        alignItems:'center'
                    }}>
                        <Ionicons
                            name="ios-chatbubble-ellipses-outline"
                            size={22}
                            color={color.dark}

                        />
                        <TextInput
                            placeholder="Summary"
                            style={{
                                width: '90%', 
                                paddingHorizontal:18, 
                                fontSize:18
                            }}
                            placeholderTextColor='#999'
                            value={data.summary}
                            onChangeText={
                                (e)=>{
                                    setData({...data,summary:e})
                                }
                            }
                        />

                    </View>


                    <View style={{
                        width:'100%',
                        height:0.8,
                        backgroundColor:'#999',
                        marginTop:20
                    }}>

                    </View>


                    <View style={{
                        flexDirection: 'row',
                        paddingHorizontal: 10,
                        height:150,
                        alignItems:'flex-start',
                        marginTop:20
                    }}>
                        <Feather
                            name="align-right"
                            size={22}
                            color={color.dark}
                            style={{
                                marginTop:4
                            }}

                        />
                        <TextInput
                            placeholder="Description"
                            style={{
                                width: '90%', 
                                paddingHorizontal:18, 
                                fontSize:18
                            }}
                            placeholderTextColor='#999'
                            multiline
                            value={data.description}
                            onChangeText={
                                (e)=>{
                                    setData({...data,description:e})
                                }
                            }
                        />

                    </View>
                    <View style={{
                        width:'100%',
                        height:0.8,
                        backgroundColor:'#999',
                        marginTop:20
                    }}>

                    </View>
                    <View style={{
                        flexDirection: 'row',
                        paddingHorizontal: 10,
                        height:50,
                        alignItems:'flex-start',
                        marginTop:20
                    }}>
                        <MaterialIcons
                            name="access-time"
                            size={22}
                            color={color.dark}
                            style={{
                                marginTop:0
                            }}

                        />
                        <TextInput
                            placeholder="Due date"
                            style={{
                                width: '90%', 
                                paddingHorizontal:18, 
                                fontSize:18
                            }}
                            placeholderTextColor='#999' 
                            onPressIn={()=>setOpen(true)}
                            value={moment(date).format('DD-MM-yy hh:mm a')}
                            />
                                 <DatePicker
                                        modal
                                        open={open}
                                        date={date}
                                        onConfirm={(date) => {
                                        setOpen(false)
                                        setDate(date)
                                        }}
                                        onCancel={() => {
                                        setOpen(false)
                                        }}
                                    />
                            {/* </TouchableOpacity> */}

                    </View>
                    <View style={{
                        width:'100%',
                        height:0.8,
                        backgroundColor:'#999',
                        marginTop:0
                    }}>

                    </View>
                    <TouchableOpacity
                        style={{
                            width:'90%',
                            height:50,
                            borderRadius:40,
                            backgroundColor:color.dark,
                            marginTop:40,
                            justifyContent:'center',
                            alignItems:'center'
                        }}
                       onPress={
                        ()=>{
                            saveTask()
                        }
                       }
                    >
                        
                    <Text style={{
                        fontSize:16,
                        fontWeight:'400',
                        color:color.background
                    }}>
                        Save
                    </Text>
                    </TouchableOpacity>


                </View>



            </View>

        </SafeAreaView>
    )
}

export default App