import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useSession } from '../../components/SessionManager';
import { useFocusEffect } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');
const HomePage = ({ navigation }) => {

    useFocusEffect(
        React.useCallback(() => {
            StatusBar.setBarStyle('light-content');
            StatusBar.setBackgroundColor('transparent');
            StatusBar.setTranslucent(true);
        }, [])
    );

    let email = "yashm4720@gmail.com";
    const { logout } = useSession();
    const [ShoesData, setshoesData] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [ULoading, setULoading] = useState(false);
    const [User, setUser] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            const sessionData = await AsyncStorage.getItem('session');
            const session = sessionData ? JSON.parse(sessionData) : null;
            setULoading(true);
            setUser(session);
            setULoading(false);
            await getDataShoes();
        };

        fetchData();
    }, []);

    
    const saveShoesData = async (shoeData) => {
        try {
            // Convert shoe data to a JSON string and save in AsyncStorage
            await AsyncStorage.setItem('shoesData', JSON.stringify(shoeData));
            console.log('Shoe data saved!');
        } catch (error) {
            console.error('Failed to save shoes data', error);
        }
    };

    const getDataShoes = async () => {
        setLoading(true);
        console.log(User);
        try {
            const sessionData = await AsyncStorage.getItem('session');
            const session = sessionData ? JSON.parse(sessionData) : null;
            console.log(session.token)
            const response = await axios.post(
                'https://foodappbackend-chw3.onrender.com/api/product/mob/get',
                {
                    "token": session.token
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        api_key: 'f2d9c3e5b28347763fcb57db43a24bca',
                    },
                },
            );
            console.log(response.data.ShoeItems);
            saveShoesData(response.data.ShoeItems);
            setshoesData(response.data.ShoeItems);
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data && error.response.data.status === 401 && error.response.data.message === "Invalid token") {
                console.log("Invalid token - please login again.");
                Toast.show({
                    type: 'error',
                    text1: 'Session terminated',
                    text2: 'Please re-login to refresh.',
                    position: 'top',
                    visibilityTime: 5000,
                });
                await logout();
            }
        } finally {
            setLoading(false);
        }
    }

    // var Shoesdata = [
    //     {
    //         image: 'https://www.converse.in/media/catalog/product/5/6/568497c_01_1.jpg?auto=webp&format=pjpg&width=640&height=800&fit=cover',
    //         name: "Nike Air Max 270 React",
    //         price: "2000.00",
    //         category: 'Mens Shoes'
    //     }, {
    //         image: 'https://www.converse.in/media/catalog/product/5/6/568497c_01_1.jpg?auto=webp&format=pjpg&width=640&height=800&fit=cover',
    //         name: "Nike Air Max 270 React",
    //         price: "2000.00",
    //         category: 'Mens Shoes'
    //     }, {
    //         image: 'https://www.converse.in/media/catalog/product/5/6/568497c_01_1.jpg?auto=webp&format=pjpg&width=640&height=800&fit=cover',
    //         name: "Nike Air Max 270 React",
    //         price: "2000.00",
    //         category: 'Mens Shoes'
    //     }, {
    //         image: 'https://www.converse.in/media/catalog/product/5/6/568497c_01_1.jpg?auto=webp&format=pjpg&width=640&height=800&fit=cover',
    //         name: "Nike Air Max 270 React",
    //         price: "2000.00",
    //         category: 'Mens Shoes'
    //     }
    // ];


    return (
        <View className="flex-1">
            {/* <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" /> */}
            <Toast />
            <View>
                <View className="absolute w-full">
                    <Image
                        source={require('../../assets/Images/home.png')}
                        style={{ width: width, height: height * 0.65 }}
                        className="absolute -z-50"
                    />
                    <View style={{ height: height * 0.6 }} className=" bg-black -z-30 opacity-20" />
                </View>


                <View className="p-4 pt-10">
                    <View className="flex-row justify-between items-center">
                        <View className="flex-row gap-2">
                            <Image className="rounded-full" source={require('../../assets/Images/profile.jpg')} style={{ width: width * 0.125, height: height * 0.06 }} />
                            <View className="flex justify-center">
                                {ULoading ? (
                                    <Text style={{ fontFamily: 'Poppins-SemiBold' }} className="text-white">Loading...</Text>
                                ) : (
                                    <>
                                        {User && User.user && (
                                            <>
                                                <Text style={{ fontFamily: 'Poppins-SemiBold' }} className="text-white">
                                                    {User.user.name}
                                                </Text>
                                                <Text style={{ fontFamily: 'Poppins-Medium' }} className="text-white -mt-1">
                                                    {User.user.email.includes('@') ? User.user.email.split('@')[0] + '...' : null}
                                                </Text>
                                            </>
                                        )}
                                    </>
                                )}
                            </View>
                        </View>
                        <TouchableOpacity className="bg-white h-8 px-3 rounded-full flex-row justify-center items-center">
                            <Feather name="shopping-bag" color="black" size={20} />
                            <Text style={{ fontFamily: 'Poppins-Medium' }} className="text-black mt-1 mx-1">02</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="px-4 flex-col">
                    <Text style={{ marginTop: height * 0.2, fontFamily: 'Poppins-SemiBold' }} className="text-5xl text-white">
                        The Ultimate Collection
                    </Text>
                    <Text style={{ fontFamily: 'Poppins-Regular' }} className="text-base text-white ml-1">
                        Step into style
                    </Text>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10, marginTop: 20 }}
                >
                    {ShoesData.slice(0, 10).map((item, index) => (
                        !Loading && (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('Shoes', { item: item })} className="bg-white h-72 w-48 p-1.5 m-2 rounded-xl shadow-md">
                                <Image
                                    source={{ uri: item.productCategory.pictureUrl }}
                                    className="h-44 w-full rounded-lg"
                                    resizeMode="cover"
                                />
                                <Text style={{ fontFamily: 'Poppins-SemiBold' }} className="text-xl text-black ml-2 mt-4">
                                    &#8377;{(item.allProducts[0]?.productPrice * 80).toFixed(2)}
                                </Text>
                                <Text style={{ fontFamily: 'Poppins-SemiBold' }} className="text-black ml-2 mt-2">
                                    {item.productName}
                                </Text>
                                <Text style={{ fontFamily: 'Poppins-SemiBold' }} className="text-neutral-400 ml-2">
                                    {item.productCategory.category}
                                </Text>
                            </TouchableOpacity>
                        )
                    ))}


                </ScrollView>

            </View>
            <View className="bg-[#f3f3f2] w-full h-72 rounded-t-3xl -z-10 absolute bottom-0">
                {Loading &&
                    <>
                        <View className="flex-1 justify-center items-center bg-[#f3f3f2] p-4">
                            <ActivityIndicator className="mb-2" size="large" color="black" />
                            <Text style={{ fontFamily: 'Poppins-SemiBold' }} className="text-black">Loading, please wait...</Text>
                        </View>
                    </>}
            </View>
        </View >
    )
}

export default HomePage