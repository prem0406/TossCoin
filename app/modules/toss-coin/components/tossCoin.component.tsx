import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const DURATION = 100;
const FLIP_FREQUENCY = 5;

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const TossCoinComponent = () => {
  const currentValue = useSharedValue(0);

  const headsStyle = useAnimatedStyle(() => {
    const angle = interpolate(currentValue.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateX: `${angle}deg`,
        },
      ],
    };
  });

  const tailsStyle = useAnimatedStyle(() => {
    const angle = interpolate(currentValue.value, [0, 1], [180, 0]);
    return {
      transform: [
        {
          rotateX: `${angle}deg`,
        },
      ],
    };
  });

  const onPress = () => {
    const randomNumber = randomIntFromInterval(0, 1);

    if (randomNumber === currentValue.value) {
      currentValue.value = withRepeat(
        withTiming(randomNumber ? 0 : 1, {
          duration: DURATION,
        }),
        FLIP_FREQUENCY,
        false,
        () => {
          currentValue.value = withTiming(randomNumber, {
            duration: DURATION,
          });
        },
      );

      return;
    }

    currentValue.value = withRepeat(
      withTiming(randomNumber, {
        duration: DURATION,
      }),
      FLIP_FREQUENCY,
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Animated.View style={[styles.coin, styles.heads, headsStyle]}>
          <TouchableOpacity style={styles.touchable} onPress={onPress}>
            <Text style={[styles.textStyle]}>HEAD</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.coin, styles.tails, tailsStyle]}>
          <TouchableOpacity style={styles.touchable} onPress={onPress}>
            <Text style={[styles.textStyle]}>TAIL</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      {/* <View style={styles.btnStyle}>
        <Button title="Toss" onPress={onPress} />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coin: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
  },
  heads: {backgroundColor: 'blue', zIndex: 1},
  tails: {backgroundColor: 'red', position: 'absolute'},
  textStyle: {
    color: 'white',
    fontSize: 40,
  },
  touchable: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
