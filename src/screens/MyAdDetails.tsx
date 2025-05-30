import { ProductDTO, ProductImagesDTO } from "@dtos/ProductDTO"
import {
  Box,
  Center,
  FlatList,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
  Heading,
} from "@gluestack-ui/themed"
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native"
import { Dimensions, Linking } from "react-native"
import Carousel from "react-native-reanimated-carousel"
import { UserPhoto } from "@components/UserPhoto"
import { useAuth } from "@hooks/useAuth"
import { api } from "@services/api"
import {
  ArrowLeft,
  Bank,
  Barcode,
  CreditCard,
  IconProps,
  Money,
  Power,
  QrCode,
  Tag,
  Trash,
  WhatsappLogo,
} from "phosphor-react-native"
import { Button } from "@components/Button"
import { useCallback, useState } from "react"
import { AppNavigatorRoutesProps } from "@routes/app.routes"
import { ButtonIcon } from "@components/ButtonIcon"
import { Loading } from "@components/Loading"

const width = Dimensions.get("window").width

type RouteParamsProps = {
  id: string
}

type PaymentMethodsProps = { key: string; name: string }

type ProductProps = ProductDTO & {
  user: { avatar: string; name: string; tel: string }
  payment_methods: PaymentMethodsProps[]
}

export function MyAdDetails() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const [product, setProduct] = useState<ProductProps>({} as ProductProps)
  const [photos, setPhotos] = useState<ProductImagesDTO[]>(
    [] as ProductImagesDTO[]
  )

  const route = useRoute()
  const { id } = route.params as RouteParamsProps

  function handleGoBack() {
    navigation.goBack()
  }

  async function fetchProduct() {
    try {
      setIsLoading(true)
      setPhotos([])
      setProduct({} as ProductProps)
      const { data } = await api.get(`/products/${id}`)

      setProduct(data)

      setPhotos(data.product_images)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGoToWhatsapp() {
    Linking.openURL(
      `https://wa.me/${product.user.tel}?text=Tenho%20interesse%20no%20${product.name}%20anunciado%20no%20Marketspace`
    )
  }

  useFocusEffect(
    useCallback(() => {
      fetchProduct()
    }, [id])
  )

  return (
    <VStack>
      <HStack px={"$6"} mt={"$16"} mb={"$4"}>
        <Center>
          <ButtonIcon
            icon={ArrowLeft}
            themeVariant="transparent"
            onPress={handleGoBack}
          />
        </Center>
      </HStack>
      {isLoading ? (
        <Center>
          <Loading />
        </Center>
      ) : (
        <VStack>
          {photos.length == 0 ? (
            <Center>
              <Loading />
            </Center>
          ) : (
            <Carousel
              width={width}
              height={280}
              data={photos}
              renderItem={({ item }) => (
                <Image
                  resizeMode="cover"
                  style={{ width: "100%", height: "100%" }}
                  source={{
                    uri: `${api.defaults.baseURL}/images/${item.path}`,
                  }}
                  alt={item.id}
                />
              )}
            />
          )}
          <ScrollView mb={"$32"}>
            <VStack px={"$6"} pt="$5" space="3xl">
              <HStack space="sm" alignItems="center">
                <UserPhoto avatar={product.user.avatar} width={24} />
                <Text>{product.user.name} </Text>
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
                    {product.is_new ? "Novo" : "Usado"}
                  </Text>
                </Box>
                <HStack justifyContent="space-between" alignItems="center">
                  <Heading fontSize={"$xl"}>{product.name}</Heading>
                  <Heading
                    color="$blueLight"
                    fontFamily="$heading"
                    fontSize={"$xl"}
                  >
                    <Text
                      color="$blueLight"
                      fontFamily="$heading"
                      fontSize={"$sm"}
                    >
                      {"R$ "}
                    </Text>
                    {product.price.toFixed(2).replace(".", ",")}
                  </Heading>
                </HStack>

                <Text fontFamily="$body" fontSize={"$sm"}>
                  {product.description}
                </Text>
              </VStack>
              <VStack>
                <HStack alignItems="center" space="sm">
                  <Heading fontSize={"$sm"}>Aceita troca?</Heading>
                  <Text fontSize={"$sm"}>
                    {product.accept_trade ? "Sim" : "Não"}
                  </Text>
                </HStack>
                <VStack>
                  <Heading fontSize={"$sm"}>Meios de pagamento</Heading>
                  {product.payment_methods.length > 0 && (
                    <FlatList
                      overflow="hidden"
                      scrollEnabled={false}
                      gap={4}
                      data={product.payment_methods}
                      keyExtractor={(item, index) => `${item}-${index}`} // garante chave única
                      renderItem={({ item }: any) => {
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

                        const Icon = iconMap[item.key] || QrCode

                        return (
                          <HStack alignItems="center" space="sm">
                            <Icon size={20} weight="regular" />
                            <Text color="$gray2" fontSize={"$sm"}>
                              {item.name}
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
          <VStack
            w={"$full"}
            px={"$6"}
            pt={"$2"}
            pb={"$4"}
            bg="$gray6"
            space="md"
            position="absolute"
            bottom={-20}
          >
            <Button
              icon={Power}
              title="Desativar anúncio"
              themeVariant="dark"
              width={"auto"}
              flex={1}
              isLoading={isLoading}
            />
            <Button
              icon={Trash}
              title="Excluir anúncio"
              themeVariant="grayScale"
              width={"auto"}
              flex={1}
              isLoading={isLoading}
            />
          </VStack>
        </VStack>
      )}
    </VStack>
  )
}
