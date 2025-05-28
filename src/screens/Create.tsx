import { ButtonIcon } from "@components/ButtonIcon"
import {
  Box,
  Button as GluestackButton,
  Center,
  Heading,
  HStack,
  ScrollView,
  Text,
  VStack,
  onChange,
  Switch,
  useToast,
  Image,
  Icon,
} from "@gluestack-ui/themed"
import { ArrowLeft, Control, Plus, Radio, X } from "phosphor-react-native"
import { gluestackUIConfig } from "../../config/gluestack-ui.config"
import { Input } from "@components/Input"
import { Textarea } from "@components/Textarea"
import { RadioInput } from "@components/RadioInput"
import { Controller, useForm } from "react-hook-form"
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "@routes/app.routes"
import { CheckboxInput } from "@components/CheckboxInput"
import { Button } from "@components/Button"
import * as FileSystem from "expo-file-system"
import * as ImagePicker from "expo-image-picker"
import { ToastMessage } from "@components/ToastMessage"
import { useCallback, useState } from "react"
import { api } from "@services/api"
import { PaymentMethods, ProductDTO } from "@dtos/ProductDTO"

type FormDataProps = {
  name: string
  description: string
  is_new: boolean
  price: number
  accept_trade: boolean
  payment_methods: PaymentMethods[]
}

export type PhotoProps = {
  name: string
  type: string
  uri: string
}

type RouteParamsProps = {
  product?: ProductDTO
  images?: PhotoProps[]
}

