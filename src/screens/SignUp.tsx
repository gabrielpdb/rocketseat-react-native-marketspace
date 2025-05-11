import { Center, Heading, ScrollView, Text, VStack } from "@gluestack-ui/themed"
import Logo from "@assets/LogoMarketspace.svg"
import { UserPhoto } from "@components/UserPhoto"
import { Input } from "@components/Input"
import { Eye } from "phosphor-react-native"
import { Button } from "@components/Button"
import { useNavigation } from "@react-navigation/native"
import { AuthNavigatorRoutesProps } from "@routes/auth.routes"

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleNavigateSignIn() {
    navigation.navigate("signIn")
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
            source={"http://github.com/gabrielpdb.png"}
            alt="Foto do usuário"
          />
        </Center>
        <VStack gap={"$4"}>
          <Input placeholder="Nome" />
          <Input placeholder="E-mail" />
          <Input placeholder="Telefone" />
          <Input placeholder="Senha" icon={Eye} />
          <Input placeholder="Confirmar senha" icon={Eye} />
          <Button title="Criar" themeVariant="dark" mt={"$2"} />
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
