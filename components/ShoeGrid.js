import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { TouchableOpacity, Image, FlatList, Text, View, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { height, width } = Dimensions.get('window');

const ShoesGrid = ({ Shoes, navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
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

      loadFavorites();


      return () => { };
    }, [])
  );
  const toggleFavorite = async (itemId) => {
    try {
      let updatedFavorites = [...favorites];
      const isFavorited = updatedFavorites.includes(itemId);

      if (isFavorited) {

        updatedFavorites = updatedFavorites.filter((id) => id !== itemId);
      } else {

        updatedFavorites.push(itemId);
      }


      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Failed to update favorites:', error);
    }
  };


  const isFavorite = (itemId) => {
    return favorites.includes(itemId);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Shoes', { item })}
      style={{
        backgroundColor: 'white',
        height: height * 0.30,
        width: width * 0.44,
        padding: 12,
        margin: 8,
        marginLeft: 0,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 5,
      }}
    >
      <Image
        source={{ uri: item.productCategory.pictureUrl }}
        style={{
          height: '60%',
          width: '100%',
          borderRadius: 10,
        }}
        resizeMode="cover"
      />
      <TouchableOpacity
        className="absolute top-5 right-5"
        onPress={() => toggleFavorite(item.id)}>
        {isFavorite(item.id) ? (
          <AntDesign name="heart" size={20} color="red" />
        ) : (
          <AntDesign name="hearto" size={20} color="black" />
        )}
      </TouchableOpacity>

      <Text
        style={{
          fontFamily: 'Poppins-SemiBold',
          fontSize: 16,
          color: 'black',
          marginTop: 10,
        }}
      >
        {item.productName}
      </Text>
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: 12,
          color: '#6c757d',
          marginTop: 4,
        }}
      >
        {item.productCategory.category}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 16,
            color: 'black',
          }}
        >
          &#8377;{(item.allProducts[0]?.productPrice * 80).toFixed(2)}
        </Text>
        {/* <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          {item.allProducts.map((colorItem, index) => {
            let color = colorItem.attributeCombination.toLowerCase();

            if (color === 'multi-color') {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    borderRadius: 16,
                    height: 20,
                    width: 20,
                    marginRight: 8,
                    borderWidth: 1,
                    borderColor: '#ddd', // Light border around colors
                  }}
                >
                  <LinearGradient
                    colors={['#FF6347', '#FFD700', '#00BFFF']}
                    style={{
                      flex: 1,
                      borderRadius: 16,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                </TouchableOpacity>
              );
            }

            return (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: color,
                  height: 24,
                  width: 24,
                  borderRadius: 12,
                  marginRight: 8,
                  borderWidth: 1,
                  borderColor: '#ddd', // Border around color options
                }}
              />
            );
          })}
        </View> */}


      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={Shoes}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      contentContainerStyle={{
        paddingHorizontal: 10,
        paddingTop: 25,
      }}
    />
  );
};

export default ShoesGrid;
