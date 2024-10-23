import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const { height, width } = Dimensions.get('window');
const PasswordCreate = ({ handle }) => {
    const [OldPassword, setOldPassword] = useState('');
    const [NewPassword, setNewPassword] = useState('');
    const navigation = useNavigation();
    return (
        <View style={{ marginTop: height * 0.06 }} className=''>
            <Text style={{ fontFamily: 'Poppins-Medium' }} className='mt-1 ml-1 text-base text-black'>
                Create your password
            </Text>
            <TextInput
                textColor='black'
                mode='outlined'
                label="New Password"
                value={OldPassword}
                onChangeText={(text) => setOldPassword(text)}
                inputStyle={{ color: 'black' }}
                className='text-black bg-white rounded-lg'
                style={{ width: width * 0.9 }}
                theme={{ colors: { primary: 'black', placeholder: 'black' } }}
            />
            <TextInput
                textColor='black'
                mode='outlined'
                label="Confirm Password"
                value={NewPassword}
                onChangeText={(text) => setNewPassword(text)}
                inputStyle={{ color: 'black' }}
                className='mt-4 text-black bg-white rounded-lg'
                style={{ width: width * 0.9 }}
                theme={{ colors: { primary: 'black', placeholder: 'black' } }}
            />
            <Text style={{ fontFamily: 'Poppins-Medium' }} className='mt-3 ml-1 text-neutral-500'>
                Hint: Password should contain at least 8 characters
            </Text>
            <Button
                style={{ marginTop: height * 0.38, backgroundColor: 'black', height: height * 0.065 }}
                mode="outlined"
                className="pt-1.5 rounded-xl"
                labelStyle={{ color: 'white' }}
                onPress={() => handle()}
            >
               <Text style={{ fontFamily: 'Poppins-Medium', color: 'white' }} className='text-xl'>Continue</Text>
            </Button>
        </View>

    )
}

export default PasswordCreate