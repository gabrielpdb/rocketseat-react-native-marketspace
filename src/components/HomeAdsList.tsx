import { Box, Text, VStack } from "@gluestack-ui/themed"
import { SearchInput } from "./SearchInput"
import { useCallback, useEffect, useState } from "react"
import { api } from "@services/api"
import { ProductDTO } from "@dtos/ProductDTO"
import { useFocusEffect } from "@react-navigation/native"
import { ProductAdListItem } from "./ProductAdListItem"
import { FlatList } from "react-native"

type ProductListProps = ProductDTO & {
  id: string
  user_id: string
  user: { avatar: string }
  product_images: { id: string; path: string }[]
}

export function HomeAdsList() {
  const [data, setData] = useState<ProductListProps[]>([] as ProductListProps[])

  async function fetchAds() {
    try {
      const { data } = await api.get("/products")

      setData(data)
    } catch (error) {
      console.log("o erro foi aqui", error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchAds()
    }, [])
  )
  return (
    <VStack>
      <Text mb={"$3"}>Compre produtos variados</Text>
      <SearchInput />
      <FlatList
        style={{ width: "100%", maxWidth: "100%", marginBottom: 20000 }}
        data={data}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 16, // espaçamento entre linhas
        }}
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: 500,
        }}
        renderItem={({ item }) => (
          <ProductAdListItem
            is_new={item.is_new}
            name={item.name}
            price={item.price}
            product_image={item.product_images[0]}
            avatar={item.user.avatar}
            id={item.id}
            is_active={true}
          />
        )}
      />
    </VStack>
  )
}
