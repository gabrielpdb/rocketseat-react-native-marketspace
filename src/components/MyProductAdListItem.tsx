import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "@routes/app.routes"
import { api } from "@services/api"
import { TouchableOpacity } from "react-native"

type Props = {
  id: string
  name: string
  price: number
  is_new: boolean
  avatar?: string
  is_active: boolean
  product_image: { id: string; path: string }
}

export function MyProductAdListItem({
  name,
  price,
  is_new,
  product_image,
  avatar,
  is_active,
  id,
}: Props) {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleDetails() {
    navigation.navigate("myAdDetails", { id })
  }

  return (
    <VStack width={"48%"}>
      <TouchableOpacity onPress={handleDetails}>
        {!is_active && (
          <Box
            width={"100%"}
            height={100}
            borderRadius={"$md"}
            position="absolute"
            zIndex={1000}
            opacity={0.5}
            top={0}
            left={0}
            bg="$gray1"
          />
        )}
        {!is_active && (
          <Heading
            zIndex={1000}
            position="absolute"
            top={70}
            left={8}
            fontFamily="$heading"
            fontSize={"$xs"}
            color="$gray7"
          >
            ANÚNCIO DESATIVADO
          </Heading>
        )}
        <Box width={"100%"} h={100} borderRadius={"$md"}>
          {product_image ? (
            <Image
              w={"$full"}
              h={"$full"}
              rounded={"$md"}
              source={{
                uri: `${api.defaults.baseURL}/images/${product_image.path}`,
              }}
              alt={`Imagem do anúncio de ${name}`}
            />
          ) : (
            <Box w={"$full"} h={"$full"} bg="$gray5" borderRadius={"$md"}>
              <Center flex={1}>
                <Text fontSize={"$xs"} color="$gray4">
                  Anúncio sem imagem
                </Text>
              </Center>
            </Box>
          )}
          <Box
            position="absolute"
            top={4}
            right={4}
            rounded={"$full"}
            bg={is_new ? "$blue" : "$gray2"}
          >
            <Center>
              <Text
                textAlign="center"
                style={{ textTransform: "uppercase" }}
                color="$gray7"
                fontSize={"$2xs"}
                px={"$2"}
                py={"$0.5"}
                fontFamily="$heading"
              >
                {is_new ? "Novo" : "Usado"}
              </Text>
            </Center>
          </Box>
          {avatar && (
            <Box
              w={"$6"}
              h={"$6"}
              position="absolute"
              top={4}
              left={4}
              borderRadius={"50%"}
              borderWidth={1}
              borderColor="$gray7"
            >
              <Image
                w={"$full"}
                h={"$full"}
                borderRadius={2000}
                source={{
                  uri: `${api.defaults.baseURL}/images/${avatar}`,
                }}
                alt={`Imagem do anúncio de ${name}`}
              />
            </Box>
          )}
        </Box>
        <VStack>
          <Text fontSize={"$sm"} color={is_active ? "$gray2" : "$gray4"}>
            {name}
          </Text>
          <Text
            fontSize={"$md"}
            color={is_active ? "$gray1" : "$gray4"}
            fontFamily="$heading"
          >
            <Text
              fontSize={"$xs"}
              color={is_active ? "$gray1" : "$gray4"}
              fontFamily="$heading"
            >
              {"R$ "}
            </Text>
            {price}
          </Text>
        </VStack>
      </TouchableOpacity>
    </VStack>
  )
}
