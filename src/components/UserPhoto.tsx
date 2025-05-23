import { Center, Image } from "@gluestack-ui/themed"
import { ComponentProps } from "react"
import { ButtonIcon } from "./ButtonIcon"
import { PencilSimpleLine } from "phosphor-react-native"

type Props = ComponentProps<typeof Image> & {
  width?: number
  uri: string
}

export function UserPhoto({ width = 88, ...rest }: Props) {
  return (
    <Center width={width} height={width}>
      <Image
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
