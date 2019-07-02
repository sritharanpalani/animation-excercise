import React, {Component} from 'react';
import { 
  View,
} from 'react-native';
import Animated from "react-native-reanimated";
import Content from './Content';
import Preview from './Prev';
import SharedElement from './SharedElement';
const { Value } = Animated;

export default () =>  {

  const y = new Value(0);
    return (
      <View style={{ flex: 1 }}>
        {/* <Content {...{y}} /> */}
        {/* <Preview /> */}
        <SharedElement />
      </View>
    );
}
