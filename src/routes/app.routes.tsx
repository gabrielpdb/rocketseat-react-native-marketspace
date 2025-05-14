import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs"
import { Create } from "@screens/Create"
import { Details } from "@screens/Details"
import { Edit } from "@screens/Edit"
import { Home } from "@screens/Home"
import { MyAdDetails } from "@screens/MyAdDetails"
import { MyAds } from "@screens/MyAds"
import { Preview } from "@screens/Preview"

type AppRoutes = {
  home: undefined
  details: undefined
  myAds: undefined
  myAdDetails: undefined
  create: undefined
  preview: undefined
  edit: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  return (
    <Navigator>
      <Screen name="home" component={Home} />
      <Screen name="details" component={Details} />
      <Screen name="create" component={Create} />
      <Screen name="edit" component={Edit} />
      <Screen name="myAdDetails" component={MyAdDetails} />
      <Screen name="myAds" component={MyAds} />
      <Screen name="preview" component={Preview} />
    </Navigator>
  )
}
