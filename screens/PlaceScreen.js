import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect,useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { BottomModal, ModalButton, ModalContent, ModalFooter, ModalTitle, SlideAnimation } from "react-native-modals";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import PropertyCard from '../components/PropertyCard';
import SearchResults from '../components/SearchResults';
import { collection, getDoc, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
const PlaceScreen = () => {
  const route=useRoute();
  const navigation=useNavigation();
  const [data,setData]=useState(route.params.data);
  useEffect(() => {
    // Fetch the collection data on component mount
    const fetchCollectionData = async () => {
      try {
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
  });
  console.log(data);
  const compare=(a,b)=>{ 
      if(a.newPrice>b.newPrice){
        return -1;
      }
      if(a.newPrice<b.newPrice){
        return 1;
      }
      else{
        return 0;
      }
  }
  const comparision=(a,b)=>{
    if(a.newPrice<b.newPrice){
      return -1;
    }
    if(a.newPrice>b.newPrice){
      return 1;
    }
    else{
      return 0;
    }
  }
  const [modelVisible,setModalVisible]=useState(false);
  const [sortedData,setSortedData]=useState(data);
  const [selectedFilter,setSelectedFilter]=useState([]);
  const ApplyFilter=(filter)=>{
      setModalVisible(false);
      switch(filter){
        case "cost:High to Low":
          searchPlaces.map((val)=>val.properties.sort(compare));
          setSortedData(searchPlaces);
          break;
        case "cost:Low to High":
          searchPlaces.map((val)=>val.properties.sort(comparision));
          setSortedData(searchPlaces);
          break;
      }
  }

  const filters = [
    {
      id: "0",
      filter: "cost:Low to High" ,
    },
    {
      id: "1",
      filter: "cost:High to Low",
    },
  ];
  const searchPlaces=data?.filter((item)=>item.place === route.params.place);
  // console.log(searchPlaces);
  // console.log(route.params);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Popular Places",
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
  // useEffect(() => {
  //   // Fetch the collection data on component mount
  //   const fetchCollectionData = async () => {
  //     try {
  //       const q = query(collection(db, "places"));
  //       const querySnapshot=await getDocs(q);
  //       querySnapshot.forEach((doc) => {
  //         // doc.data() is never undefined for query doc snapshots
  //         // console.log(doc.id, " => ", doc.data());
  //         data.push(doc.data());
  //       });
        
  //     } catch (error) {
  //       console.log('Error getting documents: ', error);
  //     }
  //   };

  //   fetchCollectionData();
  // },[]);
  return (
    <View >
      <Pressable style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:20,padding:12,backgroundColor:"white"}}>
      <Pressable onPress={()=>setModalVisible(!modelVisible)} style={{flexDirection:"row",alignItems:'center',gap:10}}>
      <Octicons name="arrow-switch" size={24} color="black" />
      <Text style={{fontSize:15,fontWeight:"500"}}>Sort</Text>
      </Pressable>
      <Pressable style={{flexDirection:"row",alignItems:'center',}}>
      <Ionicons name="filter" size={24} color="black" />
      <Text style={{fontSize:15,fontWeight:"500"}}>Filter</Text>
      </Pressable>
      <Pressable onPress={()=>navigation.navigate('Map',{
        SearchResults:searchPlaces,
      })
      } style={{flexDirection:"row",alignItems:'center',}}>
      <FontAwesome5 name="map-marker-alt" size={22} color="gray" />
      <Text style={{fontSize:15,fontWeight:"500"}}>Map</Text>
      </Pressable>
      </Pressable>
      <ScrollView style={{backgroundColor:"#F5F5F5",marginBottom:15}}>
      {
        sortedData?.filter((item)=>item.place===route.params.place).map((item)=>item.properties.map((property,index)=>
        <PropertyCard key={index} rooms={route.params.rooms} children={route.params.children} adults={route.params.adults} selectedDates={route.params.selectedDates} property={property} availableRooms={property.rooms} />
        ))
      }
      </ScrollView>
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
          <ModalContent style={{width:'100%',height:280}}>
              <View style={{flexDirection:"row"}}>
              {/* left part we will have titlles */}
                <View style={{marginVertical:10,flex:2,height:280,borderRightWidth:2}}>
                  <Text style={{textAlign:'center'}}>Sort</Text>
                </View>
                {/* right part we will have filters */}
                <View style={{flex:3,margin:10}}>
                  {filters.map((item,index)=>(
                      <Pressable onPress={()=>{setSelectedFilter(item.filter)}}  key={index} style={{flexDirection:"row",alignItems:"center",marginVertical:10}}>
                        {
                          selectedFilter.includes(item.filter)?(
                            <FontAwesome name="circle" size={18} color="green" /> 
                          ):(

                        <Entypo name="circle" size={18} color="black" />
                          )
                        }
                        
                        <Text style={{fontWeight:500,fontSize:15}}>{item.filter}</Text>
                      </Pressable>
                  ))
                  }
                </View>
              </View>
      </ModalContent>

        </BottomModal>
    </View>
  )
}

export default PlaceScreen

const styles = StyleSheet.create({})