import {
  CheckboxIndicator,
  CheckboxLabel,
  CheckIcon,
} from "@gluestack-ui/themed"
import { CheckboxIcon } from "@gluestack-ui/themed"
import {
  CircleIcon,
  HStack,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  CheckboxGroup,
  Checkbox,
} from "@gluestack-ui/themed"
import { ComponentProps } from "react"

type OptionProps = {
  value: string
  label: string
}

type Props = {
  options: OptionProps[]
  value: string[]
  onChange: (value: string[]) => void
}

export function CheckboxInput({ options, value, onChange, ...rest }: Props) {
  const handleToggle = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue]
    onChange(newValue)
  }

  return (
    <CheckboxGroup gap={14} value={value} {...rest}>
      {options &&
        options.map((option) => (
          <Checkbox
            key={option.value}
            value={option.value}
            isChecked={value.includes(option.value)}
            gap={10}
            onChange={() => handleToggle(option.value)}
          >
            <CheckboxIndicator>
              <CheckboxIcon as={CheckIcon} color="$blueLight" />
            </CheckboxIndicator>
            <CheckboxLabel>{option.label}</CheckboxLabel>
          </Checkbox>
        ))}
    </CheckboxGroup>
  )
}
