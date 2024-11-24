import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location'; // For fetching user's current location
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const AddAddress = () => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [marker, setMarker] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch current location
  const getCurrentLocation = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permissions are required to use this feature.');
      setLoading(false);
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setRegion({
      ...region,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setMarker({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setLoading(false);
  };

  // Reverse Geocode to get address from coordinates
  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        setAddress(data.results[0].formatted_address);
      } else {
        setAddress('Address not found');
      }
    } catch (error) {
      console.error(error);
      setAddress('Error fetching address');
    }
  };

  // Save Address to AsyncStorage
  const saveAddress = async () => {
    try {
      await AsyncStorage.setItem('userAddress', JSON.stringify({ address, marker }));
      Alert.alert('Success', 'Address saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save the address.');
    }
  };

  // Handle Modal Visibility for Confirmation
  const handleConfirmAddress = () => {
    setModalVisible(true);
  };

  // Handle Address Confirmation
  const handleAddressConfirm = () => {
    saveAddress();
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Google Places Autocomplete */}
      <GooglePlacesAutocomplete
        placeholder="Search for a place"
        onPress={(data, details = null) => {
          const { lat, lng } = details.geometry.location;
          setAddress(data.description);
          setRegion({
            ...region,
            latitude: lat,
            longitude: lng,
          });
          setMarker({ latitude: lat, longitude: lng });
        }}
        query={{
          key: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your API key
          language: 'en',
        }}
        styles={{
          container: { flex: 0 },
          textInput: styles.searchInput,
        }}
      />

      {/* Map View */}
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        onPress={(e) => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          setMarker({ latitude, longitude });
          fetchAddress(latitude, longitude);
        }}
      >
        <Marker coordinate={marker} />
      </MapView>

      {/* Current Location Button */}
      <TouchableOpacity style={styles.currentLocationButton} onPress={getCurrentLocation}>
        <Text style={styles.currentLocationText}>📍</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <TextInput
          placeholder="Enter address manually"
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />
        <Button title="Confirm Address" onPress={handleConfirmAddress} />
      </View>

      {/* Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Please confirm your address</Text>
            <Text style={styles.modalText}>Address: {address}</Text>
            <Text style={styles.modalText}>
              Location: {marker.latitude}, {marker.longitude}
            </Text>
            <MapView
              style={styles.map}
              region={{
                latitude: marker.latitude,
                longitude: marker.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker coordinate={marker} />
            </MapView>
            <View style={styles.modalButtons}>
              <Pressable style={styles.modalButton} onPress={handleAddressConfirm}>
                <Text style={styles.buttonText}>Confirm</Text>
              </Pressable>
              <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.6,
  },
  footer: {
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  currentLocationText: { fontSize: 20, color: '#007AFF' },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16 },
});

export default AddAddress;
