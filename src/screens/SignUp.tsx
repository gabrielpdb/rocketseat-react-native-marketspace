import {
  Center,
  Heading,
  onChange,
  ScrollView,
  Text,
  Toast,
  ToastTitle,
  useToast,
  VStack,
} from "@gluestack-ui/themed"
import Logo from "@assets/LogoMarketspace.svg"
import { UserPhoto } from "@components/UserPhoto"
import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { useNavigation } from "@react-navigation/native"
import { AuthNavigatorRoutesProps } from "@routes/auth.routes"
import * as FileSystem from "expo-file-system"
import * as ImagePicker from "expo-image-picker"
import * as yup from "yup"
import { ToastMessage } from "@components/ToastMessage"
import { useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, Controller } from "react-hook-form"
import { AppError } from "@utils/AppError"
import { api } from "@services/api"
import Avatar from "@assets/Avatar.png"

type FormDataProps = {
  name: string
  email: string
  tel: string
  password: string
  password_confirm: string
}

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome"),
  email: yup.string().required("Informe o e-mail").email("E-mail inválido"),
  tel: yup.string().required("Informe o telefone"),
  password: yup
    .string()
    .required("Informe a senha")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
  password_confirm: yup
    .string()
    .required("Confirme a senha")
    .oneOf([yup.ref("password"), ""], "A confirmação de senha não confere"),
})

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [userPhotoURI, setUserPhotoURI] = useState("")
  const [userPhotoFile, setUserPhotoFile] = useState()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({ resolver: yupResolver(signUpSchema) })

  function handleNavigateSignIn() {
    navigation.navigate("signIn")
  }

  async function handleUserPhotoSelect() {
    try {
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
          name: `${name}.${fileExtension}`.toLowerCase(),
          uri: photoURI,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any

        setUserPhotoURI(photoURI)
        setUserPhotoFile(photoFile)
      }

      return
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSignUp({ email, name, password, tel }: FormDataProps) {
    try {
      setIsLoading(true)
      if (!userPhotoFile) {
        setIsLoading(false)
        return toast.show({
          placement: "top",
          render: () => (
            <Toast bg="$redLight" action="error" variant="outline">
              <ToastTitle color="$gray7" textAlign="center">
                Imagem de usuário obrigatória
              </ToastTitle>
            </Toast>
          ),
        })
      }

      const signUpForm = new FormData()
      signUpForm.append("name", name)
      signUpForm.append("email", email)
      signUpForm.append("password", password)
      signUpForm.append("tel", tel)
      signUpForm.append("avatar", userPhotoFile)

      const response = await api.post("/users", signUpForm, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      if (response.status === 201) {
        toast.show({
          placement: "top",
          render: () => (
            <Toast bg="$blueLight" action="success" variant="outline">
              <ToastTitle color="$gray7" textAlign="center">
                Usuário criado com sucesso
              </ToastTitle>
            </Toast>
          ),
        })
        setTimeout(() => navigation.navigate("signIn"), 1500)
      }
      return
    } catch (error) {
      setIsLoading(false)
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde"
      toast.show({
        placement: "top",
        render: () => (
          <Toast bg="$redLight" action="error" variant="outline">
            <ToastTitle color="$gray7" textAlign="center">
              {title}
            </ToastTitle>
          </Toast>
        ),
      })
    }
  }

  return (
    <ScrollView flex={1} bg="$gray6" px="$12">
      <VStack mt={"$16"}>
        <Center mb={"$8"}>
          <Logo width={60} />
          <Heading fontSize={"$xl"}>Boas vindas!</Heading>
          <Text textAlign="center" fontSize={"$sm"}>
            Crie sua conta e use o espaço para comprar itens variados e vender
            seus produtos
          </Text>
        </Center>
        <Center mb={"$4"}>
          <UserPhoto
            onPressEditButton={handleUserPhotoSelect}
            source={userPhotoURI.length > 0 ? { uri: userPhotoURI } : Avatar}
            alt="Foto do usuário"
          />
        </Center>
        <VStack gap={"$4"}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="tel"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Telefone"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.tel?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirme a senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button
            title="Criar"
            themeVariant="dark"
            mt={"$2"}
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
          />
        </VStack>

        <Center mt="$12" flex={1} gap="$4">
          <Text>Já tem uma conta?</Text>
          <Button
            title="Ir para o login"
            themeVariant="grayScale"
            onPress={handleNavigateSignIn}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}
