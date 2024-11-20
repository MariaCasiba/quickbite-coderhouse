import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/auth/ProfileScreen";
import Header from "../components/Header";

const ProfileStack = createNativeStackNavigator() 

    const ProfileNavigator = () => {
        return (
            <ProfileStack.Navigator 
            screenOptions={{
                header: ({route})=><Header subtitle={route.name}/>,  
        }}
        >
            <ProfileStack.Screen component={ProfileScreen} name="Perfil" />
        </ProfileStack.Navigator>
    )
}

export default ProfileNavigator