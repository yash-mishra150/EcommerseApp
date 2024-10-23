import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

const HomePage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>HomePage</Text>
            <Image 
                source={{ uri: 'https://assets.ajio.com/medias/sys_master/root/20201006/Euhk/5f7b6fbdf997dd8c83583fdd/-473Wx593H-460739673-blue-MODEL.jpg' }} 
                style={styles.image} 
                resizeMode="contain" // Adjusts the image to maintain aspect ratio
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // Background color to match your palette
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333', // Change color as needed
    },
    image: {
        width: 200, // Adjust width as needed
        height: 200, // Adjust height as needed
        borderRadius: 10, // Optional: adds rounded corners
    },
});

export default HomePage;
