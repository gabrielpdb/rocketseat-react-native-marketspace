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

export function MyAdsList() {
  const [data, setData] = useState<ProductListProps[]>([] as ProductListProps[])

  async function fetchAds() {
    try {
      const { data } = await api.get("/users/products")

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
    <VStack flex={1}>
      <FlatList
        style={{
          width: "100%",
          maxWidth: "100%",
        }}
        data={data}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 16, // espaçamento entre linhas
        }}
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: 50,
        }}
        renderItem={({ item }) => {
          return (
            <ProductAdListItem
              is_new={item.is_new}
              name={item.name}
              price={item.price}
              product_image={item.product_images[0]}
              id={item.id}
            />
          )
        }}
      />
    </VStack>
  )
}
