import { BackHandler, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
const HeaderPart = () => {
  return (
    <View style={{backgroundColor:"#003580",height:65,flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
      <Pressable style={{flexDirection:'row',alignItems:'center',borderWidth:1,borderRadius:20, borderColor:'white',padding:12}} >
      <Ionicons name="bed-outline" size={24} color="white" />
        <Text style={{marginLeft:8,fontWeight:"bold",color:'white',fontSize:15 }}>Stays</Text>
      </Pressable>
      <Pressable style={{flexDirection:'row',alignItems:'center'}} >
      <Ionicons name="ios-airplane-outline" size={24} color="white" />
        <Text style={{marginLeft:8,fontWeight:"bold",color:'white',fontSize:15 }}>Flight</Text>
      </Pressable>
      <Pressable style={{flexDirection:'row',alignItems:'center'}} >
      <Ionicons name="car-outline" size={24} color="white" />
        <Text style={{marginLeft:8,fontWeight:"bold",color:'white',fontSize:15 }}>Car rental</Text>
      </Pressable>
      <Pressable style={{flexDirection:'row',alignItems:'center'}} >
      <FontAwesome5 name="uber" size={24} color="white" />
        <Text style={{marginLeft:8,fontWeight:"bold",color:'white',fontSize:15 }}>Taxi</Text>
      </Pressable>
    </View>
  )
}

export default HeaderPart
const styles = StyleSheet.create({})