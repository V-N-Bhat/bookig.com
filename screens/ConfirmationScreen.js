import { Pressable, StyleSheet, Text, View,Alert } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { savedPlaces } from "../SavedReducer";
import { useStripe } from "@stripe/stripe-react-native";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const ConfirmationScreen = () => {
  const stripe=useStripe();
    const route = useRoute();
    const navigation = useNavigation();
    const [paymentdone,setPaymentDone]=useState(false);
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        title: "Confirmation",
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
    },[]);
    const dispatch=useDispatch();
    const uid = auth.currentUser.uid
    const confirmBooking=async()=>{
      dispatch(savedPlaces(route.params));

      await setDoc(
        doc(db, "users", `${uid}`),
        {
          bookingDetails: { ...route.params },
        },
        {
          merge: true,
        }
      );

    navigation.navigate("Main");
    }
    const subscribe=async ()=>{

        const response=fetch("http://192.168.143.120:8000/payment",{
          method:"POST",
          body:JSON.stringify({
            amount:route.params.newPrice
          }),
          headers:{
            "Content-Type":"application/json"
          }
        });
        console.log("inside the cliclke")
        const data=await response.json();
        console.log(data);
        if(!response.ok) return Alert.alert(data.message);
        const clientSecret=data.clientSecret;
        const initSheet=await stripe.initPaymentSheet({
          paymentIntentClientSecret:clientSecret,
        });
        if (initSheet.error) return Alert.alert(initSheet.error.message);
        const presentSheet=await stripe.presentPaymentSheet({
          clientSecret,
        });
        if(presentSheet.error) return Alert.alert(presentSheet.error.message);
    }
    return (
        <View>
          <Pressable style={{ backgroundColor: "white", margin: 10 }}>
            <View
              style={{
                marginHorizontal: 12,
                marginTop: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <View>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                  {route.params.name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 7,
                  }}
                >
                  <MaterialIcons name="stars" size={24} color="green" />
                  <Text>{route.params.rating}</Text>
                  <View
                    style={{
                        flexDirection:"row",
                        alignItems:'center',
                        justifyContent:'space-around',
                      backgroundColor: "#003580",
                      paddingVertical: 3,
                      borderRadius: 5,
                      width: 100,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 15,
                      }}
                    >
                      Genius Level
                    </Text>
                  </View>
                </View>
              </View>
    
              <View
                style={{
                  backgroundColor: "#17B169",
                  paddingHorizontal: 6,
                  paddingVertical: 4,
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: "white", fontSize: 13 }}>
                  Travel sustainable
                </Text>
              </View>
            </View>
    
            <View
              style={{
                margin: 12,
                flexDirection: "row",
                alignItems: "center",
                gap: 60,
              }}
            >
              <View>
                <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 3 }}>
                  Check In
                </Text>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#007FFF" }}
                >
                  {route.params.startDate}
                </Text>
              </View>
    
              <View>
                <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 3 }}>
                  Check Out
                </Text>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#007FFF" }}
                >
                  {route.params.endDate}
                </Text>
              </View>
            </View>
            <View style={{ margin: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 3 }}>
                Rooms and Guests
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#007FFF" }}>
                {route.params.rooms} rooms {route.params.adults} adults{" "}
                {route.params.children} children
              </Text>
            </View>
    
            <Pressable onPress={subscribe}
              style={{
                backgroundColor: "#003580",
                width: 120,
                padding: 5,
                marginHorizontal: 12,
                marginBottom: 20,
                borderRadius:4
              }}
            >
              <Text style={{textAlign:"center",color:"white",fontSize:15,fontWeight:"bold"}}>PayNow</Text>
            </Pressable>
            <Pressable onPress={confirmBooking}
              style={{
                backgroundColor: "#003580",
                width: 120,
                padding: 5,
                marginHorizontal: 12,
                marginBottom: 20,
                borderRadius:4
              }}
            >
              <Text style={{textAlign:"center",color:"white",fontSize:15,fontWeight:"bold"}}>Pay Later</Text>
            </Pressable>
          </Pressable>
        </View>
      );
    
}

export default ConfirmationScreen

const styles = StyleSheet.create({})