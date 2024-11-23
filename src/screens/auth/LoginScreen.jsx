

import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { colors } from '../../global/colors'
import { useState, useEffect } from 'react';
import { setUser } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../services/authService';
import { useGetUserProfileQuery } from '../../services/userService';
import Header from '../../components/Header';
import  Icon from 'react-native-vector-icons/MaterialIcons';
import { insertSession, clearSessions } from '../../db';

const textInputWidth = Dimensions.get('window').width * 0.7

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [rememberMe, setRememberMe] = useState(false)


    const dispatch = useDispatch()

    const [triggerLogin, result] = useLoginMutation()

    const { data:  userProfileData, error: userProfileError } = useGetUserProfileQuery(result.data?.localId, {
        skip: !result.isSuccess
    })

    useEffect(() => {
            if (result.isSuccess) {
            console.log("Usuario logueado con éxito")
            console.log("result.data: ", result.data)

            const { localId, email, idToken } = result.data

            
            if (userProfileData) {
                console.log("userProfileData: ", userProfileData)

                dispatch(setUser({
                    email,
                    localId,
                    idToken,
                    firstName: userProfileData.firstName,
                    lastName: userProfileData.lastName,
                    address: userProfileData.address
                }))
            }
            



            if (rememberMe) {

                clearSessions().then(() => console.log("sesiones eliminadas")).catch(error => console.log("Error al eliminar las sesiones: ", error))
                .then (() => 
                insertSession({
                email,
                localId,
                token: idToken,
                firstName: userProfileData.firstName,
                lastName: userProfileData.lastName,
                address: userProfileData.address
                })
                .then(res => console.log("Usuario insertado con éxito",res))
                .catch(error => console.log("Error al insertar usuario",error))
    )}
        
            }
        }, [result,rememberMe, userProfileData])


    

    const onsubmit = ()=>{
        triggerLogin({email,password})
    }

    // falta ver yup para las validaciones
    
    return (
        <>

            <Header />
            <Text style={styles.loginScreenTitle}>Loguéate</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor={colors.beigeClaro}
                    placeholder="Email"
                    style={styles.textInput}
                />
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor={colors.beigeClaro}
                    placeholder='Password'
                    style={styles.textInput}
                    secureTextEntry
                />


            <Pressable style={styles.btn} onPress={onsubmit}><Text style={styles.btnText}>Iniciar sesión</Text></Pressable>

            </View>
            <View style={styles.rememberMeContainer}>
                <Text style={styles.rememberMeText}>Mantener la sesión iniciada</Text>
                {
                    rememberMe
                    ?
                    <Pressable onPress={() => setRememberMe(!rememberMe)}><Icon name="toggle-on" size={48} color={colors.marronOscuro} /></Pressable>
                    :
                    <Pressable onPress={() => setRememberMe(!rememberMe)}><Icon name="toggle-off" size={48} color={colors.marronSuave} /></Pressable>
                }
            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.footText}>¿No tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.footTextColor}>Regístrate</Text>
                </Pressable>
            </View>

            <View style={styles.guestOptionContainer}>
                <Text style={styles.footText}>Si prefieres entrar como invitado:</Text>
                <Pressable onPress={()=> dispatch(setUser({email:"demo@quickbite.com", token:"demo"}))}>
                    <Text style={styles.footTextColor}>Entrar</Text>
                </Pressable>
            </View>
        </>
            

    )
}

export default LoginScreen

const styles = StyleSheet.create({
    
    loginScreenTitle: {
            fontFamily: 'Gloock',
            fontSize: 22,
            textAlign: 'center',
            marginVertical: 16,
            color: colors.marronOscuro
        },
    inputContainer:{
        gap: 14,
        margin: 16,
        marginTop: 48,
        alignItems: 'center',
    },
    textInput: {
        padding: 8,
        paddingLeft: 16,
        borderRadius: 16,
        backgroundColor: colors.marronOscuro,
        width: textInputWidth,
        color: colors.blanco,
    },
    footTextContainer: {
        marginTop: 16,
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between', 
    
    },
    footText:{
        fontFamily: 'Gloock',
        fontSize: 16,
        textAlign: 'center',
        margin: 20,
        color: colors.negro,
    },
    footTextColor:{
        fontFamily: 'Gloock',
        fontSize: 16,
        textAlign: 'center',
        margin: 20,
        color: colors.rojo,
        textDecorationLine: 'underline'
    },
    btn: {
        width: '60%',
        alignSelf: 'center',
        padding: 16,
        paddingHorizontal: 32,
        backgroundColor: colors.marronSuave,
        borderRadius: 16,
        marginTop: 18
    },
    btnText: {
        color: colors.blanco,
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center'
    },
    guestOptionContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingHorizontal: 12,
    
    },
    rememberMeContainer: {
        flexDirection: "row",
        gap: 2,
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 8,
        marginHorizontal: 20,
        paddingHorizontal: 12
    }
})