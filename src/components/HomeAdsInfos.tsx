import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed"
import { ArrowRight, Tag } from "phosphor-react-native"
import { gluestackUIConfig } from "../../config/gluestack-ui.config"
import { useState } from "react"
import { ButtonText } from "./ButtonText"
import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "@routes/app.routes"

export function HomeAdsInfos({ ...rest }) {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const { tokens } = gluestackUIConfig
  const [adsCount, setAdsCount] = useState(4)

  function handleNavigateMyAds() {
    navigation.navigate("myAds")
  }

  return (
    <VStack>
      <Text mb={"$3"}>Seus produtos anunciados para venda</Text>
      <HStack
        bg={`${tokens.colors.blueLight}19`}
        padding={"$4"}
        rounded="$md"
        alignItems="center"
        justifyContent="space-between"
        {...rest}
      >
        <HStack alignItems="center" space="md">
          <Tag />
          <VStack>
            <Heading fontSize={"$xl"} fontWeight={"$bold"}>
              {adsCount}
            </Heading>
            <Text fontSize={"$xs"}>anúncios ativos</Text>
          </VStack>
        </HStack>
        <ButtonText
          alignItems="center"
          title="Meus anúncios"
          textColor="blue"
          icon={ArrowRight}
          onPress={handleNavigateMyAds}
        />
      </HStack>
    </VStack>
  )
}
