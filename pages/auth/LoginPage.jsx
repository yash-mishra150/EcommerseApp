import {View, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
import React, {useState} from 'react';
import {Link, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Button, TextInput} from 'react-native-paper';
import axios from 'axios';
import LoaderKit from 'react-native-loader-kit';
import LottieView from 'lottie-react-native';

const {height, width} = Dimensions.get('window');
const LoginPage = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [Loading, setLoading] = useState(false);

  const HandleSubmit = async () => {
    setLoading(true);
    console.log({
      email: userName,
      password: Password,
    });
  
    try {
      const response = await axios.post(
        'https://foodappbackend-chw3.onrender.com/api/auth/login',
        {
          email: userName,
          password: Password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            api_key: 'f2d9c3e5b28347763fcb57db43a24bca',
          },
        }
      );
  
 
      console.log(response.data); 

    } catch (error) {

      console.error(
        'Error logging in:',
        error.response ? error.response.data : error.message
      );

    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View className="flex-1 p-4 pt-8">
      <View className="">
        <TouchableOpacity onPress={() => navigation.navigate('Starter')}>
          <Icon name="arrow-left" size={25} color="black" />
        </TouchableOpacity>
      </View>
      <View
        style={{marginTop: height * 0.1}}
        className="flex items-center justify-center">
        <Image
          source={require('../../assets/Images/logo.png')}
          style={{height: height * 0.15, width: width * 0.9}}
        />
        <View style={{marginTop: height * 0.06}} className="flex flex-col">
          <Text
            style={{fontFamily: 'Poppins-Medium'}}
            className="mt-1 ml-1 text-base text-black">
            Welcome Back,
          </Text>
          <TextInput
            textColor="black"
            mode="outlined"
            label="UserName"
            value={userName}
            onChangeText={text => setUserName(text)}
            inputStyle={{color: 'black'}}
            className="text-black bg-white rounded-xl"
            style={{width: width * 0.9}}
            outlineStyle={{borderRadius: 10}}
            theme={{colors: {primary: 'black', placeholder: 'black'}}}
          />
          <TextInput
            textColor="black"
            mode="outlined"
            label="Password"
            value={Password}
            onChangeText={text => setPassword(text)}
            inputStyle={{color: 'black'}}
            className="mt-4 text-black bg-white rounded-lg"
            style={{width: width * 0.9}}
            outlineStyle={{borderRadius: 10}}
            theme={{colors: {primary: 'black', placeholder: 'black'}}}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            className="mt-2">
            <Text
              style={{fontFamily: 'Poppins-Medium'}}
              className="text-black ml-1">
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: height * 0.22,
              backgroundColor: 'black',
              height: height * 0.065,
              alignItems: 'center',
              justifyContent: 'center', 
              borderRadius: 12, 
              paddingHorizontal: 16, 
            }}
            onPress={() => HandleSubmit()}
            activeOpacity={0.8}>
            {Loading ? (
              <LottieView
                source={require('../../assets/Images/loading.json')}
                autoPlay
                style={{width: 50, height: 50}} 
              />
            ) : (
              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 18 * 1.4,
                  color: 'white',
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Login
              </Text>
            )}
          </TouchableOpacity>

          <View className="flex flex-row items-center self-center mt-1 ml-1">
            <Text
              style={{fontFamily: 'Poppins-Medium'}}
              className="text-neutral-500">
              Don’t have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text
                style={{fontFamily: 'Poppins-Medium'}}
                className="text-neutral-800 ml-1">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;
