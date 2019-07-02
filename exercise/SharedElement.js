import React from 'react';
import { 
  StyleSheet, 
  View, 
  Image, 
  Platform, 
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Text
} from 'react-native';
import {
  loremIpsum
} from "lorem-ipsum";

var images = [
  {id: 1, src: require('./assets/171344f3c53ab25e20e39e74cad5113c.jpg')},
  {id: 2, src: require('./assets/Samsung-Twilight-iPhone-Wallpaper.jpg')},
  {id: 3, src: require('./assets/abstract_water_1920x1200.jpg')},
]

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

type Props = {};

export default class SharedElement extends React.PureComponent<Props> {

  constructor() {
    super()
    this.state = {
      activeImage: null,
    }
  }

  componentWillMount() {
    this.allImages = {}
    this.oldPosition = {}
    this.position = new Animated.ValueXY();
    this.dimension = new Animated.ValueXY();
    this.animation = new Animated.Value(0);

  }

  openImage = (index) => {
    this.allImages[index].measure((x,y,width,height,pageX,pageY) => {
      this.oldPosition.x = pageX;
      this.oldPosition.y = pageY;
      this.oldPosition.width = width;
      this.oldPosition.height = height;


       this.position.setValue({
         x: pageX,
         y: pageY,
       })

       this.dimension.setValue({
         x: width,
         y: height
       })

       this.setState({ activeImage: images[index] }, () => {
         this.viewImage.measure((dx,dy,dWidth,dHeight,dPageX,dPageY) => {
           Animated.parallel([
             Animated.timing(this.position.x, {
               toValue: dPageX,
               duration: 300,
             }),
             Animated.timing(this.position.y, {
               toValue: dPageY,
               duration: 300,
             }),
             Animated.timing(this.dimension.x, {
               toValue: dWidth,
               duration: 300,
             }),
             Animated.timing(this.dimension.y, {
               toValue: dHeight - 200,
               duration: 300,
             }),
             Animated.timing(this.animation, {
               toValue: 1,
               duration: 300,
             })
           ]).start()
         })
       })

    })
  }


  closeImage = () => {
    Animated.parallel([
      Animated.timing(this.position.x, {
        toValue: this.oldPosition.x,
        duration: 300,
      }),
      Animated.timing(this.position.y, {
        toValue: this.oldPosition.y,
        duration: 300,
      }),
      Animated.timing(this.dimension.x, {
        toValue: this.oldPosition.width,
        duration: 300,
      }),
      Animated.timing(this.dimension.y, {
        toValue: this.oldPosition.height,
        duration: 300,
      }),
      Animated.timing(this.animation, {
        toValue: 0,
        duration: 300,
      })
    ]).start(() => {
      this.setState({ activeImage: null })
    })
  }

  render() {

    const activeImageStyle = {
      width: this.dimension.x,
      height: this.dimension.y,
      left: this.position.x,
      top: this.position.y,
    }


    const animatedContentY = this.animation.interpolate({
      inputRange: [0,1],
      outputRange: [-150, 0],
    });

    

    const animatedContentOpacity = this.animation.interpolate({
      inputRange: [0,0.5,1],
      outputRange:[0,1,1],
    })

    const animatedContentStyle = {
      opacity: animatedContentOpacity,
      transform: [{
        translateY: animatedContentY
      }],
    }

    const animatedCrossOpacity = this.animation.interpolate({
      inputRange: [0,1],
      outputRange: [0,1],
    })

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          {
            images.map((image, index) => {
              return (
                <TouchableWithoutFeedback 
                  key={image.id}
                  onPress={() => this.openImage(index)}
                >
                  <Animated.View
                    style={{ height: screenHeight - 150, width: screenWidth, padding: 15 }}
                  >
                    <Image 
                      ref={(image) => (this.allImages[index] = image)}
                      source={image.src} 
                      style={{ flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 20 }}  
                    />
                  </Animated.View>
                </TouchableWithoutFeedback>
                
              )
            })
          }
        </ScrollView>
        <View 
          style={StyleSheet.absoluteFill}
          pointerEvents={this.state.activeImage ? 'auto' : 'none' }
          ref={(view) => (this.viewImage = view)}
        >
          <View style={{ flex: 2 }}>
            <Animated.Image
              source={this.state.activeImage ? this.state.activeImage.src : null}
              style={[{ resizeMode: 'cover', zIndex: 1001,width: null, height: null, top: 0, left: 0}, activeImageStyle]}
            >
            </Animated.Image>
            <TouchableWithoutFeedback
              onPress={() => this.closeImage()}
            >
              <Animated.View style={{position: 'absolute', zIndex: 1004  ,top: 30, right: 30, opacity: animatedCrossOpacity }}>
                <Text style={{fontSize: 24, fontWeight: '500', color: 'white'}}>X</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
          <Animated.View style={[{ style: 1,zIndex: 1000 , backgroundColor: 'white', padding: 20, paddingTop: 50 }, animatedContentStyle]}>
            <Text style={{ fontSize: 24, paddingBottom: 10 }}>Sritharan Sample Text</Text>
            <Text>Quis esse deserunt labore do esse aliquip duis ea reprehenderit. Dolore culpa nulla sint aliquip enim. Veniam Lorem veniam laborum duis pariatur incididunt commodo anim aute adipisicing Lorem tempor. Ut nostrud quis aliquip anim mollit mollit ex officia esse eu.</Text>
          </Animated.View>

        </View>
      </SafeAreaView>
    );
  }
}