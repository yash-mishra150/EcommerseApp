import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import OrderPage from '../pages/main/OrderPage/OrderPage';
import Setting from '../pages/main/Setting';
import ProductPage from '../pages/main/ProductPage/ProductPage';
import TransactionPage from '../pages/main/TransactionPage';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarStyle: {
                        borderColor: '#7b7b7d',
                        backgroundColor: 'black', // Background color of the tab bar
                        borderTopLeftRadius: 15, // Rounded corners
                        borderTopRightRadius: 15, // Rounded corners
                        elevation: 0, // Removes shadow on Android
                        position: 'relative',
                        shadowOpacity: 0, // Removes shadow on iOS
                        height: 70, // Optional: Adjust height
                        paddingBottom: 20, // Optional: Add padding to the bottom
                        paddingTop: 5,
                    },
                    tabBarLabelStyle: {
                        fontSize: 12, // Optional: Adjust font size
                    },
                    // Define icons with manual color changes
                    tabBarIcon: ({ focused, size }) => {
                        let iconName;
                        let iconColor = focused ? '#6db432' : 'gray'; // Green for active, gray for inactive

                        if (route.name === 'Orders') {
                            iconName = 'cart-shopping';
                        } else if (route.name === 'Inventory') {
                            iconName = 'cubes-stacked';
                        } else if (route.name === 'Transaction') {
                            iconName = 'money-bill-trend-up';
                        } else if (route.name === 'Profile') {
                            iconName = 'chalkboard-user';
                        }

                        return <FontAwesome name={iconName} color={iconColor} size={size} />;
                    },
                    // Label color based on focus
                    tabBarLabelStyle: {
                        color: (focused) => (focused ? '#6db432' : 'gray'),
                    },
                })}
            >
                <Tab.Screen name="Orders" component={OrderPage} options={{ headerShown: false }} />
                <Tab.Screen name="Inventory" component={ProductPage} options={{ headerShown: false }} />
                <Tab.Screen name="Transaction" component={TransactionPage} options={{ headerShown: false }} />
                <Tab.Screen name="Profile" component={Setting} options={{ headerShown: false }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Tabs;
