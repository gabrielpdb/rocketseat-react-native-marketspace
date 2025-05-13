import {
  Box,
  Center,
  ScrollView,
  Text,
  Toast,
  ToastTitle,
  useToast,
  VStack,
} from "@gluestack-ui/themed"
import Logo from "@assets/LogoMarketspaceWithText.svg"
import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { Eye } from "phosphor-react-native"
import { useNavigation } from "@react-navigation/native"
import { AuthNavigatorRoutesProps } from "@routes/auth.routes"
import { useAuth } from "@hooks/useAuth"
import { AppError } from "@utils/AppError"
import * as yup from "yup"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"

type FormDataProps = {
  email: string
  password: string
}

const signInSchema = yup.object({
  email: yup.string().required("Informe o e-mail").email("E-mail inválido"),
  password: yup.string().required("Informe a senha"),
})

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const { signIn } = useAuth()
  const toast = useToast()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({ resolver: yupResolver(signInSchema) })

  function handleNavigateSignUp() {
    navigation.navigate("signUp")
  }

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true)
      await signIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : "Não foi possível entrar. Tente novamente mais tarde"

      setIsLoading(false)
      toast.show({
        placement: "top",
        render: () => (
          <Toast>
            <ToastTitle>{title}</ToastTitle>
          </Toast>
        ),
      })
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      bg="$gray7"
    >
      <VStack
        flex={1}
        px={48}
        borderBottomLeftRadius="$3xl"
        borderBottomRightRadius="$3xl"
        bg="$gray6"
      >
        <Center my={"$24"}>
          <Logo />
          <Text color="$gray3" fontSize={14}>
            Seu espaço de compra e venda
          </Text>
        </Center>
        <Center gap={"$4"}>
          <Text fontSize={14} color="$gray2">
            Acesse sua conta
          </Text>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
                autoCapitalize="none"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Button
            marginTop={20}
            title={"Entrar"}
            themeVariant="default"
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />
        </Center>
      </VStack>
      <VStack flex={2} px={48}>
        <Center flex={1} gap="$4">
          <Text>Ainda não tem acesso?</Text>
          <Button
            title="Criar uma conta"
            themeVariant="grayScale"
            onPress={handleNavigateSignUp}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}
