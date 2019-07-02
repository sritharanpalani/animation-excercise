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
  ScrollView,
  Animated,
} from 'react-native';
import {
  TouchableRipple,
  Text
} from 'react-native-paper';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableRipple);

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



export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.scrollY = new Animated.Value(0)
  }
  render() {

    const styles = getStyles()

    const animatedHeaderHeight = this.scrollY.interpolate({
      inputRange: [0, rangeHeight],
      outputRange: [maximumHeightOfHeader, minimumHeightOfHeader],
      extrapolate: 'clamp',
    });

    const animatedBarButtonTop = this.scrollY.interpolate({
      inputRange: [0, rangeHeight],
      outputRange: [maximumHeightOfHeader - (buttonHeight / 2), minimumHeightOfHeader - (buttonHeight / 2)],
      extrapolate: 'clamp'
    })


    return (
      <View style={styles.container}>
        <Animated.View style={{ justifyContent: 'flex-start' , backgroundColor: 'orange', width: screenWidth, height: animatedHeaderHeight }}>

        </Animated.View>
        <ScrollView 
          scrollEventThrottle={16}
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
            )
          }
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ width: screenWidth, height: 1000, marginTop: 25 }}>
            <Text style={styles.welcome}>Welcome to React Native!</Text>
            <Text style={styles.instructions}>To get started, edit App.js</Text>
            <Text style={styles.instructions}>{instructions}</Text>
          </View>
        </ScrollView>
        <AnimatedTouchable style = {[styles.button, { width: screenWidth - 100, top: animatedBarButtonTop }]}>
          <View style={styles.buttonContent}>
            <Text style={styles.text}>Study</Text>
        </View>
        </AnimatedTouchable>
      </View>
    );
  }
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
