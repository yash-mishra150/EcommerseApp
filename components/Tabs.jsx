import React from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomePage from '../pages/OtherPages/HomePage';
import {useTheme} from 'react-native-paper';
import CategoryPage from '../pages/OtherPages/CategoryPage';
import FavoritePage from '../pages/OtherPages/FavoritePage';
import OrdersPage from '../pages/OtherPages/OrdersPage';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const {colors, dark} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          elevation: 0,
          backgroundColor: 'white',
          position: 'relative',
          shadowOpacity: 0, // Removes shadow on iOS
          height: 70, // Adjust height
          paddingBottom: 10, // Padding to the bottom
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins-SemiBold', // Set the font family
          color: 'black',
          fontSize: 10, // Adjust font size as needed
        },
        tabBarIconStyle: {
          color: 'black', // Color of the icons
          size: 20, // Adjust icon size
        },
        tabBarActiveTintColor: 'black', // Active icon/text color
        tabBarInactiveTintColor: 'gray', // Inactive icon/text color
      }}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'} 
              color={color}
              size={size}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular', 
                color: focused ? 'black' : 'grey', 
                fontSize: 12,
              }}>
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryPage}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <MaterialCommunityIcons
              name='hanger' 
              color={color}
              size={size}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular', 
                color: focused ? 'black' : 'grey', 
                fontSize: 12,
              }}>
              Explore
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={FavoritePage}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name={focused ? 'heart-sharp' : 'heart-outline'} // Change icon based on focus
              color={color}
              size={size}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular', // Conditional font family
                color: focused ? 'black' : 'grey', // Optional: change color based on selection
                fontSize: 12,
              }}>
              Favourite
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersPage}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) =>
            focused ? (
              <Fontisto
                name='dropbox' // Change icon based on focus
                color={color}
                size={size}
              />
            ) : (
              <SimpleLineIcons
                name='social-dropbox' // Change icon based on focus
                color={color}
                size={size}
              />
            ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular', // Conditional font family
                color: focused ? 'black' : 'grey', // Optional: change color based on selection
                fontSize: 12,
              }}>
              Orders
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default Tabs;
