import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import NetInfo from '@react-native-community/netinfo';
import LottieView from 'lottie-react-native';

const {height, width} = Dimensions.get('window');
const NewStaterPage = ({navigation}) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  const handleRetry = () => {
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });
  };

  if (!isConnected) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <LottieView
          source={require('../../assets/Images/NoNetwork.json')} // Use a "No Network" animation file
          autoPlay
          loop
          style={{width: 200, height: 200}}
        />
        <Text
          style={{fontFamily: 'Poppins-SemiBold'}}
          className="text-black text-xl mt-4">
          No Internet Connection
        </Text>
        <TouchableOpacity
          onPress={handleRetry}
          className="mt-6 bg-black px-10 py-3 rounded-full">
          <Text
            style={{fontFamily: 'Poppins-SemiBold'}}
            className="text-white text-lg">
            Retry
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View className="flex-1">
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <View>
        <Image
          source={require('../../assets/Images/StaterPageImage.jpeg')}
          style={{width: width, height: height * 0.68}}
        />
        <LinearGradient
          colors={['transparent', '#f3f3f2']}
          style={{height: height * 0.1, width: width}}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          className="absolute bottom-0"
        />
      </View>
      <View className="mt-5">
        <TouchableOpacity
          style={{width: width * 0.85}}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.7}
          className="bg-black self-center justify-center h-16 rounded-3xl">
          <Text
            style={{fontFamily: 'Poppins-Medium'}}
            className="text-center text-lg text-white">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
      <View
        className="flex-row justify-around items-center mx-8"
        style={{marginTop: height * 0.03}}>
        <View
          className="bg-neutral-400"
          style={{height: 2, width: width * 0.35}}
        />
        <Text className="mx-2 text-neutral-500">OR</Text>
        <View
          className="bg-neutral-400"
          style={{height: 2, width: width * 0.35}}
        />
      </View>
      <View
        style={{marginTop: height * 0.03}}
        className="flex-row justify-around mx-5 items-center">
        <TouchableOpacity
          className="bg-white p-0.5 h-11 rounded-full "
          //   onPress={() => navigation.navigate('Login')}
        >
          <Image
            source={require('../../assets/Images/google.png')}
            style={{width: 40, height: 40}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 rounded-full"
          //   onPress={() => navigation.navigate('Login')}
        >
          <Image
            source={require('../../assets/Images/facebook.png')}
            style={{width: 40, height: 40}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-white p-0.5 h-11 rounded-full "
          //   onPress={() => navigation.navigate('Login')}
        >
          <Image
            source={require('../../assets/Images/apple.png')}
            style={{width: 40, height: 40}}
          />
        </TouchableOpacity>
      </View>
      <View className="flex-row absolute bottom-3 self-center ">
        <Text
          style={{fontFamily: 'Poppins-Medium'}}
          className="text-neutral-700 text-center">
          Don't have an account?{' '}
        </Text>
        <TouchableOpacity>
          <Text
            style={{fontFamily: 'Poppins-Bold'}}
            onPress={() => navigation.navigate('Register')}
            className="text-black text-center">
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewStaterPage;
