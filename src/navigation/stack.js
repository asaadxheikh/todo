import React from "react";
import { SafeAreaView, StatusBar, TouchableOpacity, View } from "react-native";
import color from "../themes/color";
import { createStackNavigator } from '@react-navigation/stack';
import  Task   from "../navigation"; 
import Add  from "../screens/task/addnewtask";  
 const Tab = createStackNavigator();

const App=()=>{
    return(
        <Tab.Navigator screenOptions={{
            headerShown:false,  
        }}>
        <Tab.Screen name="TaskN" component={Task}  
           />
   
        <Tab.Screen name="addnew" component={Add}
        
        />
      </Tab.Navigator>
    )
}


export default App