import React, {useImperativeHandle, forwardRef, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const {height, width} = Dimensions.get('window');
const Sidebar = forwardRef(({user}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const sidebarWidth = screenWidth * 0.75; // Updated sidebar width (80% of screen)
  const animationValue = useRef(new Animated.Value(-sidebarWidth)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const openSidebar = () => {
    setIsOpen(true);
    Animated.timing(animationValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const closeSidebar = () => {
    Animated.timing(animationValue, {
      toValue: -sidebarWidth,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(overlayOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsOpen(false);
      animationValue.setValue(-sidebarWidth); // Reset position fully off-screen
    });
  };

  useImperativeHandle(ref, () => ({
    openSidebar,
    closeSidebar,
  }));

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0) {
          animationValue.setValue(Math.max(-sidebarWidth, gestureState.dx));
        }
        if (!isOpen && gestureState.dx > 0) {
          animationValue.setValue(Math.min(0, -sidebarWidth + gestureState.dx));
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (isOpen && gestureState.dx < -50) {
          closeSidebar();
        } else if (!isOpen && gestureState.dx > 50) {
          openSidebar();
        } else {
          isOpen ? openSidebar() : closeSidebar();
        }
      },
    }),
  ).current;

  return (
    <View style={{position: 'absolute', width: '100%', height: '100%'}}>
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          position: 'absolute',
          width: sidebarWidth,
          height: '100%',
          backgroundColor: 'white',
          transform: [{translateX: animationValue}],
        }}>
        <View
          style={{
            backgroundColor: '#f0f0f0',
            padding: 20,
            alignItems: 'center',
          }}>
          <Image
           source={
            user.photo
              ? {uri: user.photo}
              : require('../assets/Images/profile.jpg')
          }
            style={{
              width: 100,
              height: 100,
              borderRadius: 60,
              marginBottom: 10,
            }}
            alt="User Photo"
          />

          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Poppins-SemiBold',
              color: 'black',
            }}>
            {user.name}
          </Text>
          <Text style={{color: 'gray', fontFamily: 'Poppins-Medium'}}>
            {user.email}
          </Text>
          <Text style={{color: 'gray', fontFamily: 'Poppins-Medium'}}>
            {user.address}
          </Text>
        </View>

        <View style={{marginTop: 10, paddingHorizontal: 20}}>
          {user.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={{
                paddingVertical: 15,
                borderBottomWidth: option.direction == true ? 0 : 1,
                borderBottomColor: '#ddd',
              }}
              onPress={() => {
                option.onPress();
                closeSidebar();
              }}>
              <View
                className={`flex-row justify-between`}
                style={{
                  marginTop: option.direction == true ? height * 0.43 : '',
                }}>
                <View className="flex-row">
                  {!option.direction == true ? (
                    <FontAwesome5 name={option.icon} size={20} color="black" />
                  ) : null}
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'black',
                      marginLeft: 15,
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    {option.label}
                  </Text>
                </View>

                <MaterialIcons
                  name={
                    option.direction == true ? option.icon : 'arrow-forward-ios'
                  }
                  size={20}
                  color="black"
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {isOpen && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 0,
            left: sidebarWidth,
            width: screenWidth - sidebarWidth,
            height: '100%',
          }}
          activeOpacity={1}
          onPress={closeSidebar}>
          <Animated.View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              opacity: overlayOpacity,
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
});

export default Sidebar;
