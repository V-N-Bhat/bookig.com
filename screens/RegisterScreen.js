import { Alert, KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.js';
import {db} from "../firebase.js";
import { doc, setDoc } from 'firebase/firestore';


const RegisterScreen = () => {
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [phone,setPhone]=useState();
    const navigation=useNavigation();
    const register=()=>{
        if(email==="" || password=== "" || phone==="" ){
            Alert.alert(
                "Invalid Details",
                "Please enter all the Credentials correctly",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              );
        }
        else{
            createUserWithEmailAndPassword(auth,email,password).then((userCredentials)=>{
                const user=userCredentials._tokenResponse.email;
                const uid=auth.currentUser.uid;  
                setDoc(doc(db,"users",`${uid}`),{
                    email:user,
                    phone:phone
                })
            })
        }
    }
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"white",padding:10,alignItems:'center'}}>
    <KeyboardAvoidingView>
            <View style={{justifyContent:'center',alignItems:"center",marginTop:100}}>
                <Text  style={{color:"#003580",fontSize:23,fontWeight:"700"}}>
                    Sign in
                </Text>

                <Text style={{marginTop:15,fontSize:18,fontWeight:"500"}}>Sign in to your account</Text>
            </View>
            <View style={{marginTop:20}}>

            <View style={{marginTop:15}}>
                <Text>Email</Text>
                <TextInput value={email} onChangeText={(text)=>setEmail(text)} placeholder='Enter your email id' placeholderTextColor={"black"} style={{borderBottomColor:"gray",borderBottomWidth:1,marginVertical:18,width:300,fontSize:18}}></TextInput>
            </View>
            <View style={{marginTop:15}}>
                <Text>Password</Text>
                <TextInput value={password} onChangeText={(text)=>setPassword(text)} secureTextEntry={true} placeholder='Enter your Password' placeholderTextColor={"black"} style={{borderBottomColor:"gray",borderBottomWidth:1,marginVertical:18,fontSize:18,width:300}}></TextInput>
            </View>
            <View style={{marginTop:15}}>
                <Text>Phone Number</Text>
                <TextInput value={phone} onChangeText={(text)=>setPhone(text)}  placeholder='Enter your Phone number' placeholderTextColor={"black"} style={{borderBottomColor:"gray",borderBottomWidth:1,marginVertical:18,fontSize:18,width:300}}></TextInput>
            </View>
            </View>
            <Pressable onPress={register} style={{width:200,backgroundColor:"#003580",padding:15,borderRadius:7,marginTop:22,marginLeft:"auto",marginRight:"auto"}}>
                <Text style={{textAlign:"center",color:"white",fontSize:17,fontWeight:"bold"}}>Register</Text>
            </Pressable>
            <Pressable onPress={()=>navigation.navigate("Login")} style={{marginTop:20}}>
                <Text style={{textAlign:'center',color:"gray",fontSize:17}}>Alredy have a account? signIn</Text>
            </Pressable>
    </KeyboardAvoidingView>

    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})