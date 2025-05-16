import {
  HStack,
  Text,
  ButtonText as ButtonTextGluestack,
} from "@gluestack-ui/themed"
import { ComponentProps } from "react"
import { gluestackUIConfig } from "../../config/gluestack-ui.config"

type Props = ComponentProps<typeof ButtonTextGluestack> & {
  title: string
  textColor: keyof typeof gluestackUIConfig.tokens.colors
  icon?: React.ElementType
}

export function ButtonText({ title, textColor, icon: Icon, ...rest }: Props) {
  const { tokens } = gluestackUIConfig
  const iconColor = tokens.colors[textColor]

  return (
    <ButtonTextGluestack {...rest}>
      <HStack alignItems="center" space="md">
        <Text
          fontWeight={"$bold"}
          fontFamily="$heading"
          fontSize={"$xs"}
          color={iconColor}
        >
          {title}
        </Text>
        {Icon && <Icon size={20} color={iconColor} />}
      </HStack>
    </ButtonTextGluestack>
  )
}
