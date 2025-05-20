import { ButtonIcon } from "@components/ButtonIcon"
import {
  Box,
  Button as GluestackButton,
  Center,
  Heading,
  HStack,
  ScrollView,
  Text,
  VStack,
  onChange,
  Switch,
} from "@gluestack-ui/themed"
import { ArrowLeft, Control, Plus, Radio } from "phosphor-react-native"
import { gluestackUIConfig } from "../../config/gluestack-ui.config"
import { Input } from "@components/Input"
import { Textarea } from "@components/Textarea"
import { RadioInput } from "@components/RadioInput"
import { Controller, useForm } from "react-hook-form"
import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "@routes/app.routes"
import { CheckboxInput } from "@components/CheckboxInput"
import { Button } from "@components/Button"

type PaymentMethods = "deposit" | "pix" | "cash" | "boleto" | "card"

type FormDataProps = {
  name: string
  description: string
  is_new: boolean
  price: number
  accept_trade: boolean
  payment_methods: PaymentMethods[]
}

export function Create() {
  const { tokens } = gluestackUIConfig
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormDataProps>({
    defaultValues: { is_new: true, accept_trade: false },
  })

  function handleCreate({
    name,
    description,
    is_new,
    price,
    accept_trade,
    payment_methods,
  }: FormDataProps) {
    console.log(name, description, is_new, price, accept_trade, payment_methods)
  }

  return (
    <VStack flex={1}>
      <HStack
        px={"$6"}
        pt={"$16"}
        pb={"$4"}
        bg="$gray6"
        justifyContent="space-between"
      >
        <ButtonIcon
          icon={ArrowLeft}
          themeVariant="transparent"
          onPress={() => navigation.goBack()}
        />
        <Heading alignSelf="center">Criar anúncio</Heading>
        <Box w={"$10"}></Box>
      </HStack>
      <ScrollView bg="$gray6" px={"$6"} showsVerticalScrollIndicator={false}>
        <VStack space="3xl">
          <VStack>
            <Heading>Imagens</Heading>
            <Text>
              Escolha até 3 imagens para mostrar o quanto o seu produto é
              incrível
            </Text>
            <HStack mt={"$4"}>
              <GluestackButton w={"$24"} h="$24" bg="$gray5">
                <Plus color={tokens.colors.gray4} />
              </GluestackButton>
            </HStack>
          </VStack>
          <VStack space="md">
            <Heading>Sobre o produto</Heading>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Título do anúncio"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({ field: { value, onChange } }) => (
                <Textarea
                  placeholder="Descrição do produto"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <Controller
              name="is_new"
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioInput
                  onChange={(val: string) => onChange(val === "true")}
                  value={value !== undefined ? String(value) : undefined}
                  options={[
                    { label: "Produto novo", value: "true" },
                    { label: "Produto usado", value: "false" },
                  ]}
                />
              )}
            />
          </VStack>
          <VStack space="md" pb={"$20"}>
            <Heading>Venda</Heading>
            <Controller
              control={control}
              name="price"
              render={({ field: { onChange, value } }) => (
                <Input
                  onChangeText={(text) => onChange(Number(text))}
                  value={value?.toString() || ""}
                  placeholder="Valor do produto"
                />
              )}
            />
            <Text>Aceita troca?</Text>
            <HStack>
              <Controller
                control={control}
                name="accept_trade"
                render={({ field: { onChange, value } }) => (
                  <Switch
                    defaultValue={value}
                    value={value}
                    onChange={() => onChange(!value)}
                  />
                )}
              />
            </HStack>
            <Text>Meios de pagamento aceitos</Text>
            <Controller
              control={control}
              name="payment_methods"
              render={({ field: { onChange, value } }) => (
                <CheckboxInput
                  value={value ?? []}
                  onChange={onChange}
                  options={[
                    { label: "Boleto", value: "boleto" },
                    { label: "Pix", value: "pix" },
                    { label: "Dinheiro", value: "cash" },
                    { label: "Cartão de Crédito", value: "card" },
                    { label: "Depósito Bancário", value: "deposit" },
                  ]}
                />
              )}
            />
          </VStack>
        </VStack>
      </ScrollView>
      <HStack h={"$20"} px={"$6"} pt={"$5"} pb={"$20"} bg="$gray7" space="md">
        <Button
          title="Cancelar"
          themeVariant="grayScale"
          width={"auto"}
          flex={1}
        />
        <Button
          title="Avançar"
          themeVariant="dark"
          width={"auto"}
          flex={1}
          onPress={handleSubmit(handleCreate)}
        />
      </HStack>
    </VStack>
  )
}
