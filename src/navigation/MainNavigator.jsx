import { NavigationContainer } from "@react-navigation/native";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TabNavigator from "./TabNavigator";
import AuthNavigator from "./AuthNavigator";
import { useGetProfilePictureQuery } from "../services/userService";
import { setProfilePicture, setUser } from "../features/auth/authSlice";
import { fetchSession } from "../db";

const MainNavigator = () => {
    const [isSessionLoading, setIsSessionLoading] = useState(true); // Estado de carga para la sesión

    const user = useSelector((state) => state.authReducer.value.email);
    const localId = useSelector((state) => state.authReducer.value.localId);

    const dispatch = useDispatch();

    
    const { data: profilePicture, isLoading, error } = useGetProfilePictureQuery(localId);

    
    useEffect(() => {
        if (!user) {
            (async () => {
                try {
                    const session = await fetchSession();
                    if (session.length) {
                        console.log("session _array", session);
                        dispatch(setUser(session[0]));
                    }
                } catch (error) {
                    console.log("Error al obtener la sesión", error);
                } finally {
                    setIsSessionLoading(false); 
                }
            })();
        } else {
            setIsSessionLoading(false); 
        }
    }, [user]);


    useEffect(() => {
        if (profilePicture) {
            dispatch(setProfilePicture(profilePicture.image));
        }
    }, [profilePicture]);


    if (isSessionLoading || isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Cargando...</Text>
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? <TabNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
};

export default MainNavigator;

