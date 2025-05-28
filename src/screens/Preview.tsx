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
import { useNavigation, useRoute } from "@react-navigation/native"
import { Dimensions } from "react-native"
import Carousel from "react-native-reanimated-carousel"
import { PhotoProps } from "./Create"
import { UserPhoto } from "@components/UserPhoto"
import { useAuth } from "@hooks/useAuth"
import { api } from "@services/api"
import { Heading } from "@gluestack-ui/themed"
import {
  ArrowLeft,
  Bank,
  Barcode,
  CreditCard,
  IconProps,
  Money,
  QrCode,
  Tag,
} from "phosphor-react-native"
import { Button } from "@components/Button"
import { useState } from "react"
import { AppNavigatorRoutesProps } from "@routes/app.routes"

const width = Dimensions.get("window").width

type RouteParamsProps = {
  product: ProductDTO
  photos: PhotoProps[]
}

export function Preview() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const route = useRoute()
  const { photos, product } = route.params as RouteParamsProps
  const { accept_trade, description, is_new, name, payment_methods, price } =
    product

  function goBack() {
    navigation.navigate("create", { product: product, images: photos })
  }

  async function handleCreate() {
    try {
      setIsLoading(true)

      const response = await api.post("/products", {
        name,
        description,
        is_new,
        price,
        accept_trade,
        payment_methods,
      })

      if (response.data.id) {
        const formData = new FormData()

        formData.append("product_id", response.data.id)
        photos.forEach((photo, index) => {
          formData.append("images", photo as any)
        })

        await api.post("/products/images", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      navigation.navigate("home")
    }
  }

  return (
    <VStack flex={1}>
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
      <ScrollView mb={"$32"}>
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
              mb={"$2"}
            >
              <Text
                fontFamily="$heading"
                fontSize={"$2xs"}
                style={{ textTransform: "uppercase" }}
              >
                {is_new ? "Novo" : "Usado"}
              </Text>
            </Box>
            <HStack justifyContent="space-between" alignItems="center">
              <Heading fontSize={"$xl"}>{name}</Heading>
              <Heading
                color="$blueLight"
                fontFamily="$heading"
                fontSize={"$xl"}
              >
                <Text color="$blueLight" fontFamily="$heading" fontSize={"$sm"}>
                  R$
                </Text>{" "}
                {price.toFixed(2).replace(".", ",")}
              </Heading>
            </HStack>
            <Text fontFamily="$body" fontSize={"$sm"}>
              {description}
            </Text>
          </VStack>
          <VStack>
            <HStack alignItems="center" space="sm">
              <Heading fontSize={"$sm"}>Aceita troca?</Heading>
              <Text fontSize={"$sm"}>{accept_trade ? "Sim" : "Não"}</Text>
            </HStack>
            <VStack>
              <Heading fontSize={"$sm"}>Meios de pagamento</Heading>
              {payment_methods.length > 0 && (
                <FlatList
                  overflow="hidden"
                  scrollEnabled={false}
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
                      <HStack alignItems="center" space="sm">
                        <Icon size={20} weight="regular" />
                        <Text color="$gray2" fontSize={"$sm"}>
                          {text}
                        </Text>
                      </HStack>
                    )
                  }}
                />
              )}
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
      <HStack
        w={"$full"}
        h={"$24"}
        px={"$6"}
        pt={"$5"}
        pb={"$24"}
        bg="$gray7"
        space="md"
        position="absolute"
        bottom={0}
      >
        <Button
          title="Voltar e editar"
          themeVariant="grayScale"
          width={"auto"}
          flex={1}
          icon={ArrowLeft}
          onPress={goBack}
        />
        <Button
          icon={Tag}
          title="Publicar"
          themeVariant="default"
          width={"auto"}
          flex={1}
          onPress={handleCreate}
          isLoading={isLoading}
        />
      </HStack>
    </VStack>
  )
}
