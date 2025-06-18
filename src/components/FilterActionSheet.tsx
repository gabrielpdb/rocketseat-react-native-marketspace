import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  Text,
  VStack,
  Checkbox,
  Button,
  HStack,
  ScrollView,
} from "@gluestack-ui/themed"

type Props = {
  isOpen: boolean
  onClose: () => void
  filter: {
    is_new?: boolean
    accept_trade?: boolean
    payment_methods?: string[]
  }
  onApply: (filters: Props["filter"]) => void
  onReset: () => void
}

export function FilterActionsheet({
  isOpen,
  onClose,
  filter,
  onApply,
  onReset,
}: Props) {
  const togglePaymentMethod = (method: string, checked: boolean) => {
    const current = filter.payment_methods || []
    onApply({
      ...filter,
      payment_methods: checked
        ? [...current, method]
        : current.filter((m) => m !== method),
    })
  }

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent px="$4" pt="$4">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        <ScrollView style={{ width: "100%" }}>
          <VStack space="xl" width="100%" mt="$4" pb="$6">
            <Text fontSize="$lg" fontWeight="$bold">
              Filtrar anúncios
            </Text>

            <VStack space="md">
              <Text fontWeight="$semibold">Condição</Text>
              <Checkbox
                value="new"
                isChecked={filter.is_new === true}
                onChange={(v) =>
                  onApply({ ...filter, is_new: v ? true : undefined })
                }
              >
                <Text>Novos</Text>
              </Checkbox>
              <Checkbox
                value="used"
                isChecked={filter.is_new === false}
                onChange={(v) =>
                  onApply({ ...filter, is_new: v ? false : undefined })
                }
              >
                <Text>Usados</Text>
              </Checkbox>
            </VStack>

            <VStack space="md">
              <Text fontWeight="$semibold">Aceita troca</Text>
              <Checkbox
                value="accept_trade"
                isChecked={filter.accept_trade}
                onChange={(v) => onApply({ ...filter, accept_trade: v })}
              >
                <Text>Sim</Text>
              </Checkbox>
            </VStack>

            <VStack space="md">
              <Text fontWeight="$semibold">Meios de pagamento</Text>
              {["boleto", "pix", "cash", "card", "deposit"].map((method) => (
                <Checkbox
                  key={method}
                  value={method}
                  isChecked={filter.payment_methods?.includes(method)}
                  onChange={(checked) => togglePaymentMethod(method, checked)}
                >
                  <Text>{method.toUpperCase()}</Text>
                </Checkbox>
              ))}
            </VStack>

            <HStack space="md" mt="$4" justifyContent="space-between">
              <Button
                variant="outline"
                flex={1}
                borderColor="$red600"
                onPress={onReset}
              >
                <Text color="$red600">Limpar</Text>
              </Button>
              <Button flex={1} onPress={onClose}>
                <Text>Aplicar filtros</Text>
              </Button>
            </HStack>
          </VStack>
        </ScrollView>
      </ActionsheetContent>
    </Actionsheet>
  )
}
