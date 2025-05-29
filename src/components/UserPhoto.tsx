import { Center, Image } from "@gluestack-ui/themed"
import { ComponentProps } from "react"
import { ButtonIcon } from "./ButtonIcon"
import { PencilSimpleLine } from "phosphor-react-native"
import { api } from "@services/api"
import defaultUserPhotoImg from "@assets/Avatar.png"
import { useAuth } from "@hooks/useAuth"

type Props = ComponentProps<typeof Image> & {
  width?: number
  avatar?: string
}

export function UserPhoto({ width = 88, avatar, ...rest }: Props) {
  const { user } = useAuth()

  return (
    <Center width={width} height={width}>
      <Image
        alt="Imagem do usuário"
        source={
          avatar
            ? { uri: `${api.defaults.baseURL}/images/${avatar}` }
            : user.avatar
            ? { uri: `${api.defaults.baseURL}/images/${user.avatar}` }
            : defaultUserPhotoImg
        }
        width={width}
        height={width}
        rounded={"$full"}
        borderWidth={"$3"}
        borderColor="$blueLight"
        {...rest}
      />
    </Center>
  )
}
