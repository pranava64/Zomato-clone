import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PrepairingOrderScreen = () => {
    const navigation = useNavigation();

    useEffect(() =>{
        setTimeout(() =>{
            navigation.navigate("Delivery");
        }, 3000)
    }, [])

  return (
    <SafeAreaView className="bg-[#00CCBB] flex-1 items-center justify-center">
      <Animatable.Image
        source={require("../assets/deliveroodribbbble.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96"
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg my-10 text-white font-bold text-center"
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>

      <Progress.Circle size={60} color='white' indeterminate={true} />
    </SafeAreaView>
  );
};

export default PrepairingOrderScreen;
