import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { useFocusEffect } from '@react-navigation/native';

const FavoritePage = () => {
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
        Favourite
      </Text>
    </View>
  )
}

export default FavoritePage