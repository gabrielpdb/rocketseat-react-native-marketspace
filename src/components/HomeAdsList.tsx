import { Box, Text, VStack } from "@gluestack-ui/themed"
import { SearchInput } from "./SearchInput"
import { useCallback, useEffect, useState } from "react"
import { api } from "@services/api"
import { ProductDTO } from "@dtos/ProductDTO"
import { useFocusEffect } from "@react-navigation/native"
import { ProductAdListItem } from "./ProductAdListItem"
import { FlatList } from "react-native"
import { FilterActionsheet } from "./FilterActionSheet"

type ProductListProps = ProductDTO & {
  id: string
  user_id: string
  user: { avatar: string }
  product_images: { id: string; path: string }[]
}

type FilterProps = {
  is_new?: boolean
  accept_trade?: boolean
  query?: string
  payment_methods?: string[]
}

export function HomeAdsList() {
  const [data, setData] = useState<ProductListProps[]>([] as ProductListProps[])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filter, setFilter] = useState<FilterProps>({
    is_new: undefined,
    accept_trade: false,
    payment_methods: [],
    query: "",
  })

  function openFilterSheet() {
    setIsFilterOpen(true)
  }

  function closeFilterSheet() {
    setIsFilterOpen(false)
  }

  function handleResetFilters() {
    setFilter((prev) => ({
      ...prev,
      is_new: undefined,
      accept_trade: false,
      payment_methods: [],
    }))
  }

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
    }, [filter])
  )
  return (
    <VStack>
      <Text mb={"$3"}>Compre produtos variados</Text>
      <SearchInput
        value={filter.query ?? ""}
        onChange={(text) => setFilter((prev) => ({ ...prev, query: text }))}
        onOpenFilter={openFilterSheet}
      />
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
      <FilterActionsheet
        isOpen={isFilterOpen}
        onClose={closeFilterSheet}
        filter={filter}
        onApply={(newFilters) =>
          setFilter((prev) => ({ ...prev, ...newFilters }))
        }
        onReset={handleResetFilters}
      />
    </VStack>
  )
}
