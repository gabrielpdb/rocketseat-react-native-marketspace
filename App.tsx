import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts,
} from "@expo-google-fonts/karla"
import { GluestackUIProvider, Text } from "@gluestack-ui/themed"
import { config } from "./config/gluestack-ui.config"
import { StatusBar } from "react-native"
import { Loading } from "@components/Loading"
import { Routes } from "@routes/index"
export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold })

  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </GluestackUIProvider>
  )
}
