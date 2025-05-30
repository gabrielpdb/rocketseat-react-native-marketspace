import { Center, Image } from "@gluestack-ui/themed"
import { ComponentProps } from "react"
import { ButtonIcon } from "./ButtonIcon"
import { PencilSimpleLine } from "phosphor-react-native"

type Props = ComponentProps<typeof Image> & {
  onPressEditButton: () => Promise<any>
}

export function UserPhotoSelect({ onPressEditButton, ...rest }: Props) {
  return (
    <Center width={88} height={88}>
      <Image
        width={88}
        height={88}
        rounded={"$full"}
        borderWidth={"$3"}
        borderColor="$blueLight"
        {...rest}
      />
      <ButtonIcon
        onPress={onPressEditButton}
        icon={PencilSimpleLine}
        position="absolute"
        bottom={0}
        right={-10}
      />
    </Center>
  )
}
