/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  View, 
  Dimensions, 
} from 'react-native';
import Animated from 'react-native-reanimated';
import { onScroll } from 'react-native-redash';
import {
  TouchableRipple,
  Text
} from 'react-native-paper';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const maximumHeightOfHeader = 150;
const minimumHeightOfHeader = 80;

const rangeHeight = maximumHeightOfHeader - minimumHeightOfHeader;

const buttonHeight = 48;

const {
  interpolate, Extrapolate,
} = Animated;



export default ({ y }) => {


    const styles = getStyles()

    const animatedHeaderHeight = interpolate(y,{
      inputRange: [0, rangeHeight],
      outputRange: [maximumHeightOfHeader, minimumHeightOfHeader],
      extrapolate: Extrapolate.CLAMP,
    });

    const animatedBarButtonTop = interpolate(y,{
      inputRange: [0, rangeHeight],
      outputRange: [maximumHeightOfHeader - (buttonHeight / 2), minimumHeightOfHeader - (buttonHeight / 2)],
      extrapolate: Extrapolate.CLAMP,
    })

    const animatedWidthButton = interpolate(y, {
      inputRange: [0, rangeHeight],
      outputRange: [screenWidth - 100, screenWidth - 200],
      extrapolate: Extrapolate.CLAMP,
    })

    const animatedHeightButton = interpolate(y, {
      inputRange: [0, rangeHeight],
      outputRange: [buttonHeight, buttonHeight - 20],
      extrapolate: Extrapolate.CLAMP,
    })

    return (
      <View style={[styles.container]}>


        <Animated.ScrollView
          onScroll={onScroll({ y })}
          scrollEventThrottle={16}
          stickyHeaderIndices={[1]}
          style={{ flex: 1 }}
        >
          <View style={{ width: screenWidth, marginTop: maximumHeightOfHeader + buttonHeight + 20, height: 1000 }}>
            <Text style={styles.welcome}>Welcome to React Native!</Text>
            <Text style={styles.instructions}>To get started, edit App.js</Text>
            <Text style={styles.instructions}>{instructions}</Text>
          </View>
        </Animated.ScrollView>


        <Animated.View style = {
          {
            justifyContent: 'flex-start',
            position: 'absolute',
            backgroundColor: 'orange',
            width: screenWidth,
            height: animatedHeaderHeight,
            zIndex: 1
          }
        } >

        </Animated.View>
        
        
        <Animated.View 
          style = {
          [styles.button, {
            width: animatedWidthButton,
            top: animatedBarButtonTop,
            zIndex: 1,
          }]
          } 
        >
          <View style={styles.buttonContent}>
            <Text style={styles.text}>Study</Text>
          </View>
        </Animated.View>

        
      </View>

      
    );
}

const getStyles = () => StyleSheet.create({
  button: {
    marginHorizontal: 16,
    backgroundColor: 'rgba(0, 168, 107, 1)',
    alignSelf: 'center',
    height: buttonHeight,
    borderRadius: 15,
    elevation: 6,
    position: 'absolute',
    ...Platform.select({
      ios: {
        shadowColor: '#616161',
        shadowOffset: {
          width: 1,
          height: 1
        },
        shadowOpacity: 1,
      },
    }),
  },
  buttonContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    paddingRight: 16,
  },
  text: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
