import { Box, Heading, HStack, Text, VStack } from "@gluestack-ui/themed"
import { UserPhoto } from "./UserPhoto"
import { useAuth } from "@hooks/useAuth"
import { Button } from "./Button"
import { api } from "@services/api"
import defaultUserPhotoImg from "@assets/Avatar.png"
import { Plus } from "phosphor-react-native"

export function HomeHeader({ ...rest }) {
  const { user } = useAuth()

  return (
    <HStack
      pt={"$16"}
      space="md"
      alignItems="center"
      justifyContent="space-between"
      {...rest}
    >
      <HStack flex={1} gap={"10"} alignItems="center">
        <UserPhoto
          source={
            user.avatar
              ? { uri: `${api.defaults.baseURL}/images/${user.avatar}` }
              : defaultUserPhotoImg
          }
          alt="Imagem do usuário"
          uri={user.avatar}
          width={45}
        />
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
      />
    </HStack>
  )
}
