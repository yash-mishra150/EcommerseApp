import { View, Text, Image, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-paper';
// import { 
//     GoogleSignin, 
//     GoogleSigninButton, 
//     statusCodes 
// } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const StarterPage = () => {
    const [user, setUser] = useState(null);
    const [isSigningIn, setIsSigningIn] = useState(false);

    // useEffect(() => {
    //     GoogleSignin.configure({
    //         webClientId: '32973425102-cogbn812bp41qf9t3rnp505gnqrj2utl.apps.googleusercontent.com', // Replace with your actual web client ID
    //         offlineAccess: true,
    //     });
    // }, []);

    // const signIn = async () => {
    //     if (isSigningIn) {
    //         // Prevent sign-in if a sign-in is already in progress
    //         return;
    //     }

    //     setIsSigningIn(true);
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         const response = await GoogleSignin.signIn();
    //         setUser(response); // Set the user info directly
    //         console.log('User Info:', response);
    //     } catch (error) {
    //         switch (error.code) {
    //             case statusCodes.SIGN_IN_CANCELLED:
    //                 console.log('User cancelled the login process');
    //                 break;
    //             case statusCodes.IN_PROGRESS:
    //                 console.log('Operation (e.g. sign in) is in progress');
    //                 break;
    //             case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
    //                 console.log('Play services not available or outdated');
    //                 break;
    //             default:
    //                 console.error('Some other error occurred:', error);
    //         }
    //     } finally {
    //         setIsSigningIn(false); // Ensure the state is reset after operation
    //     }
    // };
    const navigation = useNavigation();
    return (
        <View className="flex items-center justify-center flex-1 p-4">
            <Image source={require('../../assets/Images/logo.png')} style={{height: height*0.15, width: width*0.9}} />
            <Text style={{ fontFamily: 'Poppins-Medium' }} className="text-center text-neutral-500">
                Experience business sales on another level with Kicks, your market-friendly app
            </Text>

            <View style={{ marginTop: height * 0.07 }}>
                {/* Google Sign-In Button */}
                {/* <GoogleSigninButton
                    style={{ width: width * 0.9, height: height * 0.065, borderRadius: 50 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={signIn}
                    disabled={isSigningIn || user !== null} // Disable button if sign-in is in progress or user is already signed in
                /> */}
                
                {/* Get Started Button (Outlined) */}
                <Button
                    style={{ marginTop: height * 0.02, borderColor: 'black', borderWidth: 1, height: height * 0.065, width: width*0.9 }}
                    mode="outlined"
                    className="pt-2"
                    labelStyle={{ color: 'black' }}
                    onPress={() => navigation.navigate('Register')}
                     // Disable button if sign-in is in progress or user is signed in
                >
                    <Text style={{ fontSize: 20, color: 'black' }}>Sign Up</Text>
                </Button>

                {/* Get Started Button (Contained) */}
                <Button
                    style={{ marginTop: height * 0.02, backgroundColor: 'black', height: height * 0.065 }}
                    mode="contained"
                    className="pt-2"
                    labelStyle={{ color: 'white' }}
                    onPress={() => navigation.navigate('Login')}
                    // Disable button if sign-in is in progress or user is signed in
                >
                    <Text style={{ fontSize: 20, color: 'white' }}>Sign In</Text>
                </Button>
            </View>

            <View style={{ marginTop: height * 0.1 }}>
                <Text style={{ fontFamily: 'Poppins-Medium' }} className="text-xs text-center text-neutral-500">
                    By continuing, you agree to Kicks's{' '}
                    <Text className="text-red-600">Terms & Conditions</Text> and{' '}
                    <Text className="text-red-600">Privacy Policy</Text>
                </Text>
            </View>
        </View>
    );
};

export default StarterPage;
