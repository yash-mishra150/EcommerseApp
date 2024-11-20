import { View, Text, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import OrderContainer from '../../components/OrderContainer';

const OrdersPage = () => {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }, [])
  );

  const data = {
    name: "Reebok Classic",
    price: 10399.20,
    quantity: 2,
    size: 35,
    category: 'Casual',
    status: 'Completed',
    date: '2024-11-12',
    image: 'https://www.converse.in/media/catalog/product/5/6/568497c_01_1.jpg?auto=webp&format=pjpg&width=640&height=800&fit=cover'
  };
  return (
    <View className="flex-1 pt-12">
      <View className="pl-4">
        <Text style={{ fontFamily: 'Poppins-SemiBold' }} className="text-black text-xl">
          Orders
        </Text>
      </View>
      <View className="px-4 mt-5">
        <OrderContainer data={data} />
      </View>
    </View>
  )
}

export default OrdersPage