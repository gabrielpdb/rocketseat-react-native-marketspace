import {
  Button as GluestackButton,
  Text,
  ButtonSpinner,
  Center,
  HStack,
  useToken,
} from "@gluestack-ui/themed"
import React, { ComponentProps, ReactNode } from "react"

type ButtonThemeVariant = "dark" | "default" | "grayScale"

type Props = ComponentProps<typeof GluestackButton> & {
  title: string
  themeVariant?: ButtonThemeVariant
  isLoading?: boolean
  icon?: React.ElementType
}

export function Button({
  title,
  isLoading = false,
  themeVariant = "default",
  icon: Icon,
  ...rest
}: Props) {
  const getBgColor = () => {
    switch (themeVariant) {
      case "dark":
        return "$gray1"
      case "default":
        return "$blueLight"
      case "grayScale":
        return "$gray5"
    }
  }
  const getTextColor = () => {
    switch (themeVariant) {
      case "dark":
      case "default":
        return "$gray7"
      case "grayScale":
        return "$gray2"
    }
  }
  const getIconColor = () => {
    switch (themeVariant) {
      case "dark":
      case "default":
        return "#F7F7F8"
      case "grayScale":
        return "#3E3A40"
    }
  }

  return (
    <GluestackButton bg={getBgColor()} h={"$11"} w={"$full"} {...rest}>
      {isLoading ? (
        <ButtonSpinner />
      ) : (
        <Center>
          <HStack gap={"$4"}>
            {Icon && <Icon size={20} color={getIconColor()} />}
            <Text color={getTextColor()} fontFamily="$heading">
              {title}
            </Text>
          </HStack>
        </Center>
      )}
    </GluestackButton>
  )
}
