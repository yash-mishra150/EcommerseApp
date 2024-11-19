import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ProgressBar} from 'react-native-paper';
import PhoneVerify from '../../components/PhoneVerify'; // Ensure ManualVerify is imported correctly
import OTPVerify from '../../components/OTPVerify';
import RegisterForm from '../../components/RegisterForm';
import ManualVerify from '../../components/ManualVerify'; // Ensure ManualVerify component is correctly implemented
import PasswordCreate from '../../components/PasswordCreate'; // Ensure PasswordCreate component is correctly implemented

const {height} = Dimensions.get('window');

const RegisterPage = () => {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);
  const [email, setemail] = useState('');
  const [step, setStep] = useState(0); // 0: PhoneVerify, 1: OTPVerify, 2: RegisterForm, 3: ManualRegister, 4: PasswordCreate

  const handleVerify = () => {
    setProgress(0.33);
    setStep(1); // Move to OTPVerify
  };

  const handleOTPVerify = () => {
    setProgress(0.6);
    setStep(2); // Move to RegisterForm
  };

  const handleRegister = () => {
    setProgress(1);
    setStep(3); // Move to ManualRegister
  };

  return (
    <View
      style={{flex: 1, padding: 16, paddingTop: 32, backgroundColor: 'white'}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Starter')}>
          <Icon name="arrow-left" size={25} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            marginLeft: height * 0.03,
            marginTop: 8,
            fontSize: 18,
            color: 'black',
          }}>
          Create an Account
        </Text>
      </View>

      <View style={{marginTop: height * 0.05, width: '100%'}}>
        <ProgressBar
          progress={progress}
          color="black"
          style={{backgroundColor: '#d3d3d3'}}
        />
      </View>

      <View
        style={{marginTop: height * 0.05, width: '100%', alignItems: 'center'}}>
        {step === 0 && <PhoneVerify setemail={setemail} handle={handleVerify} />}
        {step === 1 && <OTPVerify email={email} handle={handleOTPVerify} />}
        {step === 2 && <RegisterForm Email={email} handle={handleRegister} />}
        {step === 3 && <ManualVerify />}
      </View>
    </View>
  );
};

export default RegisterPage;