export function Create() {
  const { tokens } = gluestackUIConfig
  const route = useRoute()
  const params = route.params as RouteParamsProps | undefined
  const images = params?.images
  const product = params?.product
  const {
    accept_trade = false,
    description = "",
    is_new = true,
    name = "",
    payment_methods = [],
    price = 0,
  } = product || {}
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormDataProps>({
    defaultValues: {
      accept_trade,
      description,
      is_new,
      name,
      payment_methods,
      price,
    },
  })
  const [photos, setPhotos] = useState<PhotoProps[]>([] as PhotoProps[])

  async function handleSelectNewPhoto() {
    try {
      if (photos.length === 3) {
        return toast.show({
          placement: "top",
          render: ({ id }) => (
            <ToastMessage
              id={id}
              action="error"
              onClose={() => toast.close(id)}
              title="Você já selecionou o máximo de imagens, exclua uma para escolher uma nova"
            />
          ),
        })
      }
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photoSelected.canceled) {
        return
      }

      const photoURI = photoSelected.assets[0].uri

      if (photoURI) {
        const photoInfo = (await FileSystem.getInfoAsync(photoURI)) as {
          size: number
        }

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            placement: "top",
            render: ({ id }) => (
              <ToastMessage
                id={id}
                action="error"
                onClose={() => toast.close(id)}
                title="Essa imagem é muito grande. Escolha uma de até 5MB"
              />
            ),
          })
        }

        const fileExtension = photoURI.split(".").pop()

        const photoFile = {
          name: `new.${fileExtension}`.toLowerCase(),
          uri: photoURI,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any

        setPhotos((prevState) => [...prevState, photoFile])
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleRemovePhoto(photoURI: string) {
    try {
      setPhotos((prevState) =>
        prevState.filter((photo) => photo.uri != photoURI)
      )
    } catch (error) {
      console.log(error)
    }
  }

  async function handleCreate({
    name,
    description,
    is_new,
    price,
    accept_trade,
    payment_methods,
  }: FormDataProps) {
    try {
      setIsLoading(true)

      return navigation.navigate("preview", {
        product: {
          accept_trade,
          description,
          is_new,
          name,
          payment_methods,
          price,
        },
        photos: photos,
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (images) {
        setPhotos(images)
      }
    }, [])
  )

  return (
    <VStack flex={1}>
      <HStack
        px={"$6"}
        pt={"$16"}
        pb={"$4"}
        bg="$gray6"
        justifyContent="space-between"
      >
        <ButtonIcon
          icon={ArrowLeft}
          themeVariant="transparent"
          onPress={() => navigation.goBack()}
        />
        <Heading alignSelf="center">Criar anúncio</Heading>
        <Box w={"$10"}></Box>
      </HStack>
      <ScrollView bg="$gray6" px={"$6"} showsVerticalScrollIndicator={false}>
        <VStack space="3xl">
          <VStack>
            <Heading>Imagens</Heading>
            <Text>
              Escolha até 3 imagens para mostrar o quanto o seu produto é
              incrível
            </Text>
            <HStack w={"$full"} overflow="hidden" mt={"$4"} space="sm">
              {photos.map((photo) => (
                <Box borderRadius={6} w={"$24"} h="$24" key={photo.uri}>
                  <Image
                    w={"$full"}
                    h={"$full"}
                    source={{ uri: photo.uri }}
                    alt="Foto selecionada pelo usuário"
                  />
                  <GluestackButton
                    bg="$gray2"
                    position="absolute"
                    top={4}
                    right={4}
                    w={16} // largura 16px
                    h={16} // altura 16px
                    p="$0"
                    px="$0"
                    py="$0"
                    minHeight={16}
                    minWidth={16}
                    maxWidth={16}
                    rounded={"$full"}
                    alignItems="center"
                    justifyContent="center"
                    onPress={() => handleRemovePhoto(photo.uri)}
                  >
                    <X color={tokens.colors.gray7} size={8} />
                  </GluestackButton>
                </Box>
              ))}
              {photos.length < 3 && (
                <GluestackButton
                  w={"$24"}
                  h="$24"
                  bg="$gray5"
                  onPress={handleSelectNewPhoto}
                >
                  <Plus color={tokens.colors.gray4} />
                </GluestackButton>
              )}
            </HStack>
          </VStack>
          <VStack space="md">
            <Heading>Sobre o produto</Heading>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Título do anúncio"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({ field: { value, onChange } }) => (
                <Textarea
                  placeholder="Descrição do produto"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <Controller
              name="is_new"
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioInput
                  onChange={(val: string) => onChange(val === "true")}
                  value={value !== undefined ? String(value) : undefined}
                  options={[
                    { label: "Produto novo", value: "true" },
                    { label: "Produto usado", value: "false" },
                  ]}
                />
              )}
            />
          </VStack>
          <VStack space="md" pb={"$20"}>
            <Heading>Venda</Heading>
            <Controller
              control={control}
              name="price"
              render={({ field: { onChange, value } }) => (
                <Input
                  keyboardType="numbers-and-punctuation"
                  onChangeText={(text) => onChange(Number(text))}
                  value={value?.toString() || ""}
                  placeholder="Valor do produto"
                />
              )}
            />
            <Text>Aceita troca?</Text>
            <HStack>
              <Controller
                control={control}
                name="accept_trade"
                render={({ field: { onChange, value } }) => (
                  <Switch
                    defaultValue={value}
                    value={value}
                    onChange={() => onChange(!value)}
                  />
                )}
              />
            </HStack>
            <Text>Meios de pagamento aceitos</Text>
            <Controller
              control={control}
              name="payment_methods"
              render={({ field: { onChange, value } }) => (
                <CheckboxInput
                  value={value ?? []}
                  onChange={onChange}
                  options={[
                    { label: "Boleto", value: "boleto" },
                    { label: "Pix", value: "pix" },
                    { label: "Dinheiro", value: "cash" },
                    { label: "Cartão de Crédito", value: "card" },
                    { label: "Depósito Bancário", value: "deposit" },
                  ]}
                />
              )}
            />
          </VStack>
        </VStack>
      </ScrollView>
      <HStack h={"$20"} px={"$6"} pt={"$5"} pb={"$20"} bg="$gray7" space="md">
        <Button
          title="Cancelar"
          themeVariant="grayScale"
          width={"auto"}
          flex={1}
          onPress={() => navigation.navigate("home")}
        />
        <Button
          title="Avançar"
          themeVariant="dark"
          width={"auto"}
          flex={1}
          onPress={handleSubmit(handleCreate)}
          isLoading={isLoading}
        />
      </HStack>
    </VStack>
  )
}
