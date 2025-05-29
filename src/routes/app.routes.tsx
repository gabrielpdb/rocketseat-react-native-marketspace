import { LogoutButton } from "@components/LogoutButton"
import { gluestackUIConfig } from "../../config/gluestack-ui.config"
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs"
import { Create, PhotoProps } from "@screens/Create"
import { Details } from "@screens/Details"
import { Edit } from "@screens/Edit"
import { EmptyScreen } from "@screens/EmptyScreen"
import { Home } from "@screens/Home"
import { MyAdDetails } from "@screens/MyAdDetails"
import { MyAds } from "@screens/MyAds"
import { Preview } from "@screens/Preview"
import { House, SignOut, Tag } from "phosphor-react-native"
import { Platform } from "react-native"
import { ProductDTO } from "@dtos/ProductDTO"

type AppRoutes = {
  home: undefined
  details: { id: string }
  myAds: undefined
  myAdDetails: undefined
  create: { product?: ProductDTO; images?: PhotoProps[] }
  preview: { product: ProductDTO; photos: PhotoProps[] }
  edit: undefined
  logout: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()
const { tokens } = gluestackUIConfig
const iconSize = tokens.space["6"]

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: tokens.colors.gray2,
        tabBarInactiveTintColor: tokens.colors.gray4,
        tabBarStyle: {
          backgroundColor: tokens.colors.gray7,
          height: Platform.OS === "android" ? "auto" : 72,
          paddingTop: tokens.space["5"],
          paddingBottom: tokens.space["20"],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <House
              color={color}
              size={24}
              weight={focused ? "bold" : "regular"}
            />
          ),
        }}
      />
      <Screen
        name="myAds"
        component={MyAds}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Tag
              color={color}
              size={24}
              weight={focused ? "bold" : "regular"}
            />
          ),
        }}
      />
      <Screen
        name="logout"
        component={EmptyScreen}
        options={{
          tabBarButton: () => <LogoutButton />,
        }}
      />
      <Screen
        name="details"
        component={Details}
        options={{
          tabBarStyle: { display: "none" },
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Screen
        name="create"
        component={Create}
        options={{
          tabBarStyle: { display: "none" },
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Screen
        name="edit"
        component={Edit}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Screen
        name="myAdDetails"
        component={MyAdDetails}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Screen
        name="preview"
        component={Preview}
        options={{
          tabBarStyle: { display: "none" },
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />
    </Navigator>
  )
}
