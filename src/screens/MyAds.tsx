import { ButtonIcon } from "@components/ButtonIcon"
import { MyAdsList } from "@components/MyAdsList"
import { Button, Menu, useTheme } from "@gluestack-ui/themed"
import { Box, Heading, HStack, Text, VStack } from "@gluestack-ui/themed"
import { Picker } from "@react-native-picker/picker"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "@routes/app.routes"
import { api } from "@services/api"
import { Plus } from "phosphor-react-native"
import { useCallback, useState } from "react"
import { View } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import { gluestackUIConfig } from "../../config/gluestack-ui.config"

export function MyAds() {
  const { tokens } = gluestackUIConfig
  const [numberOfAds, setNumberOfAds] = useState(0)
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const [items, setItems] = useState([
    { label: "Todos", value: "all" },
    { label: "Novos", value: "news" },
    { label: "Usados", value: "olds" },
  ])
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("all")

  function handleNavigateCreate() {
    navigation.navigate("create", {})
  }

  async function fetchMyAds() {
    try {
      const { data } = await api.get("/users/products")

      setNumberOfAds(data.length)
    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchMyAds()
    }, [])
  )

  return (
    <VStack px={"$6"} flex={1} height={"100%"}>
      <HStack
        mt={"$16"}
        mb={"$4"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box w={"$10"} />
        <Heading>Meus anúncios</Heading>
        <ButtonIcon
          icon={Plus}
          themeVariant="transparent"
          onPress={handleNavigateCreate}
        />
      </HStack>
      <HStack alignItems="center" justifyContent="space-between" mb={"$5"}>
        <Text>{numberOfAds} anúncios</Text>

        <Box w={"$40"}>
          <DropDownPicker
            style={{
              backgroundColor: "transparent",
              borderColor: tokens.colors.gray5,
            }}
            listItemContainerStyle={{ backgroundColor: tokens.colors.gray6 }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </Box>
      </HStack>

      <VStack height={"100%"} flex={1}>
        <MyAdsList />
      </VStack>
    </VStack>
  )
}
