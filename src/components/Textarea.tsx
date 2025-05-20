import {
  InputField,
  Textarea as GluestackTextarea,
  Input as GluestackInput,
  FormControl,
  FormControlError,
  FormControlErrorText,
  Button,
  TextareaInput,
} from "@gluestack-ui/themed"
import { ComponentProps } from "react"

type Props = ComponentProps<typeof InputField> & {
  errorMessage?: string | null
  isInvalid?: boolean
  isReadOnly?: boolean
}

export function Textarea({
  errorMessage,
  isInvalid,
  isReadOnly,
  ...rest
}: Props) {
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid} w={"$full"}>
      <GluestackTextarea
        bg="$gray7"
        h={"$40"}
        isInvalid={isInvalid}
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
        <TextareaInput
          px={16}
          py={12}
          fontSize={16}
          fontFamily="$body"
          color="$gray2"
          placeholderTextColor={"$gray4"}
          {...rest}
        />
      </GluestackTextarea>
      <FormControlError>
        <FormControlErrorText color="$redLight">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}
