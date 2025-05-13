import {
  Pressable,
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
} from "@gluestack-ui/themed"
import { X } from "phosphor-react-native"

type Props = {
  id: string
  title: string
  description?: string
  action?: "error" | "success"
  onClose: () => void
}

export function ToastMessage({
  id,
  onClose,
  title,
  action = "success",
  description,
}: Props) {
  return (
    <Toast
      nativeID={`toast-${id}`}
      action={action}
      bgColor={action === "success" ? "$blueLight" : "$redLight"}
      mt={"$10"}
    >
      <VStack space="xs" w={"$full"}>
        <Pressable alignSelf="flex-end" onPress={onClose}>
          <X color="white" />
        </Pressable>
        <ToastTitle color="$gray7" fontFamily="$heading">
          {title}
        </ToastTitle>
        {description && (
          <ToastDescription color="$gray7" fontFamily="$body">
            {description}
          </ToastDescription>
        )}
      </VStack>
    </Toast>
  )
}
