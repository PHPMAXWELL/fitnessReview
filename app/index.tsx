import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
//import { GestureHandlerRootView } from 'react-native-gesture-handler';
//import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import MenuButton from "../components/MenuButton";

const Index = () => {
  const router = useRouter();
  return (
    <View className="flex-1 flex justify-between">
       <Image
        className="h-full w-full absolute"
        source={require("../assets/images/welcome.png")}
      />
    <View className="flex flex-row justify-between">
      <Image
          source={require("../assets/images/logo-app.png")}
          style={{ width: 80, height: 80, marginTop: 40 }} 
        />
         <MenuButton/>
    </View>
   
    <View className="flex-1 flex justify-end">
      <LinearGradient
        colors={["transparent", "#18181b"]}
        style={{ width: wp(100), height: hp(70) }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.8 }}
        className="flex justify-end pb-12 space-y-8"
      >
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          className="flex items-center"
        >
          <Text
            style={{ fontSize: hp(5.5),textAlign:'center'}}
            className="text-white font-bold tracking-wide"
          >
            Les meilleurs<Text className="text-rose-500"> Entraînements</Text>
          </Text>
          <Text
            style={{ fontSize: hp(5.5)}}
            className="text-white font-bold tracking-wide"
          >
            Pour vous
          </Text> 
        </Animated.View>
          <Animated.View entering={FadeInDown.delay(200).springify()}
           className="flex flex-row justify-between"
           style={{flexDirection:'row'}}>
            <TouchableOpacity
              onPress={() => router.push("/registration")}
            >
              <Text
                style={{ fontSize: hp(3), marginLeft:10 }}
                className="text-white font-bold tracking-widest"
              >
                Inscription
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/login")}
              //style={{ height: hp(7), width: wp(80) }}
              //className="bg-rose-100 flex items-center justify-center mx-auto "
            >
              <Text
                style={{ fontSize: hp(3), marginRight:10 }}
                className="text-white font-bold tracking-widest"
              >
                Connexion
              </Text>
            </TouchableOpacity>
          </Animated.View>
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <TouchableOpacity
            onPress={() => router.push("/home")}
            style={{ height: hp(7), width: wp(80) }}
            className="bg-rose-500 flex items-center justify-center mx-auto"
          >
            <Text
              style={{ fontSize: hp(3) }}
              className="text-white font-bold tracking-widest"
            >
              Démo!
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
      <StatusBar style="light" />
    </View>
    </View>
  );
};

export default Index;