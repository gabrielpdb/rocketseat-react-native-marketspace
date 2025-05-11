import { Box, Center, ScrollView, Text, VStack } from "@gluestack-ui/themed"
import Logo from "@assets/LogoMarketspaceWithText.svg"
import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { Eye } from "phosphor-react-native"
import { useNavigation } from "@react-navigation/native"
import { AuthNavigatorRoutesProps } from "@routes/auth.routes"

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleNavigateSignUp() {
    navigation.navigate("signUp")
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
          <Input placeholder="E-mail" />
          <Input placeholder="Senha" icon={Eye} />
          <Button marginTop={20} title={"Entrar"} themeVariant="default" />
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
