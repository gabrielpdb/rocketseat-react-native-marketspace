import { Center, Spinner } from "@gluestack-ui/themed"

export function Loading() {
  return (
    <Center flex={1} bg="$gray6">
      <Spinner size={"small"} color="$blue" />
    </Center>
  )
}
