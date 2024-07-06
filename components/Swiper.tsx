import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import Swiper from 'react-native-swiper'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

export default class SwiperComponent extends Component {
    render() {
      return (
        <Swiper  autoplay={true}>
          <View className=" flex-1 justify-center items-center">
            <Image
                source={require('../assets/images/slide1.png')}
                className="flex-1 rounded-[35px]"
                style={{ width: wp(110) - 70, height: hp(15) }}
            />
          </View>
            <View  className=" flex-1 justify-center items-center">
            <Image
                source={require('../assets/images/slide2.png')}
                className="flex-1 rounded-[35px]"
                style={{ width: wp(110) - 70, height: hp(15) }}
            />
          </View>
          <View  className=" flex-1 justify-center items-center">
            <Image
                source={require('../assets/images/slide3.png')}
                className="flex-1 rounded-[35px]"
                style={{ width: wp(110) - 70, height: hp(15) }}
            />
          </View>
          <View  className=" flex-1 justify-center items-center">
            <Image
                source={require('../assets/images/slide4.png')}
                className="flex-1 rounded-[35px]"
                style={{ width: wp(110) - 70, height: hp(15) }}
            />
          </View>
          <View  className=" flex-1 justify-center items-center">
            <Image
                source={require('../assets/images/slide5.png')}
                className="flex-1 rounded-[35px]"
                style={{ width: wp(110) - 70, height: hp(15) }}
            />
          </View>
        </Swiper>
      )
    }
  }