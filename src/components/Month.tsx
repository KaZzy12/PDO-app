import React from "react";
import { Text, View } from "./Themed";
import { StyleSheet } from "react-native";

export default function Month({month}: {month:string}) {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.month}>{month}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-start",
      borderBottomColor: "lightsteelblue",
	  borderBottomWidth: StyleSheet.hairlineWidth,
    },
    month: {
      fontSize: 20,
      fontWeight: "300",
      color: "#050315",
      marginBottom: 5,
    }
  });