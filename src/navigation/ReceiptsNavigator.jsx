import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ReceiptScreen } from "../screens";
import Header from "../components/Header";

const ReceiptsStack = createNativeStackNavigator()

const ReceiptsNavigator = () => {
    return (
        <ReceiptsStack.Navigator
            screenOptions={{
                header: ({route})=><Header subtitle={route.name}/>,            
            }}>
            <ReceiptsStack.Screen component={ReceiptScreen} name="receipts" />
        </ReceiptsStack.Navigator>
    )
}

export default ReceiptsNavigator

