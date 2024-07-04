import { View } from "react-native";
import React from "react";
import { ParallaxImage, AdditionalParallaxProps } from "react-native-snap-carousel";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ImageCard = (
  { item, index }: { item: any; index: number },
  parallaxProps?: AdditionalParallaxProps
) => {
  return (
    <View style={{ width: wp(100) - 70, height: hp(25) }}>
      <ParallaxImage
        source={{uri: item.img}}
        containerStyle={{ borderRadius: 30, flex: 1 }}
        style={{ resizeMode: "contain" }}
        parallaxFactor={1}
        {...parallaxProps}
      />
    </View>
  );
};

export default ImageCard;
