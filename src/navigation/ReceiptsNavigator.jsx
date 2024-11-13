import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReceiptScreen from "../screens/ReceiptScreen";
import Header from "../components/Header";

const ReceiptsStack = createNativeStackNavigator()

const ReceiptsNavigator = () => {
    return (
        <ReceiptsStack.Navigator
            screenOptions={{
                header: ({route})=><Header subtitle={route.name}/>,            
            }}>
            <ReceiptsStack.Screen component={ReceiptScreen} name="Recibos" />
        </ReceiptsStack.Navigator>
    )
}

export default ReceiptsNavigator

