import { ButtonIcon } from "@components/ButtonIcon"
import { MyAdsList } from "@components/MyAdsList"
import {
  Box,
  Center,
  Heading,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "@routes/app.routes"
import { Plus } from "phosphor-react-native"

export function MyAds() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleNavigateCreate() {
    navigation.navigate("create", {})
  }

  return (
    <VStack px={"$6"} flex={1} height={"100%"}>
      <HStack
        mt={"$16"}
        mb={"$4"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box w={"$10"} />
        <Heading>Meus anúncios</Heading>
        <ButtonIcon
          icon={Plus}
          themeVariant="transparent"
          onPress={handleNavigateCreate}
        />
      </HStack>
      <HStack alignItems="center" justifyContent="space-between" mb={"$5"}>
        <Text>9 anúncios</Text>
        <Box width={111} h={34} bg="red"></Box>
      </HStack>

      <VStack height={"100%"} flex={1}>
        <MyAdsList />
      </VStack>
    </VStack>
  )
}
