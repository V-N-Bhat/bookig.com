import { KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScree = () => {
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const navigation=useNavigation();
    const login=()=>{
        signInWithEmailAndPassword(auth,db,password).then((userCredentials)=>{
            console.log("user credential",userCredentials);
            const user=userCredentials.user;
            console.log("user details",user);
        })
    }
    useEffect(()=>{
        const unsubscribe=auth.onAuthStateChanged((authUSer)=>{
            try{
                if(authUSer){
                    navigation.navigate("Main");
                }
            }catch(e){
                console.log(e);
            }
            return unsubscribe;
        })
    },[])
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
                    <TextInput value={email} onChangeText={(text)=>setEmail(text)
                    } placeholder='Enter your email id' placeholderTextColor={"black"} style={{borderBottomColor:"gray",borderBottomWidth:1,marginVertical:18,width:300,fontSize:18}}></TextInput>
                </View>
                <View style={{marginTop:15}}>
                    <Text>Password</Text>
                    <TextInput value={password} onChangeText={(text)=>setPassword(text)} secureTextEntry={true} placeholder='Enter your Password' placeholderTextColor={"black"} style={{borderBottomColor:"gray",borderBottomWidth:1,marginVertical:18,fontSize:18,width:300}}></TextInput>
                </View>
                </View>
                <Pressable style={{width:200,backgroundColor:"#003580",padding:15,borderRadius:7,marginTop:22,marginLeft:"auto",marginRight:"auto"}}>
                    <Text style={{textAlign:"center",color:"white",fontSize:17,fontWeight:"bold"}}>Login</Text>
                </Pressable>
                <Pressable onPress={()=>
                    navigation.navigate("Register")} style={{marginTop:20}}>
                    <Text style={{textAlign:'center',color:"gray",fontSize:17}}>Dont have an account? signup</Text>
                </Pressable>
        </KeyboardAvoidingView>

        </SafeAreaView>
  )
}

export default LoginScree

const styles = StyleSheet.create({})