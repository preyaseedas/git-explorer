import React from 'react';
import {View, Dimensions, ViewStyle, StyleSheet} from 'react-native';

const DashedLine = ({
  color,
  width,
  dashWidth = 3,
  gapWidth = 2,
  height = 1,
  containerStyle,
}) => {
  // Calculate number of dashes to fill the container
  const calcWidth = width || Dimensions.get('window').width - 30;
  const numberOfDashes = Math.ceil(calcWidth / (dashWidth + gapWidth));

  return (
    <View style={[styles.container, {width: width || '100%'}, containerStyle]}>
      {Array.from({length: numberOfDashes}).map((_, index) => (
        <View
          key={index}
          style={{
            width: dashWidth,
            height,
            backgroundColor: color,
            marginRight: gapWidth,
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default DashedLine;
