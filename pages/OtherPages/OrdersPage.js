import { View, Text, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native';

const OrdersPage = () => {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }, [])
  );

  return (
    <View className="flex-1 p-4 pt-10">
      <Text style={{ fontFamily: 'Poppins-SemiBold' }} className="text-black text-xl">
        Orders
      </Text>
    </View>
  )
}

export default OrdersPage