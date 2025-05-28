import { HomeAdsInfos } from "@components/HomeAdsInfos"
import { HomeAdsList } from "@components/HomeAdsList"
import { HomeHeader } from "@components/HomeHeader"
import { Box, VStack } from "@gluestack-ui/themed"

export function Home() {
  return (
    <VStack px={"$6"}>
      <VStack space="4xl">
        <HomeHeader />
        <HomeAdsInfos />
        <HomeAdsList />
      </VStack>
    </VStack>
  )
}
