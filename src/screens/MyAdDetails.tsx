import { useCallback, useState } from "react"
import { Dimensions, Linking, FlatList, Alert } from "react-native"
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native"

import {
  Box,
  Center,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
  Heading,
} from "@gluestack-ui/themed"

import { ProductDTO, ProductImagesDTO } from "@dtos/ProductDTO"
import { useAuth } from "@hooks/useAuth"
import { api } from "@services/api"
import { AppNavigatorRoutesProps } from "@routes/app.routes"

import {
  ArrowLeft,
  Bank,
  Barcode,
  CreditCard,
  Money,
  Power,
  QrCode,
  Trash,
  WhatsappLogo,
} from "phosphor-react-native"
import { IconProps } from "phosphor-react-native"

import { Button } from "@components/Button"
import { ButtonIcon } from "@components/ButtonIcon"
import { UserPhoto } from "@components/UserPhoto"
import { Loading } from "@components/Loading"
import Carousel from "react-native-reanimated-carousel"

const width = Dimensions.get("window").width

type RouteParamsProps = {
  id: string
}

type PaymentMethodsProps = { key: string; name: string }

type ProductProps = ProductDTO & {
  user: { avatar: string; name: string; tel: string }
  payment_methods: PaymentMethodsProps[]
  is_active: boolean
}

export function MyAdDetails() {
  const { user } = useAuth()
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const route = useRoute()
  const { id } = route.params as RouteParamsProps

  const [product, setProduct] = useState<ProductProps>({} as ProductProps)
  const [photos, setPhotos] = useState<ProductImagesDTO[]>([])
  const [isLoading, setIsLoading] = useState(true)

  function handleGoBack() {
    navigation.navigate("myAds")
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

  async function handleChangeProductStatus() {
    try {
      setIsLoading(true)
      await api.patch(`/products/${id}`, { is_active: !product.is_active })
      setProduct({ ...product, is_active: !product.is_active })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleRemoveAdConfirm() {
    Alert.alert(
      "Excluir anúncio",
      "Tem certeza de que deseja excluir este anúncio?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => handleRemoveAd(),
        },
      ]
    )
  }

  async function handleRemoveAd() {
    try {
      await api.delete(`/products/${id}`)
      navigation.navigate("myAds")
    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchProduct()
    }, [id])
  )

  function renderCarousel() {
    if (photos.length === 0) {
      return (
        <Center>
          <Loading />
        </Center>
      )
    }

    return (
      <Carousel
        width={width}
        height={280}
        data={photos}
        renderItem={({ item }) => (
          <Image
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
            source={{ uri: `${api.defaults.baseURL}/images/${item.path}` }}
            alt={item.id}
          />
        )}
      />
    )
  }

  function renderPaymentMethods() {
    const iconMap: Record<string, React.FC<IconProps>> = {
      deposit: Bank,
      pix: QrCode,
      cash: Money,
      boleto: Barcode,
      card: CreditCard,
    }

    return (
      <FlatList
        scrollEnabled={false}
        data={product.payment_methods}
        keyExtractor={(item, index) => `${item.key}-${index}`}
        renderItem={({ item }) => {
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
    )
  }

  return (
    <VStack flex={1}>
      {/* Header */}
      <HStack px="$6" mt="$16" mb="$4">
        <Center>
          <ButtonIcon
            icon={ArrowLeft}
            themeVariant="transparent"
            onPress={handleGoBack}
          />
        </Center>
      </HStack>

      {/* Conteúdo principal */}
      {isLoading ? (
        <Center flex={1}>
          <Loading />
        </Center>
      ) : (
        <>
          {renderCarousel()}

          {!product.is_active && (
            <Box
              width={width}
              height={280}
              bg="$gray1"
              zIndex={1000}
              mt={-280}
              opacity={0.5}
            >
              <Center flex={1}>
                <Heading
                  color="$gray7"
                  fontFamily="$heading"
                  fontSize="$sm"
                  opacity={1}
                >
                  ANÚNCIO DESATIVADO
                </Heading>
              </Center>
            </Box>
          )}

          <ScrollView
            contentContainerStyle={{ paddingBottom: 200 }}
            showsVerticalScrollIndicator={false}
          >
            <VStack px="$6" pt="$5" space="3xl">
              <HStack space="sm" alignItems="center">
                <UserPhoto avatar={product.user.avatar} width={24} />
                <Text>{product.user.name}</Text>
              </HStack>

              <VStack>
                <Box
                  py="$0.5"
                  px="$2"
                  bg="$gray5"
                  alignSelf="flex-start"
                  borderRadius="$full"
                  mb="$2"
                >
                  <Text
                    fontFamily="$heading"
                    fontSize="$2xs"
                    style={{ textTransform: "uppercase" }}
                  >
                    {product.is_new ? "Novo" : "Usado"}
                  </Text>
                </Box>

                <HStack justifyContent="space-between" alignItems="center">
                  <Heading fontSize="$xl">{product.name}</Heading>
                  <Heading
                    color="$blueLight"
                    fontFamily="$heading"
                    fontSize="$xl"
                  >
                    <Text
                      color="$blueLight"
                      fontFamily="$heading"
                      fontSize="$sm"
                    >
                      R${" "}
                    </Text>
                    {product.price.toFixed(2).replace(".", ",")}
                  </Heading>
                </HStack>

                <Text fontFamily="$body" fontSize="$sm">
                  {product.description}
                </Text>
              </VStack>

              <VStack>
                <HStack alignItems="center" space="sm">
                  <Heading fontSize="$sm">Aceita troca?</Heading>
                  <Text fontSize="$sm">
                    {product.accept_trade ? "Sim" : "Não"}
                  </Text>
                </HStack>

                <VStack space="xs" mt="$2">
                  <Heading fontSize="$sm">Meios de pagamento</Heading>
                  {product.payment_methods.length > 0 && renderPaymentMethods()}
                </VStack>
              </VStack>
            </VStack>
          </ScrollView>

          {/* Botões inferiores */}
          <VStack
            position="absolute"
            w="$full"
            bottom={0}
            px="$6"
            pt="$4"
            pb={"$6"}
            bg="$gray6"
            space="md"
          >
            <Button
              icon={Power}
              title={
                product.is_active ? "Desativar anúncio" : "Reativar anúncio"
              }
              onPress={handleChangeProductStatus}
              themeVariant={product.is_active ? "dark" : "default"}
              width="auto"
              flex={1}
              isLoading={isLoading}
            />
            <Button
              icon={Trash}
              onPress={handleRemoveAdConfirm}
              title="Excluir anúncio"
              themeVariant="grayScale"
              width="auto"
              flex={1}
              isLoading={isLoading}
            />
          </VStack>
        </>
      )}
    </VStack>
  )
}
