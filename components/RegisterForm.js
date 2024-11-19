// RegisterForm.js
import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import LottieView from 'lottie-react-native';

const { height, width } = Dimensions.get('window');

const RegisterForm = ({ handle, Email }) => {
  const [Name, setName] = useState('');
  const [email, setEmail] = useState(Email);
  const [phone, setphone] = useState('');
  const [password, setpassword] = useState('');
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState('');


  const HandleSubmit = async () => {
    setLoading(true);
    console.log({
      "name": Name,
      "email": email,
      "password": password,
      "phone": phone
    });

    try {
      const response = await axios.post(
        'https://foodappbackend-chw3.onrender.com/api/auth/register',
        {
          "name": Name,
          "email": email,
          "password": password,
          "phone": phone
        },
        {
          headers: {
            ContentType: 'application/json',
            Accept: 'application/json',
            api_key: 'f2d9c3e5b28347763fcb57db43a24bca',
          },
        }
      );

      handle();
      console.log(response.data);

    } catch (error) {

      console.error(
        'Error logging in:',
        error.response ? error.response.data : error.message
      );
      if (error.response.data.errors) {
        setError(error.response.data.errors[0].msg)
      } else {
        setError(error.response.data.msg)
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <View className='p-4'>
      <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 16, color: 'black' }} className='mb-4'>
        Provide the information below
      </Text>
      <TextInput
        mode='outlined'
        textColor='black'
        label="Name"
        value={Name}
        onChangeText={(text) => setName(text)}
        className='mt-4 text-black bg-white rounded-lg'
        style={{ width: width * 0.9 }}
        theme={{ colors: { primary: 'black', placeholder: 'black', text: 'black' } }}
      />
      <TextInput
        mode='outlined'
        label="Email"
        textColor='black'
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType='email-address'
        className='mt-4 text-black bg-white rounded-lg'
        style={{ width: width * 0.9 }}
        theme={{ colors: { primary: 'black', placeholder: 'black', text: 'black' } }}
      />
      <TextInput
        mode='outlined'
        label="Phone No"
        value={phone}
        onChangeText={(text) => setphone(text)}
        textColor='black'
        className='mt-4 text-black bg-white rounded-lg'
        style={{ width: width * 0.9 }}
        theme={{ colors: { primary: 'black', placeholder: 'black', text: 'black' } }}
      />
      <TextInput
        mode='outlined'
        label="Password"
        value={password}
        onChangeText={(text) => setpassword(text)}
        textColor='black'
        className='mt-4 text-black bg-white rounded-lg'
        style={{ width: width * 0.9 }}
        theme={{ colors: { primary: 'black', placeholder: 'black', text: 'black' } }}
      />
      {Error && (
        <Text className="text-red-600 mt-5 text-center">{Error}</Text>
      )}
      <TouchableOpacity
        style={{
          marginTop: height * 0.2,
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
            source={require('../assets/Images/loading.json')}
            autoPlay
            style={{ width: 50, height: 50 }}
          />
        ) : (
          <Text
            style={{
              fontSize: 18,
              lineHeight: 18 * 1.4,
              color: 'white',
              fontFamily: 'Poppins-SemiBold',
            }}>
            Continue
          </Text>
        )}
      </TouchableOpacity>

    </View>
  );
};

export default RegisterForm;
