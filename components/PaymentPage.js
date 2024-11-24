import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Modal,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

const paymentMethods = [
  {id: '1', name: 'Credit/Debit Card', icon: 'card'},
  {id: '2', name: 'Net Banking', icon: 'laptop'},
  {id: '3', name: 'UPI', icon: 'qr-code'},
  {id: '4', name: 'Cash on Delivery', icon: 'cash'},
];

const PaymentPage = ({navigation, route}) => {
  const {status} = route.params;
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
  });
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const generateTimeSlots = () => {
    const times = [];
    const now = moment();
    const endHourToday = moment().hour(22).minute(0);
    const startHourNextDay = moment().add(1, 'day').hour(8).minute(0);
    const endHourNextDay = moment().add(1, 'day').hour(22).minute(0);

    if (now.isBefore(endHourToday)) {
      let currentTime = now.clone();
      while (currentTime.isBefore(endHourToday)) {
        times.push(currentTime.format('h:mm A'));
        currentTime.add(1, 'hour');
      }
    }

    let currentTimeNextDay = startHourNextDay.clone();
    while (currentTimeNextDay.isBefore(endHourNextDay)) {
      times.push(currentTimeNextDay.format('h:mm A'));
      currentTimeNextDay.add(1, 'hour');
    }

    return times;
  };

  const handlePayment = async () => {
    console.log(
      'Payment processed:',
      selectedPayment,
      cardDetails,
      selectedTime,
    );
  };

  return (
    <View className="flex-1 bg-white p-5">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />

      <View className="mt-8">
        <Text
          style={{fontFamily: 'Poppins-SemiBold'}}
          className="text-lg text-black">
          Delivery to Yash Mishra
        </Text>
        <Text
          style={{fontFamily: 'Poppins-Regular'}}
          className="text-base text-black">
          qweqweqweqweqweqweqweqweqweqweqwe
        </Text>
      </View>
      <TouchableOpacity
        className={`w-full py-3 mt-8 rounded-md ${
          selectedPayment ? 'bg-black' : 'bg-gray-300'
        }`}
        onPress={handlePayment}
        disabled={!selectedPayment}>
        <Text
          style={{fontFamily: 'Poppins-SemiBold'}}
          className="text-white text-center text-lg">
          Proceed to Pay
        </Text>
      </TouchableOpacity>
      <Text
        style={{fontFamily: 'Poppins-SemiBold'}}
        className="text-lg text-black mb-4 mt-5">
        Select Payment Method
      </Text>
      <FlatList
        data={paymentMethods}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            className={`flex-row items-center p-4 border ${
              selectedPayment === item.id
                ? 'border-blue-700 bg-blue-200'
                : 'border-gray-300'
            } rounded-md mb-3`}
            onPress={() => setSelectedPayment(item.id)}>
            <Ionicons
              name={item.icon}
              size={24}
              color={selectedPayment === item.id ? '#1D4ED8' : '#000'}
            />
            <Text
              style={{fontFamily: 'Poppins-Regular'}}
              className="ml-3 text-base text-black">
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {selectedPayment === '1' && (
        <View className="">
          <TextInput
            className="border border-gray-300 rounded-md px-3 py-2 text-black"
            placeholder="Card Number"
            placeholderTextColor="#000"
            style={{fontFamily: 'Poppins-Medium'}}
            keyboardType="numeric"
            value={cardDetails.number}
            onChangeText={number => setCardDetails({...cardDetails, number})}
          />
          <View className="flex-row justify-between mt-3">
            <TextInput
              className="border border-gray-300 rounded-md px-3 py-2 text-black w-[48%]"
              placeholder="Expiry Date (MM/YY)"
              placeholderTextColor="#000"
              style={{fontFamily: 'Poppins-Medium'}}
              value={cardDetails.expiry}
              onChangeText={expiry => setCardDetails({...cardDetails, expiry})}
            />
            <TextInput
              className="border border-gray-300 rounded-md px-3 py-2 text-black w-[48%]"
              placeholder="CVV"
              placeholderTextColor="#000"
              style={{fontFamily: 'Poppins-Medium'}}
              keyboardType="numeric"
              value={cardDetails.cvv}
              onChangeText={cvv => setCardDetails({...cardDetails, cvv})}
            />
          </View>
        </View>
      )}

      {selectedPayment === '3' && (
        <View className="">
          <TextInput
            className="border border-gray-300 rounded-md px-3 py-2 text-black"
            placeholder="UPI ID"
            placeholderTextColor="#000"
            style={{fontFamily: 'Poppins-Medium'}}
            // value={cardDetails.number}
            // onChangeText={number => setCardDetails({...cardDetails, number})}
          />
        </View>
      )}
      <View
        className="my-5 rounded-md"
        // onPress={() => setTimePickerVisible(true)}
      >
        <Text
          style={{fontFamily: 'Poppins-Medium'}}
          className="text-black text-base">
          {/* {selectedTime
            ? `Selected Time: ${selectedTime}`
            : 'Select Delivery Time'} */}
          Estimated Date and Time:
        </Text>
        <Text
          style={{fontFamily: 'Poppins-Medium'}}
          className="text-black text-base">
          {/* {selectedTime
            ? `Selected Time: ${selectedTime}`
            : 'Select Delivery Time'} */}
          Monday, November 27 by 8 PM
        </Text>
      </View>

      <Modal
        visible={isTimePickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setTimePickerVisible(false)}>
        <View className="flex-1 justify-center bg-black bg-opacity-50">
          <View className="bg-white p-5 mx-5 rounded-md">
            <ScrollView>
              {generateTimeSlots().map((time, index) => (
                <TouchableOpacity
                  key={index}
                  className="py-2"
                  onPress={() => {
                    setSelectedTime(time);
                    setTimePickerVisible(false);
                  }}>
                  <Text className="text-lg text-blue-700">{time}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PaymentPage;
