import { Text, View } from "react-native";
import tw from "../lib/tailwind";

/* ===== Reusable Row ===== */
const InfoRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <View style={tw`flex-row justify-between py-3 border-b border-gray-200`}>
      <Text style={tw`text-gray-500 text-sm`}>{label}</Text>
      <Text style={tw`text-gray-800 font-semibold text-sm`}>{value}</Text>
    </View>
  );
};

export default InfoRow;
