import { View, Text, TouchableOpacity, Image, ScrollView, FlatList } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restauranrSlice";
import { removeFromBasket, selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const dispatch = useDispatch();
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  console.log(groupedItemsInBasket);

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="bg-gray-100 flex-1">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-3 right-5 p-2 bg-gray-100 rounded-full"
          >
            <XCircleIcon color="#00CCBB" height={50} width={50} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            className="h-7 w-7 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className='divide-y divide-gray-200'>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => {
            return (
              <View className='flex-row items-center space-x-3 bg-white py-2 px-5' key={key}>
                <Text className='text-[#00CCBB]'>{items.length} x</Text>
                <Image source={{uri: urlFor(items[0].image).url()}} className='h-12 w-12 rounded-full' />
                <Text className='flex-1'>{items[0].name}</Text>
                <Text className='text-gray-300'>
                  <Currency quantity={items[0].price} currency="INR" />
                </Text>

                <TouchableOpacity>
                  <Text onPress={() => dispatch(removeFromBasket({id: key}))} className='text-[#00CCBB] text-xs'>
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>

        <View className='p-5 bg-white mt-5 space-y-4'>
          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>SubTotal</Text>
            <Text className='text-gray-400'>
              <Currency quantity={basketTotal} currency="INR" />
            </Text>
          </View>

          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Delivery Fee</Text>
            <Text className='text-gray-400'>
              <Currency quantity={5.99} currency="INR" />
            </Text>
          </View>

          <View className='flex-row justify-between'>
            <Text className=''>Order Total</Text>
            <Text className='font-extrabold'>
              <Currency quantity={basketTotal + 5.99} currency="INR" />
            </Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("PrepairingOrderScreen")} className='rounded-lg bg-[#00CCBB] p-4'>
            <Text className='text-center text-white text-lg'>Place Order</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
