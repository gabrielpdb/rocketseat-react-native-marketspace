import { Box } from "@gluestack-ui/themed"
import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { gluestackUIConfig } from "../../config/gluestack-ui.config"
import { AuthRoutes } from "./auth.routes"
import { useAuth } from "@hooks/useAuth"
import { AppRoutes } from "./app.routes"

export function Routes() {
  const { user } = useAuth()
  console.log(user.id)

  const theme = DefaultTheme
  theme.colors.background = gluestackUIConfig.tokens.colors.gray6

  return (
    <Box flex={1} bg="$gray6">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}
