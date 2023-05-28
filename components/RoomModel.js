import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'

const RoomModel = ({typeOfbook,setFunction,bookingValue}) => {
  return (
    <View  style ={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',margin:25 }}>
    <Text>
        {typeOfbook}
    </Text>
    <Pressable style={{flexDirection:'row',alignItems:'center',gap:10,justifyContent:'center'}}>
        <Pressable onPress={()=>{
            // console.log(``)
            if(typeOfbook==="rooms" || typeOfbook==="adult"){
                console.log("entered into room or adult ");
                // return setFunction(Math.max(1,bookingValue-1));
                return setFunction(Math.max(1, parseInt(bookingValue, 10) - 1));
            }
            else{
                console.log("hello");
                console.log("entered to child wala");
                // return  setFunction(Math.max(0,bookingValue-1));
                return setFunction(Math.max(0, parseInt(bookingValue, 10) - 1));
            }
            }
        }
             style={{width:26,height:26,borderRadius:13,borderColor:"#E0E0E0",alignItems:'center'}}>
            <Text style={{fontSize:24 ,fontWeight:600}}> - </Text>
        </Pressable>
        <Pressable>
            <Text style={{textAlign:'center' ,paddingHorizontal:9}}>
                {bookingValue}
            </Text>
        </Pressable >
        <Pressable onPress={()=>setFunction(Math.max(1,bookingValue+1))} style={{width:26,height:26,borderRadius:13,borderColor:"#E0E0E0",alignItems:'center'}}>
            <Text style={{fontSize:20 ,fontWeight:500,}}>
                +
            </Text>
        </Pressable>
    </Pressable>
 </View>
  )
}

export default RoomModel

const styles = StyleSheet.create({})