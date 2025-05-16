import { Box, Button, HStack, Input, InputField } from "@gluestack-ui/themed"
import { MagnifyingGlass, Sliders } from "phosphor-react-native"

export function SearchInput() {
  return (
    <Input
      height={45}
      bg="$gray7"
      borderWidth={"$0"}
      px={"$2"}
      py={"$3"}
      alignItems="center"
      justifyContent="center"
    >
      <InputField placeholder="Buscar anúncio" fontSize={"$md"} />
      <HStack alignItems="center" space="sm">
        <Button w={"$0"} backgroundColor="transparent">
          <MagnifyingGlass />
        </Button>
        <Box width={1} height="$5" bg="$gray4" />
        <Button w={"$0"} backgroundColor="transparent">
          <Sliders />
        </Button>
      </HStack>
    </Input>
  )
}
