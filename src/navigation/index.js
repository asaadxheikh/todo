import React from "react";
import { SafeAreaView, StatusBar, TouchableOpacity, View } from "react-native";
import color from "../themes/color";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  Task   from "../screens/task";
import LocationS  from "../screens/location";
import Add  from "../screens/task/addnewtask";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
 const Tab = createBottomTabNavigator();

const App=({navigation})=>{
    return(
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor:color.dark, 
            headerShown:false, 
            inactiveTintColor: '#7FC0C4',
            tabBarStyle:{
                height:83
            }
        }}>
        <Tab.Screen name="Task" component={Task}  
        options={{
            tabBarIcon:({color}) => {
            return(<MaterialCommunityIcons name='clipboard-text-outline' size={22} color={color}  />
            )
        },
    }}  />
  
   <Tab.Screen name="add" component={Add}
        options={{
             
            
        

        tabBarButton:props=>{
            return <TouchableOpacity style={{
                height:50, 
                width:50,
                backgroundColor:color.dark,
                borderRadius:30,
                marginTop:6,
                justifyContent:'center',
                alignItems:'center'
            }}
           onPress={()=>navigation.navigate('addnew')}
            >
                <AntDesign name='plus' size={28}  color={color.background} />
          

            </TouchableOpacity>
        }
    }
    }
        />


        <Tab.Screen name="Location" component={LocationS}
        options={{
            tabBarIcon:({color}) => {
            return(<Ionicons name='ios-location-outline' size={22}  color={color}  />
            )
        }}
    }
        />
      </Tab.Navigator>
    )
}


export default App