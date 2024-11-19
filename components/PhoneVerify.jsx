import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');

const PhoneVerify = ({handle, setemail}) => {
  const navigation = useNavigation();
  const [Phone, setPhone] = useState('');
  const [Error, setError] = useState('');
  const [Loading, setLoading] = useState(false);

  const SendOTP = async () => {
    setLoading(true);
    try {
      if (!Phone) {
        setError('Please enter your phone number');
      }
      const response = await axios.post(
        'https://foodappbackend-chw3.onrender.com/api/eVerify/send-otp',
        {
          email: Phone,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            api_key: 'f2d9c3e5b28347763fcb57db43a24bca',
          },
        },
      );

      console.log(response.data);
      setemail(Phone);
      handle();
      
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data) {
        setError(error.response.data.message)
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text
        style={{fontFamily: 'Poppins-Medium', fontSize: 16, color: 'black'}}>
        What’s your email?
      </Text>
      <Text
        style={{
          marginTop: 2,
          fontFamily: 'Poppins-Medium',
          fontSize: 14,
          color: '#6B7280',
        }}>
        A code will be sent to verify your email
      </Text>
      <TextInput
        mode="outlined"
        label="Email"
        textColor="black"
        value={Phone}
        onChangeText={text => setPhone(text)}
        keyboardType="phone-pad"
        style={{
          marginTop: 16,
          width: width * 0.85,
          backgroundColor: 'white',
          color: 'black',
          borderRadius: 8,
        }}
        theme={{
          colors: {primary: 'black', placeholder: 'black', text: 'black'},
        }}
      />
      {Error && <Text className="text-red-600 mt-5 text-center">{Error}</Text>}
      <TouchableOpacity
        style={{
          marginTop: Error? height * 0.455: height * 0.5,
          backgroundColor: 'black',
          height: height * 0.065,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 12,
          paddingHorizontal: 16,
        }}
        onPress={() => SendOTP()}
        activeOpacity={0.8}>
        {Loading ? (
          <LottieView
            source={require('../assets/Images/loading.json')}
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
            Send OTP
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default PhoneVerify;
