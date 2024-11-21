import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView, StatusBar, Alert } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

const { height, width } = Dimensions.get('window');

const ProductPage = ({ navigation, route }) => {
    const { item } = route.params;
    console.log(item)
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selected, setSelected] = useState(0);
    const [Quantity, setQuantity] = useState(1);
    const [Loading, setLoading] = useState(false)
    const sizes = [35, 37, 39, 41, 43, 45];

    const HandleAddtoCart = async () => {
        setLoading(true);
        console.log('Add to Cart');

        const sessionData = await AsyncStorage.getItem('session');
        const session = sessionData ? JSON.parse(sessionData) : null;
        console.log(session, item);

        try {
            const CartData = await AsyncStorage.getItem('cart');
            let cart = CartData ? JSON.parse(CartData) : [];


            const newCartItem = {
                name: item.productName,
                Selected_Product: item.allProducts[selectedIndex],
                quantity: Quantity,
                size: sizes[selected],
            };


            const existingProductIndex = cart.findIndex(
                (cartItem) =>
                    cartItem.Selected_Product.productId === item.allProducts[selectedIndex].productId &&
                    cartItem.size === sizes[selected]
            );

            if (existingProductIndex !== -1) {

                const updatedCart = [...cart];
                updatedCart[existingProductIndex].quantity += Quantity;
                await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
                Alert.alert('Product quantity updated in cart');
            } else {

                cart.push(newCartItem);
                await AsyncStorage.setItem('cart', JSON.stringify(cart));
                Alert.alert('Product added to cart');
            }

            console.log('Updated cart: ', cart);
        } catch (error) {
            console.log(error);
            Alert.alert('Failed to add item to cart');
        } finally {
            setLoading(false);
        }
    };


    return (
        <View className="p-4 pt-12 ">
            <StatusBar barStyle="dark-content" translucent={true} backgroundColor="transparent" />
            <View className="flex-row justify-between">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" color="black" size={25} />
                </TouchableOpacity>
                <Text style={{ fontFamily: 'Poppins-SemiBold' }} className="text-black text-xl">
                    Product Details
                </Text>
                <TouchableOpacity>
                    <Feather name="more-vertical" color="black" size={25} />
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: height * 0.05 }}>
                <Image
                    source={{ uri: item.allProducts[selectedIndex].pictureUrl }}
                    className="rounded-lg"
                    resizeMode="cover"
                    style={{ height: height * 0.3 }}
                />
                <View style={{ marginTop: height * 0.02 }}>
                    <Text style={{ fontFamily: 'Poppins-SemiBold' }} className="text-center mt-2 text-3xl text-black">{item.productName}</Text>
                    <View className="flex-row justify-between mx-3.5 items-center">
                        <Text style={{ fontFamily: 'Poppins-Medium' }} className="text-center text-base mt-1 text-neutral-400">{item.productCategory.category}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} className="items-center ">
                            {Array.from({ length: Math.floor(item.productRating) }, (_, index) => (
                                <Icon key={index} name="star" size={20} color="black" />
                            ))}
                            {item.productRating % 1 !== 0 && (
                                <Icon name="star-half" size={20} color="black" />
                            )}
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 16, color: 'black', marginLeft: 5, marginTop: 4 }}>
                                {item.productRating}
                            </Text>
                        </View>
                    </View>
                    <View style={{ marginTop: height * 0.01 }} className="flex-row items-center pl-3.5 gap-2">
                        {item.allProducts.map((items, index) => {
                            let color = items.attributeCombination.toLowerCase();

                            // Handle special case for "multi-color"
                            if (color === 'multi-color') {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={{
                                            borderColor: selectedIndex === index ? 'black' : 'gray',
                                            borderWidth: selectedIndex === index ? 2 : 1,
                                            borderRadius: 16,
                                            height: 32,
                                            width: 32,

                                        }}
                                        onPress={() => setSelectedIndex(index)}
                                    >
                                        <LinearGradient
                                            colors={['#FF6347', '#FFD700', '#00BFFF']} // Example of multi-color gradient
                                            style={{
                                                flex: 1, // Ensures gradient fills the whole TouchableOpacity
                                                borderRadius: 16,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {/* Optionally render an icon or image inside the gradient */}
                                        </LinearGradient>
                                    </TouchableOpacity>
                                );
                            }

                            // Default color handling
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={{
                                        backgroundColor: color, // Always shows its color
                                        borderColor: selectedIndex === index ? 'black' : 'gray',
                                        borderWidth: selectedIndex === index ? 2 : 1,
                                        padding: 8,
                                        borderRadius: 16,
                                        height: 32,
                                        width: 32,
                                        justifyContent: 'center',
                                        alignItems: 'center', // Aligns icon or content in the center
                                    }}
                                    onPress={() => setSelectedIndex(index)}
                                >
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                    <Text style={{ fontFamily: 'Poppins-Medium', marginTop: height * 0.025 }} className=" mx-3.5 text-base text-neutral-400">{item.productDescription}</Text>
                </View>



                <View style={{ marginTop: height * 0.02 }} className="mx-1">
                    <Text style={{ fontFamily: 'Poppins-Medium' }} className="text-black text-xl px-1.5">Size</Text>
                    <View style={{ marginTop: height * 0.01 }} className="flex-row justify-between">
                        {
                            sizes.map((items, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={{
                                        width: 50,
                                        height: 49,
                                        borderRadius: 25,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    className={`p-2.5 ${selected === index ? 'bg-black' : 'bg-white border border-gray-300'}`}
                                    onPress={() => setSelected(index)}
                                >
                                    <Text
                                        style={{ fontFamily: 'Poppins-Regular' }}
                                        className={`text-lg ${selected === index ? 'text-white' : 'text-gray-500'}`}
                                    >
                                        {items}
                                    </Text>
                                </TouchableOpacity>

                            ))
                        }
                    </View>
                </View>
            </View>
            <View style={{ marginTop: height * 0.025 }} className="flex-row justify-between items-center">
                <View>
                    <Text
                        style={{ fontFamily: 'Poppins-Medium' }}
                        className="text-black mx-2 text-lg"
                    >
                        Price
                    </Text>
                    <Text
                        style={{ fontFamily: 'Poppins-Medium' }}
                        className="text-black mx-2 text-2xl"
                    >
                        &#8377; {(item.allProducts[selectedIndex]?.productPrice * 80).toFixed(2)}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'black',
                            paddingVertical: 7,
                            paddingHorizontal: 8,
                            borderRadius: 50,
                        }}
                        onPress={() => {
                            setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
                        }}
                    >
                        <FontAwesome5 name="minus" size={15} color="white" />
                    </TouchableOpacity>

                    <Text
                        style={{
                            fontFamily: 'Poppins-Medium',
                            color: 'black',
                            fontSize: 18,
                            marginHorizontal: 12,
                        }}
                    >
                        {Quantity}
                    </Text>

                    <TouchableOpacity
                        style={{
                            backgroundColor: 'black',
                            paddingVertical: 7,
                            paddingHorizontal: 8,
                            borderRadius: 50,
                        }}
                        onPress={() => {
                            setQuantity(prevQuantity => prevQuantity + 1);
                        }}
                    >
                        <FontAwesome5 name="plus" size={15} color="white" />
                    </TouchableOpacity>
                </View>

            </View>

            <TouchableOpacity
                style={{ height: height * 0.07, width: width * 0.6, marginTop: height * 0.022 }} // Adjust marginTop as needed
                className="bg-black rounded-full self-center justify-center items-center"
                onPress={() => HandleAddtoCart()}
            >
                {Loading ? (
                    <LottieView
                        source={require('../../assets/Images/loading.json')}
                        autoPlay
                        style={{ width: 50, height: 50 }}
                    />
                ) : (
                    <Text
                        style={{ fontFamily: 'Poppins-Medium' }}
                        className="text-white text-lg"
                    >
                        Add to Cart
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    )
}

export default ProductPage