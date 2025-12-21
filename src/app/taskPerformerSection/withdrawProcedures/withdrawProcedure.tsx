import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { WebView } from "react-native-webview";

const WithdrawProcedure = () => {
  const { webUrl } = useLocalSearchParams<{ webUrl: string }>();
  console.log(webUrl, "this is redirect url ------------------>");

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: webUrl }}
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator size="large" style={{ flex: 1 }} />
        )}
      />
    </View>
  );
};

export default WithdrawProcedure;
