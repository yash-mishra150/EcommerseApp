import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ManualVerify = () => {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login');
        }, 1500);
    }, [])

    return (
        <View className='items-center' style={{ marginTop: height * 0.03 }} >
            <LottieView
                source={require('../assets/Images/checkmark-animation.json')} // Replace with your JSON file path
                autoPlay
                loop={true}
                speed={0.8}
                style={styles.animation}
            />
            <Text style={styles.header}>
                Registration Complete
            </Text>
            <Text style={styles.text}>
                You are verified and will be redirected to the login page shortly.
            </Text>
            {/* <TouchableOpacity
                style={styles.button}
                onPress={handleVerify}
            >
                <Text style={styles.buttonText}>
                    Verify
                </Text>
            </TouchableOpacity> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    animation: {
        width: 150,
        height: 150,
    },
    header: {
        marginTop: 16,
        fontSize: 18,
        fontWeight: '500',
        color: 'black',
    },
    text: {
        marginTop: 8,
        fontSize: 16,
        textAlign: 'center',
        color: '#6B7280',
    },
    button: {
        backgroundColor: 'black',
        padding: 16,
        borderRadius: 12,
        marginTop: height * 0.34,
        width: width * 0.9,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center',
    },
});

export default ManualVerify;
