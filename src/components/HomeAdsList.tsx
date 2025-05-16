import { FlatList, Text, VStack } from "@gluestack-ui/themed"
import { SearchInput } from "./SearchInput"
import { useEffect, useState } from "react"
import { api } from "@services/api"
import { ProductDTO } from "@dtos/ProductDTO"

export function HomeAdsList() {
  const [data, setData] = useState<ProductDTO[]>([])

  async function fetchAds() {
    try {
      const { data } = await api.get("/products")
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAds()
  }, [])
  return (
    <VStack>
      <Text mb={"$3"}>Compre produtos variados</Text>
      <SearchInput />
      <FlatList />
    </VStack>
  )
}
