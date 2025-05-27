import { ProductDTO } from "@dtos/ProductDTO"
import {
  Box,
  Center,
  FlatList,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed"
import { useRoute } from "@react-navigation/native"
import { Dimensions } from "react-native"
import Carousel from "react-native-reanimated-carousel"
import { PhotoProps } from "./Create"
import { UserPhoto } from "@components/UserPhoto"
import { useAuth } from "@hooks/useAuth"
import { api } from "@services/api"
import { Heading } from "@gluestack-ui/themed"
import {
  Bank,
  Barcode,
  CreditCard,
  IconProps,
  Money,
  QrCode,
} from "phosphor-react-native"

const width = Dimensions.get("window").width

type RouteParamsProps = {
  product: ProductDTO
  photos: PhotoProps[]
}

export function Preview() {
  const { user } = useAuth()

  const route = useRoute()
  const {
    photos,
    product: {
      accept_trade,
      description,
      is_new,
      name,
      payment_methods,
      price,
    },
  } = route.params as RouteParamsProps

  return (
    <VStack>
      <VStack bg="$blueLight" h="$32" pt={"$16"}>
        <Center>
          <Text color="$gray7" fontFamily="$heading" fontSize={"$md"} mb={2}>
            Pré visualização do anúncio
          </Text>
          <Text color="$gray7" fontSize={"$sm"}>
            É assim que seu produto vai aparecer!
          </Text>
        </Center>
      </VStack>
      <Center>
        <Carousel
          width={width}
          height={280}
          data={photos}
          renderItem={({ item }) => (
            <Image
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
              source={{ uri: item.uri }}
              alt={item.name}
            />
          )}
        />
      </Center>
      <VStack px={"$6"} pt={"$5"} space="3xl">
        <HStack space="sm" alignItems="center">
          <UserPhoto width={24} />
          <Text>{user.name} </Text>
        </HStack>

        <VStack>
          <Box
            py={"$0.5"}
            px={"$2"}
            bg="$gray5"
            alignSelf="flex-start"
            borderRadius={"$full"}
          >
            <Text
              fontFamily="$heading"
              fontSize={"$2xs"}
              style={{ textTransform: "uppercase" }}
            >
              {is_new ? "Novo" : "Usado"}
            </Text>
          </Box>
          <HStack>
            <Heading>{name}</Heading>
            <Heading>
              <Text>R$</Text> {price.toFixed(2).replace(".", ",")}
            </Heading>
          </HStack>
          <Text>{description}</Text>
        </VStack>
        <VStack>
          <HStack alignItems="center" space="sm">
            <Heading>Aceita troca?</Heading>
            <Text>{accept_trade ? "Sim" : "Não"}</Text>
          </HStack>
          <VStack>
            <Heading>Meios de pagamento</Heading>
            {payment_methods.length > 0 && (
              <FlatList
                gap={4}
                data={payment_methods}
                keyExtractor={(item, index) => `${item}-${index}`} // garante chave única
                renderItem={({ item }) => {
                  const method = item as string
                  const iconMap: Record<string, React.FC<IconProps>> = {
                    deposit: Bank,
                    pix: QrCode,
                    cash: Money,
                    boleto: Barcode,
                    card: CreditCard,
                  }
                  const textMap: Record<string, string> = {
                    deposit: "Depósito",
                    pix: "Pix",
                    cash: "Dinheiro",
                    boleto: "Boleto",
                    card: "Cartão de crédito",
                  }

                  const Icon = iconMap[method] || QrCode
                  const text = textMap[method] || "Outro"

                  return (
                    <HStack>
                      <Icon size={20} weight="regular" />
                      <Text color="$gray800">{text}</Text>
                    </HStack>
                  )
                }}
              />
            )}
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  )
}
