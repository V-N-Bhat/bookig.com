import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { cloneElement, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { pixelNormalize } from '../components/Normalise';
import {MaterialIcons} from "@expo/vector-icons"
import Amenities from '../components/Amenities';
const ProperyInfo = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [showImage, setShowImage] = useState(true);
    console.log("hello");
  console.log(route.params.photos);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: `${route.params.name}`,
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#003580",
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
    });
  }, []);
  const difference=route.params.oldPrice-route.params.newPrice;
  const offerPrice=(Math.abs(difference)/route.params.oldPrice)*100
  return (
    <SafeAreaView>
    <View>

      <ScrollView>
        <Pressable style={{ flexDirection: 'row', flexWrap: "wrap",justifyContent:'space-between',margin: 10 }}>
          {showImage ? (
            route.params.photos.slice(0,5).map((photo) => (
              <View key={photo.id}>
                <Image style={{ width: 120, height: pixelNormalize(80), borderRadius: pixelNormalize(4),marginVertical:2 }} source={{ uri: photo.image }} />
              </View>
            ))
          ) : (
            route.params.photos.map((photo) => (
              <View key={photo.id}>
                <Image style={{ width: 120, height: pixelNormalize(80), borderRadius:pixelNormalize(4),marginVertical:2 }} source={{ uri: photo.image }} />
              </View>
            ))
          )}
          <Pressable onPress={() => {setShowImage(!showImage)}} style={{ alignItems: "center", justifyContent: 'center' }}>
            {
                showImage?(
                    <Text style={{ textAlign: "center", marginLeft: 20,fontWeight:'bold' }}>Show more</Text>
                ):(
                    <Text style={{ textAlign: "center", marginLeft: 20,fontWeight:'bold' }}>Show less</Text>
                )
            }
          </Pressable>
        </Pressable>
            <View style={{marginHorizontal:12,marginTop:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <View>
                    <Text style={{fontSize:25,fontWeight:"bold"}}>{route.params.name}</Text>
                    <View style={{flexDirection:"row",alignItems:"center",gap:6,marginTop:7,justifyContent:'space-between'}}>
                            <MaterialIcons name="stars" size={24} color="green" />
                            <Text>{route.params.rating}</Text>

                            <View style={{backgroundColor:"#003580",paddingVertical:4,borderRadius:5,width:100}}>
                                    <Text style={{textAlign:"center",color:"white",fontSize:15}}>Genius Level</Text>
                        
                             </View>
                             <View style={{backgroundColor:"#17B169",paddingHorizontal:6,paddingVertical:4,borderRadius:6}}>
                <Text style={{color:'white',fontSize:13}}>Travel sustainable</Text>
                </View>
                    </View>
                
                </View>

            </View>

        
        <Text style={{borderColor:"#E0E0E0",borderWidth:1,height:1,marginTop:15}} />
        <Text style={{marginTop:4,fontSize:15,fontWeight:500,marginHorizontal:12}}>Price for 1 Night for 1 Room</Text>
        <View style={{marginTop:14,flexDirection:"row",alignItems:"center",gap:8,marginHorizontal:14}}>
                    <Text style={{color:"red",fontSize:17,textDecorationLine:'line-through'}}>{route.params.oldPrice*route.params.adults}</Text>
                    <Text style={{color:'black',fontSize:17 }}>Rs. {route.params.newPrice}</Text>
        </View>
        <View style={{marginHorizontal:12,marginTop:7,backgroundColor:'green',paddingHorizontal:4,paddingVertical:5,width:78,borderRadius:4}}>
            <Text style={{textAlign:"center",color:"white"}}>{offerPrice.toFixed(0)} % Off</Text>
        </View>
        <Text style={{borderColor:"#E0E0E0",borderWidth:1,height:1,marginTop:15}} />
        <View style={{margin:12,flexDirection:'row',alignItems:'center',gap:60}}>
            <View>
                <Text style={{fontSize:16,fontWeight:"600",marginBottom:3}}>
                    Check In
                </Text>
                <Text style={{fontSize:16,fontWeight:"bold",color:"#007FFF"}}>
                    {route.params.selectedDates.startDate}
                </Text>
            </View>
            <View>
                <Text style={{fontSize:15,fontWeight:"600",marginBottom:3}}>
                    Check out
                </Text>
                <Text style={{fontSize:16,fontWeight:"bold",color:"#007FFF"}}>
                    {route.params.selectedDates.endDate}
                </Text>
            </View>
        </View>
            <View style={{margin:12}}>
                <Text style={{fontSize:15,fontWeight:"600",marginBottom:3}}>
                    Rooms and Guests
                </Text>
                <Text style={{fontSize:16,fontWeight:"bold",color:"#007FFF"}}>{route.params.rooms} rooms {route.params.adults} adults</Text>
            </View>
            
        <Text style={{borderColor:"#E0E0E0",borderWidth:1,height:1,marginTop:15}} />
        <Amenities />
        <Text style={{borderColor:"#E0E0E0",borderWidth:1,height:1,marginTop:15}} />
      <Pressable onPress={()=>navigation.navigate("Rooms",{
        rooms:route.params.availableRooms,
        oldPrice:route.params.oldPrice,
        newPrice:route.params.newPrice,
        name:route.params.name,
        children:route.params.children,
        adults:route.params.adults,
        rating:route.params.rating,
        startDate:route.params.selectedDates.startDate,
        endDate:route.params.selectedDates.endDate
      })} style={{backgroundColor:"#002D62",marginBottom:30,paddingVertical:20}}>
        <Text style={{textAlign:'center',color:"white",fontSize:20}}>Select availibility</Text>
      </Pressable>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

export default ProperyInfo;

const styles = StyleSheet.create({});