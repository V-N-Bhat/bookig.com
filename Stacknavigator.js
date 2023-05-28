import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import SavedScreen from './screens/SavedScreen';
import BookingScreen from './screens/BookingScreen';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from './screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { SearchBar } from 'react-native-screens';
import SearchScreen from './screens/SearchScreen';
import PlaceScreen from './screens/PlaceScreen';
import MapScreen from './screens/MapScreen';
import ProperyInfo from './screens/ProperyInfo';
import RoomsScreen from './screens/RoomsScreen';
import UserSceen from './screens/UserSceen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import LoginScree from './screens/LoginScree';
import RegisterScreen from './screens/RegisterScreen';
const Stacknavigator = () => {
    
const Tab = createBottomTabNavigator();
const Stack=createNativeStackNavigator();
    function  Bottomtabs(){
        return (
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} options={{tabBarLabel:"Home",headerShown:false,tabBarIcon:({focused})=>focused?(
                    <Entypo name="home" size={24} color="#003580" />
                ):(
                    <AntDesign name="home" size={24} color="black" />
                )}} />
                <Tab.Screen name="Saved" component={SavedScreen} options={{tabBarLabel:"Saved",headerShown:false,tabBarIcon:({focused})=>focused?(
                   <AntDesign name="heart" size={24} color="#003580" />
                ):(
                    <AntDesign name="hearto" size={24} color="black" />
                )}} />
                <Tab.Screen name="Bookings" component={BookingScreen} options={{tabBarLabel:"Bookings",headerShown:false,tabBarIcon:({focused})=>focused?(
                    <Ionicons name="notifications" size={24} color="#003580" />
                ):(
                    <Ionicons name="notifications-outline" size={24} color="black" />
                )}} />
                <Tab.Screen name="Profile" children={ProfileScreen} options={{tabBarLabel:"Profile",headerShown:false,tabBarIcon:({focused})=>focused?(
                    <Ionicons name="person" size={24} color="#003580" />
                ):(
                    <Ionicons name="person-outline" size={24} color="black" />
                )}} />
            </Tab.Navigator>
        )
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Login' component={LoginScree} options={{headerShown:false}} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}} />
                <Stack.Screen name='Main' component={Bottomtabs} options={{headerShown:false}} />
                <Stack.Screen name="Search" component={SearchScreen} options={{headerShown:false}} />
                <Stack.Screen name="Place" component={PlaceScreen} />
                <Stack.Screen name="Map" component={MapScreen}  options={{headerShown:false}}/>
                <Stack.Screen name='Info' component={ProperyInfo} />
                <Stack.Screen name="Rooms" component={RoomsScreen} />
                <Stack.Screen name="User" component={UserSceen} />
                <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Stacknavigator

const styles = StyleSheet.create({})