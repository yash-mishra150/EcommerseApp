import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import OTPVerify from '../components/OTPVerify';
import RegisterForm from '../components/RegisterForm';
import Tabs from './Tabs';
import NewStaterPage from '../pages/auth/NewStaterPage';
import { useSession } from './SessionManager';
import ProductPage from '../pages/OtherPages/ProductPage';
import CartPage from '../pages/OtherPages/CartPage';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const { sessionToken } = useSession();
  console.log(sessionToken)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!sessionToken ? (
          <>
            <Stack.Screen
              name="Starter"
              component={NewStaterPage}
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
          </>
        ) : (
          <>
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Shoes"
              component={ProductPage}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="Cart"
              component={CartPage}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
