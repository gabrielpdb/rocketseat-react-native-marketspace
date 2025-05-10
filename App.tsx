import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts,
} from "@expo-google-fonts/karla"
import { GluestackUIProvider, Text } from "@gluestack-ui/themed"
import { config } from "./config/gluestack-ui.config"
import { StatusBar } from "react-native"
export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold })
  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"transparent"}
        translucent
      />
      {fontsLoaded ? <Text>Foi</Text> : <Text>Não foi</Text>}
    </GluestackUIProvider>
  )
}
