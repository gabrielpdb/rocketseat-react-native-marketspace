import { Box, Heading, HStack, Text, VStack } from "@gluestack-ui/themed"
import { UserPhoto } from "./UserPhoto"
import { useAuth } from "@hooks/useAuth"
import { Button } from "./Button"
import { api } from "@services/api"
import defaultUserPhotoImg from "@assets/Avatar.png"
import { Plus } from "phosphor-react-native"
import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "@routes/app.routes"

export function HomeHeader({ ...rest }) {
  const { user } = useAuth()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleNavigateCreate() {
    navigation.navigate("create", {})
  }

  return (
    <HStack
      pt={"$16"}
      space="md"
      alignItems="center"
      justifyContent="space-between"
      {...rest}
    >
      <HStack flex={1} gap={"10"} alignItems="center">
        <UserPhoto alt="Imagem do usuário" width={45} />
        <VStack>
          <Text>Boas vindas,</Text>
          <Heading>{user.name}!</Heading>
        </VStack>
      </HStack>
      <Button
        icon={Plus}
        w={"auto"}
        maxWidth={"50%"}
        h={"$full"}
        title="Criar anúncio"
        themeVariant="dark"
        onPress={handleNavigateCreate}
      />
    </HStack>
  )
}
