import { Button, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function SignInScreen({ promptAsync }) {
  return (
    <>
      <TouchableOpacity
        style={{
          backgroundColor: "#4285F4",
          width: "93%",
          padding: 10,
          borderRadius: 15,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 15,
          marginTop: 17,
          marginBottom: 17,
        }}
        onPress={() => promptAsync()}
      >
        <AntDesign name="google" size={30} color="white" />
        <Text style={{ fontWeight: "bold", color: "white", fontSize: 17 }}>
          Iniciar con Google
        </Text>
      </TouchableOpacity>

    </>
  );
}