import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import Swiper from "../components/Swiper"
import BodyParts from "../components/BodyParts";
import { useLocalSearchParams } from "expo-router";

const Home = () => {
  const { message } = useLocalSearchParams();
  return (
    <SafeAreaView className="flex-1 bg-white flex space-y-5" edges={["top"]}>
      <StatusBar style="dark" />

      {/* header and avatar */}
      <View className="flex-row justify-between items-center mx-5">
        <View className="space-y-2">
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold tracking-wider text-neutral-700"
          >
            PRÊT À
          </Text>
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold tracking-wider text-rose-500"
          >
            S'ENTRAÎNER 
          </Text>
          <Text
            style={{ fontSize: hp(3) }}
            className="flex items-center justify-center font-bold tracking-wider text-black-500"
          >
          {(message ? ` ${message}` : '')}
          </Text>

        </View>
        <View className=" justify-center items-center space-y-2  border-neutral-300">
          {/* <Image
            source={require("../assets/images/avatar.png")}
            style={{ height: hp(6), width: hp(6),resizeMode: "contain" }}
            className="rounded-full"
          /> */}
           <Ionicons name="person-circle" size={hp(7)} color="gray" 
           />
          <View
            className="bg-neutral-200 flex justify-center items-center border-[2px] border-neutral-300"
            style={{ height: hp(5.5), width: hp(5.5) }}
          >
            <Ionicons name="notifications" size={hp(3)} color="gray" />
          </View>
        </View>
      </View>

      {/* image carousel */}
      <View className="flex-1">
        <Swiper />
      </View>

      {/* body parts list */}
      <View  className="flex-1">
        <BodyParts />
      </View>
    </SafeAreaView>
  );
};

export default Home;
