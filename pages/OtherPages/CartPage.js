import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {Swipeable} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

let debounceTimeout;
const {height, width} = Dimensions.get('window');
const CartPage = ({navigation}) => {
  const [items, setItems] = useState([]);
  const [Loading, setLoading] = useState(false);

  const fetchCartItems = async () => {
    try {
      const CartData = await AsyncStorage.getItem('cart');
      const cart = CartData ? JSON.parse(CartData) : [];
      setItems(cart);
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Error', 'Failed to fetch cart items. Please try again.');
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchCartItems();
    }, []),
  );

  const handleQuantityChange = (itemId, newQuantity) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.Selected_Product.productId === itemId
          ? {...item, quantity: newQuantity}
          : item,
      ),
    );

    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
      updateCartInStorage();
    }, 1000);
  };

  const updateCartInStorage = async () => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(items));
      console.log('Cart updated successfully');
    } catch (error) {
      console.error('Update cart error:', error);
      Alert.alert('Error', 'Failed to update cart. Please try again.');
    }
  };

  const deleteCartItem = async itemId => {
    try {
      const updatedItems = items.filter(
        item => item.Selected_Product.productId !== itemId,
      );
      setItems(updatedItems);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedItems));
      console.log('Item deleted successfully');
    } catch (error) {
      console.error('Delete item error:', error);
      Alert.alert('Error', 'Failed to delete item. Please try again.');
    }
  };

  const renderRightActions = itemId => (
    <TouchableOpacity
      onPress={() => deleteCartItem(itemId)}
      className="mt-3 w-20 bg-red-500 justify-center items-center rounded-r-2xl">
      <View className="justify-center items-center">
        <FontAwesome5 name="trash" size={24} color="white" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 p-4 pt-12">
      <View className="flex-row justify-between">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color="black" size={25} />
        </TouchableOpacity>
        <Text
          style={{fontFamily: 'Poppins-SemiBold'}}
          className="text-black text-xl">
          Cart
        </Text>
        <TouchableOpacity>
          <Feather name="more-vertical" color="black" size={25} />
        </TouchableOpacity>
      </View>
      {items.length > 0 ? (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingVertical: 10}}
            style={{maxHeight: 490}}>
            {items.map(item => (
              <Swipeable
                key={item.Selected_Product.productId}
                renderRightActions={() =>
                  renderRightActions(item.Selected_Product.productId)
                }
                friction={2}
                overshootRight={false}
                rightThreshold={40}>
                <View className="mt-3 p-4 rounded-2xl flex-row">
                  <Image
                    source={{uri: item.Selected_Product.pictureUrl}}
                    className="w-32 rounded-lg"
                  />
                  <View className="ml-5 flex-1 justify-center">
                    <View className="flex-row justify-between">
                      <Text
                        style={{fontFamily: 'Poppins-SemiBold'}}
                        className="text-black w-32 text-base">
                        {item.name}
                      </Text>
                      <Text
                        style={{fontFamily: 'Poppins-Medium'}}
                        className="text-gray-400 mt-0.5 text-base">
                        {item.size}
                      </Text>
                    </View>

                    <View className="flex-row justify-between items-center">
                      <Text
                        style={{fontFamily: 'Poppins-Medium'}}
                        className="text-slate-400">
                        &#8377;
                        {item.Selected_Product.productPrice.toFixed(2) * 80}
                      </Text>
                    </View>

                    <View className="flex-row items-center mt-1">
                      <TouchableOpacity
                        style={{
                          paddingVertical: 5,
                          paddingHorizontal: 6,
                        }}
                        className={`${
                          item.quantity > 1 ? 'bg-black' : 'bg-gray-400'
                        } rounded-full`}
                        onPress={() => {
                          if (item.quantity > 1) {
                            const newQuantity = item.quantity - 1;
                            handleQuantityChange(
                              item.Selected_Product.productId,
                              newQuantity,
                            );
                          }
                        }}
                        disabled={item.quantity <= 1}>
                        <FontAwesome5 name="minus" size={15} color="white" />
                      </TouchableOpacity>

                      <Text className="text-black text-lg font-medium mx-4">
                        {item.quantity}
                      </Text>

                      <TouchableOpacity
                        style={{
                          paddingVertical: 5,
                          paddingHorizontal: 6,
                        }}
                        className="bg-black rounded-full"
                        onPress={() => {
                          const newQuantity = item.quantity + 1;
                          handleQuantityChange(
                            item.Selected_Product.productId,
                            newQuantity,
                          ); // Handle quantity change
                        }}>
                        <FontAwesome5 name="plus" size={15} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Swipeable>
            ))}
          </ScrollView>
          <View
            style={{width: width}}
            className="absolute bottom-0 z-0 px-6 pb-3 pt-8 bg-white rounded-2xl">
            <View className="flex-row justify-between items-center">
              <Text
                style={{fontFamily: 'Poppins-Medium'}}
                className="text-gray-500 text-base">
                Subtotal:
              </Text>
              <Text
                style={{fontFamily: 'Poppins-SemiBold'}}
                className="text-black text-lg">
                &#8377;
                {items
                  .reduce(
                    (acc, item) =>
                      acc +
                      item.Selected_Product.productPrice * item.quantity * 80,
                    0,
                  )
                  .toFixed(2)}
              </Text>
            </View>
            <View className="flex-row justify-between mt-4 items-center">
              <Text
                style={{fontFamily: 'Poppins-Medium'}}
                className="text-gray-500 text-base">
                Delivery Fee:
              </Text>
              <Text
                style={{fontFamily: 'Poppins-SemiBold'}}
                className="text-black text-lg">
                &#8377;100
              </Text>
            </View>
            <View className="flex-row justify-between mt-4 items-center">
              <Text
                style={{fontFamily: 'Poppins-Medium'}}
                className="text-gray-500 text-base">
                Platform Fee:
              </Text>
              <Text
                style={{fontFamily: 'Poppins-SemiBold'}}
                className="text-black text-lg">
                &#8377;100
              </Text>
            </View>
            <View className="h-0.5 mt-5 bg-gray-200" />
            <View className="flex-row justify-between mt-10 items-center">
              <Text
                style={{fontFamily: 'Poppins-SemiBold'}}
                className="text-black text-lg">
                Total Cost:
              </Text>
              <Text
                style={{fontFamily: 'Poppins-SemiBold'}}
                className="text-black text-lg">
                &#8377;
                {(
                  items.reduce(
                    (acc, item) =>
                      acc +
                      item.Selected_Product.productPrice * item.quantity * 80,
                    0,
                  ) + 200
                ).toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                height: height * 0.07,
                width: width * 0.6,
                marginTop: height * 0.022,
              }} // Adjust marginTop as needed
              className="bg-black rounded-full self-center justify-center items-center"
              onPress={() => {
                navigation.navigate('Payment', {
                  status: {
                    metaData: {
                      deliveryFee: 100, // Example delivery fee
                    },
                  },
                });
                
              }}
            >
              {Loading ? (
                <LottieView
                  source={require('../../assets/Images/loading.json')}
                  autoPlay
                  style={{width: 50, height: 50}}
                />
              ) : (
                <Text
                  style={{fontFamily: 'Poppins-Medium'}}
                  className="text-white text-lg">
                  Checkout
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View className="flex-1 justify-center items-center">
          <LottieView
            source={require('../../assets/Images/Empty-Product.json')}
            autoPlay
            style={{width: 300, height: 300}}
          />
          <Text
            style={{fontFamily: 'Poppins-SemiBold'}}
            className="text-black text-2xl">
            No items in the cart
          </Text>
          <View className="flex-row gap-2 items-center">
            <Text
              style={{fontFamily: 'Poppins-SemiBold'}}
              className="text-black">
              Try adding one?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Category')}>
              <Text
                style={{fontFamily: 'Poppins-SemiBold'}}
                className="text-black underline">
                Click here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default CartPage;
