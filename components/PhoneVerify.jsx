import { View, Text, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const PhoneVerify = ({ handle }) => {
    const navigation = useNavigation();
    const [Phone, setPhone] = useState('');

    return (
        <View>
            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 16, color: 'black' }}>
                What’s your phone number?
            </Text>
            <Text style={{ marginTop: 2, fontFamily: 'Poppins-Medium', fontSize: 14, color: '#6B7280' }}>
                A code will be sent to verify your phone number
            </Text>
            <TextInput
                mode='outlined'
                label="Phone Number"
                textColor='black'
                value={Phone}
                onChangeText={(text) => setPhone(text)}
                keyboardType='phone-pad'
                style={{ marginTop: 16, width: width*0.85, backgroundColor: 'white', color: 'black', borderRadius: 8 }}
                theme={{ colors: { primary: 'black', placeholder: 'black', text: 'black' } }}
            />
            <Button
                style={{ marginTop: height * 0.5, backgroundColor: 'black', height: height * 0.065 }}
                mode="outlined"
                className="pt-1.5 rounded-xl"
                labelStyle={{ color: 'white' }}
                onPress={() => handle()}
            // Disable button if sign-in is in progress or user is signed in
            >
                <Text style={{ fontFamily: 'Poppins-Medium', color: 'white' }} className='text-xl'>Send OTP</Text>
            </Button>
        </View>
    );
};

export default PhoneVerify;
