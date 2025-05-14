import { Button } from "@gluestack-ui/themed"
import { SignOut } from "phosphor-react-native"
import { gluestackUIConfig } from "../../config/gluestack-ui.config"
import { useAuth } from "@hooks/useAuth"

export function LogoutButton() {
  const { tokens } = gluestackUIConfig
  const { signOut } = useAuth()

  function handleLogout() {
    signOut()
  }

  return (
    <Button backgroundColor="$gray7" onPress={handleLogout}>
      <SignOut color={tokens.colors.redLight} size={24} />
    </Button>
  )
}
