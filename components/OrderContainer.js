import { View, Text, Image } from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

const OrderContainer = ({ data }) => {
    return (
        <View className="border-2 border-gray-300 p-4 mb-4 rounded-xl shadow-lg">
            <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                    <Entypo name="shop" size={20} color="#4B5563" />
                    <Text style={{ fontFamily: 'Poppins-SemiBold' }} className="text-base ml-2 mt-1 text-gray-800">{data.category}</Text>
                </View>
                <Text style={{ fontFamily: 'Poppins-SemiBold' }} className="text-sm p-1 px-2 rounded-lg text-black bg-gray-200">{data.status}</Text>
            </View>
            <View className="bg-gray-300 h-0.5 mt-2" />
            <View className="flex-row mt-3">
                <Image source={{ uri: data.image }} style={{ width: 100, height: 100, borderRadius: 15 }} />
                <View className="flex-col ml-5 justify-center">
                    <Text style={{ fontFamily: 'Poppins-SemiBold' }} className="text-black text-xl">{data.name}</Text>
                    <Text style={{ fontFamily: 'Poppins-Medium' }} className="text-slate-400 mt-1 text-base">Size:{" "}{data.size}</Text>
                    <Text style={{ fontFamily: 'Poppins-Medium' }} className="text-slate-400 mt-1 text-base">&#8377;{data.price}</Text>
                </View>
            </View>
            <View className="flex-row justify-between mt-3">
                <View>
                    <Text style={{ fontFamily: 'Poppins-Medium' }} className="text-slate-400 mt-3 text-base">Order Total: </Text>
                    <Text style={{ fontFamily: 'Poppins-SemiBold' }} className="text-black mt-1 text-xl">&#8377;{data.price}</Text>
                </View>
                <View>
                    <Text style={{ fontFamily: 'Poppins-Medium' }} className="text-slate-400 mt-3 text-base">Delivery Date: </Text>
                    <Text style={{ fontFamily: 'Poppins-SemiBold' }} className="text-black mt-1 text-xl">{data.date}</Text>
                </View>
            </View>

        </View>
    );
};

export default OrderContainer;
