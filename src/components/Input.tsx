import {
  InputField,
  Input as GluestackInput,
  FormControl,
  FormControlError,
  FormControlErrorText,
  Button,
} from "@gluestack-ui/themed"
import { Eye } from "phosphor-react-native"
import { ComponentProps, useState } from "react"

type Props = ComponentProps<typeof InputField> & {
  errorMessage?: string | null
  isInvalid?: boolean
  isReadOnly?: boolean
  icon?: React.ElementType
  secureTextEntry?: boolean
}

export function Input({
  errorMessage,
  isInvalid,
  isReadOnly,
  icon: Icon,
  secureTextEntry = false,
  ...rest
}: Props) {
  const invalid = !!errorMessage || isInvalid
  const [hiddenText, setHiddenText] = useState(secureTextEntry)

  function changeVisibility() {
    setHiddenText(!hiddenText)
  }

  return (
    <FormControl isInvalid={invalid} w={"$full"}>
      <GluestackInput
        bg="$gray7"
        isInvalid={isInvalid}
        h={45}
        borderRadius={6}
        borderWidth={0}
        $focus={{
          borderWidth: 1,
          borderColor: invalid ? "$redLight" : "$gray3",
        }}
        isReadOnly={isReadOnly}
        opacity={isReadOnly ? 0.5 : 1}
        $invalid={{ borderWidth: 1, borderColor: "$redLight" }}
      >
        <InputField
          px={16}
          py={12}
          fontSize={16}
          fontFamily="$body"
          color="$gray2"
          placeholderTextColor={"$gray4"}
          secureTextEntry={hiddenText}
          {...rest}
        />
        {secureTextEntry && (
          <Button bg="$gray7" alignSelf="center" onPress={changeVisibility}>
            <Eye size={20} />
          </Button>
        )}
      </GluestackInput>
      <FormControlError>
        <FormControlErrorText color="$redLight">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}
