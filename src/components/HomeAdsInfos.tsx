import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed"
import { ArrowRight, Tag } from "phosphor-react-native"
import { gluestackUIConfig } from "../../config/gluestack-ui.config"
import { useCallback, useState } from "react"
import { ButtonText } from "./ButtonText"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "@routes/app.routes"
import { api } from "@services/api"

export function HomeAdsInfos({ ...rest }) {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const { tokens } = gluestackUIConfig
  const [adsCount, setAdsCount] = useState(0)

  function handleNavigateMyAds() {
    navigation.navigate("myAds")
  }

  async function fetchMyAds() {
    try {
      const { data } = await api.get("/users/products")
      let count = 0
      data.forEach((product: any) => {
        if (product.is_active) {
          count++
        }
      })

      setAdsCount(count)
    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchMyAds()
    }, [])
  )

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
