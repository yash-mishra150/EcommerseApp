import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StarterPage from '../pages/auth/StarterPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import OTPVerify from '../components/OTPVerify';
import RegisterForm from '../components/RegisterForm';
import { useTheme } from 'react-native-paper';
import HomePage from '../pages/OtherPages/HomePage';


const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const Tabs = () => {
  const { colors, dark } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'rgb(23 23 23)', // Dark background color
          elevation: 0,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15, // Rounded corners
          position: 'relative',
          shadowOpacity: 0, // Removes shadow on iOS
          height: 70, // Adjust height
          paddingBottom: 10, // Padding to the bottom
          paddingTop: 10,
          borderTopWidth: 1,
          borderColor: 'black',
        },
        tabBarLabelStyle: {
          color: 'white', // Text color of the tab labels
          fontSize: 12, // Adjust font size
        },
        tabBarIconStyle: {
          color: 'white', // Color of the icons
          size: 20, // Adjust icon size
        },
        tabBarActiveTintColor: 'white', // Active icon/text color
        tabBarInactiveTintColor: 'gray', // Inactive icon/text color
      }}
    >
      <Tab.Screen
        name="Orders"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cart-shopping" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Starter"
          component={StarterPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTP"
          component={OTPVerify}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ShopRegister"
          component={RegisterForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
      
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}
