import { Box, Button, HStack, Input, InputField } from "@gluestack-ui/themed"
import { MagnifyingGlass, Sliders } from "phosphor-react-native"

type SearchInputProps = {
  value: string
  onChange: (text: string) => void
  onOpenFilter?: () => void // opcional: abre um modal com filtros
}

export function SearchInput({
  value,
  onChange,
  onOpenFilter,
}: SearchInputProps) {
  return (
    <Input
      height={45}
      bg="$gray7"
      borderWidth={"$0"}
      px="$2"
      py="$3"
      alignItems="center"
      justifyContent="space-between"
    >
      <InputField
        placeholder="Buscar anúncio"
        fontSize="$md"
        value={value}
        onChangeText={onChange}
      />

      <HStack alignItems="center" space="sm">
        <Button w="$0" backgroundColor="transparent">
          <MagnifyingGlass />
        </Button>
        <Box width={1} height="$5" bg="$gray4" />
        <Button w="$0" backgroundColor="transparent" onPress={onOpenFilter}>
          <Sliders />
        </Button>
      </HStack>
    </Input>
  )
}
