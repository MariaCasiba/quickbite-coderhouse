
import { StyleSheet, Text, TextInput, View, Pressable, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { colors } from '../../global/colors';
import Header from '../../components/Header';
import { useSignupMutation } from '../../services/authService';
import { setUser } from '../../features/auth/authSlice';


const textInputWidth = Dimensions.get('window').width * 0.8;


const SignupScreen = ({navigation}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("") 

    const [triggerSignup, result] = useSignupMutation()

    const dispatch = useDispatch()

    // falta agregar boton para desloguearse y saludo con el nombre del user

    useEffect(() => {
        if (result.status === "rejected") {
            console.log("Error. No se pudo agregar el usuario", result?.error?.data?.error)
            
        } else if (result.status === "fulfilled") {
            console.log("Usuario agregado con éxito")
            dispatch(setUser(result.data))
        } 
    }, [result])

    const onsubmit = () => {
        console.log("email y password: ", email, password, confirmPassword)

        if (password !== confirmPassword) {
            console.log("Error: Las contraseñas no coinciden");
            return;
        }

        if (!email || !password || !confirmPassword) {
            setError("Todos los campos son obligatorios.");
            return;
        }


        triggerSignup({email, password})
    }


    return (
        <>
            <Header />
            <Text style={styles.signUpScreenTitle}>Regístrate</Text>
            <View style={styles.inputContainer}>
                <TextInput 
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor={colors.beigeClaro}
                    placeholder='Email'
                    style={styles.textInput}
                />
                <TextInput 
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor={colors.beigeClaro}
                    placeholder='Password'
                    style={styles.textInput}
                    secureTextEntry
                />
                <TextInput 
                    onChangeText={(text) => setConfirmPassword(text)}
                    placeholderTextColor={colors.beigeClaro}
                    placeholder='Repetir password'
                    style={styles.textInput}
                    secureTextEntry
                />
            </View>
            <Pressable style={styles.btn} onPress={onsubmit}>
                <Text style={styles.btnText}>Crear cuenta</Text>
            </Pressable>
            <View style={styles.footTextContainer}>
                <Text style={styles.footText}>¿Ya tienes cuenta?:</Text>
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.footTextColor}>Iniciar sesión</Text>
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

export default SignupScreen

const styles = StyleSheet.create({
    signUpScreenTitle:{
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

})


/*
import { StyleSheet, Text, TextInput, View, Pressable, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { colors } from '../../global/colors';
import Header from '../../components/Header';
import { useSignupMutation } from '../../services/authService';
import { setUser } from '../../features/auth/authSlice';

const textInputWidth = Dimensions.get('window').width * 0.8;

const SignupScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(""); // Estado para los errores

    const [triggerSignup, result] = useSignupMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (result.status === "rejected") {
            const errorCode = result.error.data?.error?.message || "UNKNOWN_ERROR";
            
            switch (errorCode) {
                case "EMAIL_EXISTS":
                    setError("Este email ya está registrado.");
                    break;
                default:
                    setError("Ocurrió un error al registrarse. Por favor, intenta nuevamente.");
                    break;
            }
        } else if (result.status === "fulfilled") {
            console.log("Usuario agregado con éxito");
            dispatch(setUser(result.data));
        }
    }, [result]);

    const onsubmit = () => {
        console.log("email y password: ", email, password, confirmPassword);

        if (password !== confirmPassword) {
            setError("Error: Las contraseñas no coinciden");
            return;
        }

        setError(""); // Limpiar errores previos
        triggerSignup({ email, password });
    };

    return (
        <>
            <Header />
            <Text style={styles.signUpScreenTitle}>Regístrate</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor={colors.beigeClaro}
                    placeholder='Email'
                    style={styles.textInput}
                />
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor={colors.beigeClaro}
                    placeholder='Password'
                    style={styles.textInput}
                    secureTextEntry
                />
                <TextInput
                    onChangeText={(text) => setConfirmPassword(text)}
                    placeholderTextColor={colors.beigeClaro}
                    placeholder='Repetir password'
                    style={styles.textInput}
                    secureTextEntry
                />
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Pressable style={styles.btn} onPress={onsubmit}>
                <Text style={styles.btnText}>Crear cuenta</Text>
            </Pressable>
            <View style={styles.footTextContainer}>
                <Text style={styles.footText}>¿Ya tienes cuenta?:</Text>
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.footTextColor}>Iniciar sesión</Text>
                </Pressable>
            </View>

            <View style={styles.guestOptionContainer}>
                <Text style={styles.footText}>Si prefieres entrar como invitado:</Text>
                <Pressable onPress={() => dispatch(setUser({ email: "demo@quickbite.com", token: "demo" }))}>
                    <Text style={styles.footTextColor}>Entrar</Text>
                </Pressable>
            </View>
        </>
    );
};

export default SignupScreen;

const styles = StyleSheet.create({
    signUpScreenTitle: {
        fontFamily: 'Gloock',
        fontSize: 22,
        textAlign: 'center',
        marginVertical: 16,
        color: colors.marronOscuro
    },
    inputContainer: {
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
    errorText: {
        color: colors.rojo,
        fontSize: 14,
        marginTop: 8,
        textAlign: 'center',
    },
    footTextContainer: {
        marginTop: 16,
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footText: {
        fontFamily: 'Gloock',
        fontSize: 16,
        textAlign: 'center',
        margin: 20,
        color: colors.negro,
    },
    footTextColor: {
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
});
*/