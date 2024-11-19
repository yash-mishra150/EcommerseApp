import React from 'react';
import { TouchableOpacity, Image, FlatList, Text, View, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { height, width } = Dimensions.get('window');

const ShoesGrid = ({ Shoes, navigation }) => {

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Shoes', { item })}
      style={{
        backgroundColor: 'white',
        height: height * 0.35,
        width: width * 0.44,
        padding: 12,
        margin: 8,
        marginLeft: 0,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 5,
      }}
    >
      <Image
        source={{ uri: item.productCategory.pictureUrl }}
        style={{
          height: '60%',
          width: '100%',
          borderRadius: 10,
        }}
        resizeMode="cover"
      />
      <Text
        style={{
          fontFamily: 'Poppins-SemiBold',
          fontSize: 16,
          color: 'black',
          marginTop: 10,
        }}
      >
        {item.productName}
      </Text>
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: 14,
          color: '#6c757d',
          marginTop: 4,
        }}
      >
        {item.productCategory.category}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 16,
            color: 'black',
            marginLeft: 8,
            marginTop: 2,
          }}
        >
          &#8377;{(item.allProducts[0]?.productPrice * 80).toFixed(2)}
        </Text>
        {/* <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          {item.allProducts.map((colorItem, index) => {
            let color = colorItem.attributeCombination.toLowerCase();

            if (color === 'multi-color') {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    borderRadius: 16,
                    height: 20,
                    width: 20,
                    marginRight: 8,
                    borderWidth: 1,
                    borderColor: '#ddd', // Light border around colors
                  }}
                >
                  <LinearGradient
                    colors={['#FF6347', '#FFD700', '#00BFFF']}
                    style={{
                      flex: 1,
                      borderRadius: 16,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                </TouchableOpacity>
              );
            }

            return (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: color,
                  height: 24,
                  width: 24,
                  borderRadius: 12,
                  marginRight: 8,
                  borderWidth: 1,
                  borderColor: '#ddd', // Border around color options
                }}
              />
            );
          })}
        </View> */}


      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={Shoes}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      contentContainerStyle={{
        paddingHorizontal: 10,
        paddingTop: 10,
      }}
    />
  );
};

export default ShoesGrid;
