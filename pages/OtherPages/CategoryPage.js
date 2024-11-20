import { View, Text, TouchableOpacity, TextInput, StatusBar, Animated } from 'react-native';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ShoesGrid from '../../components/ShoeGrid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const CategoryPage = ({ navigation }) => {
  const [Shoes, setShoes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchBarWidth] = useState(new Animated.Value(0)); 
  const hasFetchedData = useRef(false);

  
  const loadShoesData = async () => {
    const storedData = await AsyncStorage.getItem('shoesData');
    if (storedData) {
      const shoesData = JSON.parse(storedData);
      setShoes(shoesData);
      setSearchResults(shoesData); 
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


  
  const handleSearchChange = (text) => {
    setSearchQuery(text);
    if (text === '') {
      setSearchResults(Shoes); 
    } else {
      const filteredResults = Shoes.filter((shoe) =>
        shoe.productName.toLowerCase().includes(text.toLowerCase()) ||
        shoe.productCategory.category.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  };

  
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults(Shoes);
    hideSearchBar(); 
  };

  
  const toggleSearchBar = () => {
    setIsSearchActive(true);
    Animated.timing(searchBarWidth, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false, 
    }).start();
  };

  
  const hideSearchBar = () => {
    setIsSearchActive(false);
    Animated.timing(searchBarWidth, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false, 
    }).start();
  };

  return (
    <View className="flex-1 p-2 pt-12">
      
      <View className="flex-row justify-between items-center px-2">
        
        {!isSearchActive && (
          <Text style={{ fontFamily: 'Poppins-SemiBold' }} className="text-black text-xl">
            Explore
          </Text>
        )}

        
        {!isSearchActive ? (
          <View className="flex-row gap-4">
            <TouchableOpacity>
              <Ionicons name="filter-sharp" color="black" size={25} />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleSearchBar}>
              <Feather name="search" color="black" size={25} />
            </TouchableOpacity>
          </View>
        ) : (
          <Animated.View
            style={{
              width: searchBarWidth.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 25,
              paddingHorizontal: 10,
            }}
          >
            <TextInput
              style={{
                flex: 1,
                fontSize: 16,
                color: 'black',
                paddingVertical: 8,
                paddingLeft: 10,
                paddingRight: 40, // Space for the close button
              }}
              placeholder="Search for shoes..."
              value={searchQuery}
              onChangeText={handleSearchChange}
              autoFocus={isSearchActive}
            />
            <TouchableOpacity onPress={clearSearch}>
              <Feather name="x" color="black" size={20} />
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>

      <View>

      </View>
      <ShoesGrid Shoes={searchResults} navigation={navigation} />
    </View>
  );
};

export default CategoryPage;
