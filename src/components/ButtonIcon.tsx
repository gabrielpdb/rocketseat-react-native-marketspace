import {
  Button as GluestackButton,
  Text,
  ButtonSpinner,
  Center,
  HStack,
  useToken,
} from "@gluestack-ui/themed"
import React, { ComponentProps, ReactNode } from "react"

type ButtonThemeVariant = "dark" | "default" | "grayScale" | "transparent"

type Props = ComponentProps<typeof GluestackButton> & {
  themeVariant?: ButtonThemeVariant
  isLoading?: boolean
  icon: React.ElementType
  buttonSize?: number
  iconSize?: number
}

export function ButtonIcon({
  isLoading = false,
  themeVariant = "default",
  icon: Icon,
  buttonSize = 40,
  iconSize = 20,
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
      case "transparent":
        return ""
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
    <GluestackButton
      bg={getBgColor()}
      width={buttonSize}
      height={buttonSize}
      borderRadius={"$full"}
      {...rest}
    >
      {isLoading ? (
        <ButtonSpinner />
      ) : (
        <Icon size={iconSize} color={getIconColor()} />
      )}
    </GluestackButton>
  )
}
