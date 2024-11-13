import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import FontAwsome  from "react-native-vector-icons/FontAwesome";

import ShopNavigator from "./ShopNavigator";
import CartNavigator from "./CartNavigator";
import ReceiptsNavigator from "./ReceiptsNavigator";
import { colors } from "../global/colors";

const Tab = createBottomTabNavigator();


const TabNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator 
                initialRouteName="Shop"
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: styles.tabBar

                }}
            >
                <Tab.Screen 
                    name="Shop" 
                    component={ShopNavigator}
                    options={{
                        tabBarIcon: ({focused})=>(<FontAwsome name="shopping-bag" size={24} color={focused ? colors.marronOscuro : colors.blanco} />)
                    }}
                    />
                <Tab.Screen 
                    name="Cart" 
                    component={CartNavigator} 
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <FontAwsome name="shopping-cart" size={24} color={focused ? colors.marronOscuro : colors.blanco} />
                        )
                    }}
                    />
                <Tab.Screen 
                    name="Receipts" 
                    component={ReceiptsNavigator} 
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <FontAwsome name="file" size={24} color={focused ? colors.marronOscuro : colors.blanco} />
                        )
                    }}
                    />
                
            </Tab.Navigator> 
        </NavigationContainer>
    )
}


export default TabNavigator

const styles = StyleSheet.create({
    tabBar:{
        height: 64,
        backgroundColor: colors.beigeDorado
    }
})

