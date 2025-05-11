import {
  InputField,
  Input as GluestackInput,
  FormControl,
  FormControlError,
  FormControlErrorText,
  Button,
} from "@gluestack-ui/themed"
import { ComponentProps } from "react"

type Props = ComponentProps<typeof InputField> & {
  errorMessage?: string | null
  isInvalid?: boolean
  isReadOnly?: boolean
  icon?: React.ElementType
}

export function Input({
  errorMessage,
  isInvalid,
  isReadOnly,
  icon: Icon,
  ...rest
}: Props) {
  const invalid = !!errorMessage || isInvalid

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
          {...rest}
        />
        {Icon && (
          <Button bg="$gray7">
            <Icon size={20} />
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
