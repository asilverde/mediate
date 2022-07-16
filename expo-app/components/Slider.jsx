import React, {useState, useEffect, useRef} from 'react'
import {StyleSheet, View, Animated} from 'react-native';

export default function Slider() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isInhaling, setIsInhaling] = useState(true);
  const translation = useRef(new Animated.Value(225)).current

  const calcRadialDist = (x_dist, y_dist) => {
    return Math.sqrt(Math.pow(x_dist, 2) + Math.pow(y_dist, 2))
  }

  const startBreathing = () => {
    setIsFollowing(true);
  }
  const stopBreathing = () => {
    setIsFollowing(false);
  }

  const styles = StyleSheet.create({
    button: {
      width: 150,
      height: 150,
      borderRadius: 100,
      backgroundColor: isFollowing ? 'green' : 'red',
      transform: [{translateY:translation}]
    },
    touch: {
        width: 150,
        height: 150,
        borderRadius: 100,
        backgroundColor: isFollowing ? 'green' : 'red'
    },
  });

  useEffect(() => {
    const target = (-1 * (isInhaling * 450 - 225));
    Animated.timing(translation, {
        toValue: target,
        useNativeDriver: false,
        duration: 5000,
    }).start(({hold}) => {
        if (hold) {
            setIsInhaling(!isInhaling);
        }
    })
  }, [isInhaling]);

  return (
    <Animated.View style = {styles.button}>
        <View
        style = {styles.touch}
        onStartShouldSetResponder={() => true}
        onResponderMove={(event) => {
            radialDist = calcRadialDist(event.nativeEvent.locationX + 50, event.nativeEvent.locationY - 50)
            if (radialDist > 75) {
                stopBreathing();
            } else {
                startBreathing();
            }
        }}
        onResponderRelease={() => {
            stopBreathing();
        }}>
        </View>
    </Animated.View>
  );
}