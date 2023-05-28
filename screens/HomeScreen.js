import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,Alert
} from "react-native";
import React, { useLayoutEffect,useState,useCallback, Children, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import HeaderPart from "../components/HeaderPart";
import { Feather } from "@expo/vector-icons";
import DatePicker from 'react-native-date-ranges';
import { BottomModal, ModalButton, ModalContent, ModalFooter, ModalTitle, SlideAnimation } from "react-native-modals";
import RoomModel from "../components/RoomModel";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
const HomeScreen = () => {
  const navigation = useNavigation();
  const route=useRoute();
  console.log(route.params);
  const [data,setData]=useState([]);
  useEffect(() => {
    // Fetch the collection data on component mount
    const fetchCollectionData = async () => {
      try {
        if(data.length>0){
          console.log("alreddy have data");
          return;
        }
        const q = query(collection(db, "places"));
        const querySnapshot=await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          data.push(doc.data());
        });
        
      } catch (error) {
        console.log('Error getting documents: ', error);
      }
    };

    fetchCollectionData();
  }, [data]);
  console.log("from firebase");
  console.log(data);
  const searchPlaces=(place)=>{
    if(!route.params || !selectedDates){
      Alert.alert('Invalid Details', 'Please enter all the deatails', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
    if(route.params && selectedDates){
      navigation.navigate("Place",{
        rooms:rooms,
        adults:adults,
        children:children,
        selectedDates:selectedDates,
        place:place,
        data:data,
      })
    }
  }
  const [selectedDates,setSelectedDates]=useState();
  const [rooms,setrooms]=useState(1);
  const [adults,setAdults]=useState(2);
  const [children,setChildren]=useState(0);
  const [modelVisible,setModalVisible]=useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Booking.com",
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
      headerRight: () => (
        <Ionicons
          name="notifications-outline"
          size={24}
          color="white"
          style={{ marginRight: 12 }}
        />
      ),
    });
  }, []);
  const customButton=(onConfirm)=>{
    return (
        <Button 
            onPress={onConfirm}
            style={
                {
                    container:{width:"80%",marginHorizontal:'3%'},
                    text:{fontSize:'20'},
                }
            }
            primary
            title="submit"
        />
    )
  }
  return (
    <>
    <View>
      <HeaderPart />
      <ScrollView>
        <View
          style={{
            margin: 20,
            borderColor: "#FFC72C",
            borderWidth: 3,
            borderRadius: 6,
          }}
        >
          {/* destination */}
          <Pressable onPress={()=>navigation.navigate("Search",{
            data:data,
          })
          }
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingHorizontal: 10,
              borderColor: "#FFC72C",
              borderWidth: 2,
              paddingVertical: 15,
            }}
          >
            <Feather name="search" size={24} color="black" />
            <Text>{route?.params ? route.params.input:"enter your destination"}</Text>
          </Pressable>
          {/* selected date */}
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingHorizontal: 10,
              borderColor: "#FFC72C",
              borderWidth: 2,
              paddingVertical: 15,
            }}
          >
            <Feather name="calendar" size={24} color="black" />
            <DatePicker
    style={ { width: 290, height: 30,borderRadius:0,borderWidth:0,borderColor:'transparent' } }
    customStyles = { {
        placeholderText:{ fontSize:20,flexDirection:'row',alignItems:'center',marginRight:'auto',marginLeft:'auto'},
        headerStyle:{
            backgroundColor:'#003580'
        }
    } } 
    centerAlign 
    selectedBgColor="#0047AB"
    customButton={(onConfirm)=>customButton(onConfirm)}
    onConfirm={(startDate,endDate)=>setSelectedDates(startDate,endDate)}
    placeholder={'Pick a date'}
    mode={'range'}
/>  
          </Pressable>
          {/* Roooms and guests */}
          <Pressable onPress={()=>setModalVisible(!modelVisible)} style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingHorizontal: 10,
              borderColor: "#FFC72C",
              borderWidth: 2,
              paddingVertical: 15,
            }}>
          <Ionicons name="person-outline" size={24} color="black" />
            <TextInput placeholder={`${rooms} rooms . ${adults} adults . ${children}`} />
          </Pressable>
          {/* search buttons */}
          <Pressable onPress={()=>{
            searchPlaces(route.params.input)
          }}
          style={{
              paddingHorizontal: 10,
              borderColor: "#FFC72C",
              borderWidth: 2,
              paddingVertical: 15,
              backgroundColor:'#2a52be'
            }}>
            <Text style={{textAlign:'center',fontWeight:"500"}}>Search</Text>
          </Pressable>
        </View>

        {/* ohter than the main part */}
        <Text style={{marginHorizontal:20,fontSize:17,fontWeight:500}}>Travel more and spend less </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable style={{width:200,height:125,backgroundColor:'#003580',borderRadius:20,padding:20,marginTop:10,marginHorizontal:20}}>
              <Text style={{color:'white',fontSize:15,fontWeight:"bold",marginVertical:7}}>Genius</Text>
              <Text style={{color:"white",fontSize:15,fontWeight:"500"}}>You are at level 1 in  loytaly program</Text>
            </Pressable>
            <Pressable style={{width:200,height:125,borderColor:'#E0E0E0',borderRadius:20,padding:20,marginTop:10,borderWidth:2}}>
              <Text style={{fontSize:15,fontWeight:"bold",marginVertical:7}}>15% Discount</Text>
              <Text style={{fontSize:15,fontWeight:"500"}}>Get 5 Nights stay at level 2</Text>
            </Pressable>
            <Pressable style={{width:200,height:125 ,borderColor:'#E0E0E0',borderRadius:20,padding:20,marginTop:10,marginHorizontal:10,borderWidth:2}}>
              <Text style={{fontSize:15,fontWeight:"bold",marginVertical:7}}>10% Discount</Text>
              <Text style={{fontSize:15,fontWeight:"500"}}>Enjooy the discount across india</Text>
            </Pressable>
      </ScrollView>  
      <Pressable  style={{marginTop:40,
        justifyContent:"center",
        alignItems:"center"
      }}>
        <Image style={{width:200,height:150,resizeMode:'cover'}} source={{uri:"https://assets.stickpng.com/thumbs/5a32a821cb9a85480a628f8f.png"}} />
      </Pressable>
      </ScrollView>
    </View>



        <BottomModal swipeThreshold={200} onBackdropPress={()=>setModalVisible(!modelVisible)} swipeDirection={["up","down"]}
            footer={
                <ModalFooter>
                    
                    <ModalButton text="apply" style={{marginBottom:20,color:'white',backgroundColor:'#003580'}} onPress={()=>setModalVisible(!modelVisible)} />
                    
                </ModalFooter>
            }
            modalTitle={
                <ModalTitle  title="select rooms and guests" />
            }
            modalAnimation={
                new  SlideAnimation({
                    slideFrom:"bottom",
                })
            }
            onHardwareBackPress={()=>setModalVisible(!modelVisible)}
            visible={modelVisible}
            onTouchOutside={()=>setModalVisible(!modelVisible)}
        >
            <ModalContent style={{width:'100%',height:310}}>
                 <RoomModel typeOfbook={"rooms"} bookingValue={rooms} setFunction={setrooms} />
                 <RoomModel typeOfbook={"adult"} bookingValue={adults} setFunction={setAdults} />
                 <RoomModel typeOfbook={"children"} bookingValue={children} setFunction={setChildren} />
                 
            </ModalContent>
        </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
