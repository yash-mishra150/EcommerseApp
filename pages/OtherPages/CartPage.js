import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

const CartPage = ({ navigation }) => {
    const [Quantity, setQuantity] = useState(1);
    const [isDeleted, setIsDeleted] = useState(false);

    // Example product data
    const item = {
        name: 'Reebok Classic',
        price: 10399.2,
        imageUri: 'https://www.converse.in/media/catalog/product/5/6/568497c_01_1.jpg?auto=webp&format=pjpg&width=640&height=800&fit=cover',
        allProducts: [
            { attributeCombination: 'Blue' },
            { attributeCombination: 'Red' },
            { attributeCombination: 'Multi-color' }
        ]
    };

    // Render delete action
    const renderRightActions = () => (
        <TouchableOpacity onPress={() => setIsDeleted(true)} className=" mt-3 w-20 bg-red-500 justify-center items-center mt- rounded-r-2xl">
            <View
                className="justify-center items-center"
            >
                <FontAwesome5 name="trash" size={24} color="white" />
            </View>
        </TouchableOpacity>
    );

    // Check if item is deleted
    if (isDeleted) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-lg text-gray-600">Item deleted!</Text>
            </View>
        );
    }

    return (
        <View className="p-4 pt-12">
            {/* Header */}
            <View className="flex-row justify-between">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" color="black" size={25} />
                </TouchableOpacity>
                <Text className="text-black text-xl font-semibold">Cart</Text>
                <TouchableOpacity>
                    <Feather name="more-vertical" color="black" size={25} />
                </TouchableOpacity>
            </View>

            {/* Swipeable Item */}
            <Swipeable
                renderRightActions={renderRightActions}
                friction={2}
                overshootRight={false}
                rightThreshold={40}
                onSwipeableWillOpen={() => console.log('Swiping...')}
            >
                <View className="mt-3 bg-white p-4 rounded-2xl shadow-lg flex-row">
                    {/* Product Image */}
                    <Image
                        source={{ uri: item.imageUri }}
                        className="w-32 rounded-lg"
                    />
                    <View className="ml-5 flex-1 justify-center">
                        {/* Product Name */}
                        <Text className="text-black text-xl font-semibold">
                            {item.name}
                        </Text>

                        {/* Price and Colors */}
                        <View className="mt-2 flex-row justify-between items-center">
                            <Text className="text-slate-400 text-lg">
                                &#8377;{item.price.toFixed(2)}
                            </Text>

                            {/* Color Options */}
                            <View className="ml-4 flex-row flex-wrap justify-start items-center">
                                {item.allProducts.map((colorItem, index) => {
                                    const color = colorItem.attributeCombination.toLowerCase();

                                    if (color === 'multi-color') {
                                        return (
                                            <TouchableOpacity key={index}>
                                                <LinearGradient
                                                    colors={['#FF6347', '#FFD700', '#00BFFF']}
                                                    style={{
                                                        width: 24,
                                                        height: 24,
                                                        borderRadius: 12,
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
                                                width: 24,
                                                height: 24,
                                                borderRadius: 12,
                                                marginRight: 8,
                                                borderWidth: 1,
                                                borderColor: '#ddd',
                                            }}
                                        />
                                    );
                                })}
                            </View>
                        </View>

                        {/* Quantity Controls */}
                        <View className="flex-row justify-around items-center mt-5">
                            <TouchableOpacity
                                className={`${Quantity > 1 ? 'bg-black' : 'bg-gray-400'
                                    } p-2 rounded-full`}
                                onPress={() => {
                                    if (Quantity > 1) {
                                        setQuantity(prevQuantity => prevQuantity - 1);
                                    }
                                }}
                                disabled={Quantity <= 1}
                            >
                                <FontAwesome5 name="minus" size={15} color="white" />
                            </TouchableOpacity>

                            <Text className="text-black text-lg font-medium mx-4">{Quantity}</Text>

                            <TouchableOpacity
                                className="bg-black p-2 rounded-full"
                                onPress={() => setQuantity(prevQuantity => prevQuantity + 1)}
                            >
                                <FontAwesome5 name="plus" size={15} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Swipeable>
        </View>
    );
};

export default CartPage;
