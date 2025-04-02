import { StyleSheet } from "react-native";
import { CommonColor } from "./Color";

export const commonText = StyleSheet.create({
heading: {
    color: 'black',
    fontSize: 24,
    fontWeight: '500',
  },
  blankListText: {
    fontSize: 18,
    fontWeight: '500',
    color: CommonColor.darkColorColor,
  },
});