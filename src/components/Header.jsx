import { StyleSheet, View, Image, useWindowDimensions, Pressable } from 'react-native';
import {colors} from "../global/colors.js";
import { SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { clearUser } from '../features/auth/authSlice.js';
import { clearSessions } from '../db/index.js';

const Header = ({subtitle}) => {
    const {width, height} = useWindowDimensions();
    
    const user = useSelector(state => state.authReducer.value.email)
    const dispatch = useDispatch()

    const onLogout = ()=>{
        dispatch(clearUser())
        clearSessions()
            .then(()=>console.log("Sesión eliminada"))
            .catch((error)=>console.log("Error al eliminar la sesión"))
        }


    return (
        
        <SafeAreaView style={width<=300?styles.headerContainerSmall: styles.headerContainer}>
            <Image 
                source={{ uri: 'https://i.postimg.cc/gk6hQ9X1/logoquickbite.webp' }} 
                style={width<=300?styles.logoSmall: styles.logo} 
                resizeMode="contain" 
            />
            {
                user &&  <Pressable onPress={onLogout} style={styles.access}><MaterialIcons name="logout" size={16} color={colors.marronOscuro} /></Pressable>
            }
        </SafeAreaView>
    )
}

export default Header

const styles = StyleSheet.create({
    headerContainer:{
        maxHeight:200,
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.beigeOscuro,
        padding: 10,
        marginVertical: 12
    },
    headerContainerSmall:{
        maxHeight:80,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.beigeOscuro, 
        padding: 10
    },
    logo: {
        width: 200, 
        height: 200, 
    
    },
    logoSmall: {
        width: 60, 
        height: 60, 
    },
    access:{
        alignSelf: "flex-end",
        paddingRight: 16
    } 
    
})