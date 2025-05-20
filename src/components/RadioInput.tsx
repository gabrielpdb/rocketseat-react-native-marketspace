import {
  CircleIcon,
  HStack,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@gluestack-ui/themed"
import { ComponentProps } from "react"

type OptionProps = {
  value: string
  label: string
}

type Props = Omit<ComponentProps<typeof RadioGroup>, "children"> & {
  options: OptionProps[]
}

export function RadioInput({ options, value, onChange, ...rest }: Props) {
  return (
    <RadioGroup value={value || ""} onChange={onChange} {...rest}>
      <HStack alignItems="center" space="xl">
        {options &&
          options.map((option) => (
            <Radio key={option.value} value={option.value} gap={10}>
              <RadioIndicator>
                <RadioIcon as={CircleIcon} color="$blueLight" />
              </RadioIndicator>
              <RadioLabel>{option.label}</RadioLabel>
            </Radio>
          ))}
      </HStack>
    </RadioGroup>
  )
}
