import { View, Text, TouchableOpacity, TextInput, StatusBar, Animated } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ShoesGrid from '../../components/ShoeGrid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CategoryPage = ({ navigation }) => {
  const [Shoes, setShoes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchBarWidth] = useState(new Animated.Value(0)); // For the animated width of the search bar
  const hasFetchedData = useRef(false);

  // Load shoes data
  const loadShoesData = async () => {
    const storedData = await AsyncStorage.getItem('shoesData');
    if (storedData) {
      const shoesData = JSON.parse(storedData);
      setShoes(shoesData);
      setSearchResults(shoesData); // Set initial results to be all shoes
    }
  };

  useEffect(() => {
    if (!hasFetchedData.current) {
      loadShoesData();
      hasFetchedData.current = true;
    }
  }, []);

  // Handle search input change
  const handleSearchChange = (text) => {
    setSearchQuery(text);
    if (text === '') {
      setSearchResults(Shoes); // Show all results if search query is empty
    } else {
      const filteredResults = Shoes.filter((shoe) =>
        shoe.productName.toLowerCase().includes(text.toLowerCase()) ||
        shoe.productCategory.category.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  };

  // Clear search query and reset results
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults(Shoes);
    hideSearchBar(); // Hide search bar and show the "Explore" text again
  };

  // Toggle the search bar animation when the search icon is clicked
  const toggleSearchBar = () => {
    setIsSearchActive(true);
    Animated.timing(searchBarWidth, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false, // For width transition
    }).start();
  };

  // Hide the search bar and bring back the "Explore" text and icons
  const hideSearchBar = () => {
    setIsSearchActive(false);
    Animated.timing(searchBarWidth, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false, // For width transition
    }).start();
  };

  return (
    <View className="flex-1 p-2 pt-10">
      {/* Header: If search bar is not active, show text/icons; otherwise, show search bar */}
      <View className="flex-row justify-between items-center px-2">
        {/* Only show text when search is not active */}
        {!isSearchActive && (
          <Text style={{ fontFamily: 'Poppins-SemiBold' }} className="text-black text-xl">
            Explore
          </Text>
        )}

        {/* If search bar is not active, show icons; otherwise, show search bar */}
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
