// OTPVerify.js
import React, { useRef, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import { Button } from 'react-native-paper';
import axios from 'axios';
import LottieView from 'lottie-react-native';

const { height } = Dimensions.get('window');

const OTPVerify = ({ handle, email }) => {
  const otpInput = useRef(null);
  const [text, setText] = useState('');
  const [Loading, setLoading] = useState(false);

  const clearText = () => {
    otpInput.current?.clear();
  };

  const HandleResend = () => {
    console.log("Resend");
    clearText();
  };
  const HandleOTPCheck = async () => {
    // const otp = otpInput.current?.getText();
    console.log({
      "email": email,
      "otp": text
    });

    try {
      setLoading(true);
      const response = await axios.post(
        'https://foodappbackend-chw3.onrender.com/api/eVerify/verify-otp',
        {
          "email": email,
          "otp": text
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
      handle();
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false);
    }
  }
  const maskedEmail = email.indexOf('@') > 2
    ? '*'.repeat(email.indexOf('@') - 2) + email.slice(email.indexOf('@') - 2)
    : email;


  return (
    <View className=''>
      <Text
        style={{ fontFamily: 'Poppins-Medium', fontSize: 16, color: 'black' }}
        className='mb-2'
      >
        Enter Verification Code
      </Text>
      <Text
        style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#6B7280' }}
        className='mb-4 w-72'
      >
        Enter the 6-digit code sent to you at {maskedEmail}
      </Text>
      <OTPTextView
        ref={otpInput}
        inputCount={6}
        containerStyle={{ marginTop: height * 0.03 }}
        handleTextChange={setText}
        textInputStyle={{
          borderRadius: 10,
          borderWidth: 4,
          borderColor: '#d1d5db',
        }}
      />
      <View className='flex flex-row items-center mt-1 ml-1'>
        <Text style={{ fontFamily: 'Poppins-Medium' }} className='text-neutral-500'>
          Didn't get the code?
        </Text>
        <TouchableOpacity onPress={() => HandleResend()}>
          <Text style={{ fontFamily: 'Poppins-Medium' }} className='text-black ml-1'>
            Resend
          </Text>
        </TouchableOpacity>
      </View>
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
        onPress={() => HandleOTPCheck()}
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
            Verify OTP
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default OTPVerify;
