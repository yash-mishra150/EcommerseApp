import { View, Text, StatusBar } from 'react-native'
import React, { useState, useCallback, useRef } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShoesGrid from '../../components/ShoeGrid';

const FavoritePage = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }, [])
  );
  const [favorites, setFavorites] = useState([]);
  const [Shoes, setShoes] = useState([]);
  const hasFetchedData = useRef(false);

  const loadShoesData = async () => {
    const storedData = await AsyncStorage.getItem('shoesData');
    if (storedData) {
      const shoesData = JSON.parse(storedData);
      setShoes(shoesData);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (!hasFetchedData.current) {
        loadShoesData();
        hasFetchedData.current = true;
      }
    }, [])
  );
  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
  };


  useFocusEffect(
    useCallback(() => {
      loadFavorites();
      const interval = setInterval(() => {
        loadFavorites();
      }, 2000); 

      
      return () => clearInterval(interval);
    }, [])
  );


  const getFavoriteShoes = (favIds) => {
    const favoriteShoes = Shoes.filter((shoe) => favIds.includes(shoe.id));
    return favoriteShoes;
  };


  const favoriteShoes = getFavoriteShoes(favorites);
  // console.log(favorites, favoriteShoes);
  return (
    <View className="flex-1 pt-12">
      <View className="pl-4">
        <Text style={{ fontFamily: 'Poppins-SemiBold' }} className="text-black text-xl">
          Favourite
        </Text>
      </View>
      <View className=" pl-2">
        <ShoesGrid Shoes={favoriteShoes} navigation={navigation} />
      </View>
    </View>
  )
}

export default FavoritePage