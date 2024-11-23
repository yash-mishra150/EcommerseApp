import React, { useImperativeHandle, forwardRef, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';

const Sidebar = forwardRef(({ user }, ref) => {
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
    })
  ).current;

  return (
    <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          position: 'absolute',
          width: sidebarWidth,
          height: '100%',
          backgroundColor: 'white',
          transform: [{ translateX: animationValue }],
        }}
      >
        <View style={{ backgroundColor: '#f0f0f0', padding: 20, alignItems: 'center' }}>
          <Image
            source={{ uri: user.photo }}
            style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 10 }}
            alt="User Photo"
          />
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{user.name}</Text>
          <Text style={{ color: 'gray', marginTop: 4 }}>{user.email}</Text>
          <Text style={{ color: 'gray', marginTop: 2 }}>{user.address}</Text>
        </View>

        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          {user.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={{
                paddingVertical: 15,
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
              }}
              onPress={() => {
                option.onPress();
                closeSidebar();
              }}
            >
              <Text style={{ fontSize: 16 }}>{option.label}</Text>
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
          onPress={closeSidebar}
        >
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