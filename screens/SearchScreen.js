import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons';
import SearchResults from '../components/SearchResults';
import { collection, getDocs, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase';
import { useRoute } from '@react-navigation/native';
const SearchScreen = () => {
    const [input,setInput]=useState("");
    const route=useRoute();
    const [data,setData]=useState(route.params.data);
    // console.log(input); 
    // useEffect(()=>{
      //   if(data.length>0){
        //     return;
        //   }
        //   const fetchProducts=async()=>{
      //         const usersQuery=collection(db,'places')
      //         onSnapshot(usersQuery,(snapshot)=>{
      //           let placeList=[];
      //           snapshot.docs.map((doc)=>placeList.push({...doc.data()}));
      //           setData(placeList)
      //         })
      //   }
      // },[]);
      // const [data,setData]=useState([]);
      // useEffect(() => {
      //   // Fetch the collection data on component mount
      //   const fetchCollectionData = async () => {
      //     try {
      //       if(data.length>0){
      //         console.log("alreddy have data");
      //         return;
      //       }
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
      // }, []);
      // console.log("from firebase");
      // console.log(data);
  return (
    <SafeAreaView>

    <View style={{padding:10,margin:10,flexDirection:'row',alignItems:'center',justifyContent:'space-around',borderColor:"#FF272C",borderWidth:4,borderRadius:10}}>
      <TextInput value={input} onChangeText={(text)=>setInput(text)} placeholder='Enter your Destination'/>
      <Feather name="search" size={24} color="black" />
    </View>
      <SearchResults data={data} input={input} setInput={setInput} />
    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})