import { StyleSheet, Text, TextInput, View, Pressable, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { colors } from '../../global/colors';
import Header from '../../components/Header';
import { useSignupMutation } from '../../services/authService';
import { usePutUserProfileMutation } from '../../services/userService';
import { setUser } from '../../features/auth/authSlice';
import Toast from 'react-native-toast-message';


const textInputWidth = Dimensions.get('window').width * 0.8;

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");

    const [triggerSignup, result] = useSignupMutation();
    const [triggerPutUserProfile] = usePutUserProfileMutation();
    const dispatch = useDispatch();

    

    useEffect(() => {
        if (result.status === "rejected") {
            console.log("Error. No se pudo agregar el usuario", result?.error?.data?.error);

            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Error al registrar',
                text2: 'Hubo un problema al crear tu cuenta. Intenta nuevamente.',
            });

        } else if (result.status === "fulfilled") {
            console.log("Usuario agregado con éxito, result.data:" , result.data);

            const { localId } = result.data;

            triggerPutUserProfile({
                localId,
                firstName,
                lastName,
                address
            })

            dispatch(setUser({
                email:result.data.email,
                token: result.data.idToken,
                localId,
                firstName,
                lastName, 
                address,
            }));
            
            

            setTimeout(() => {
                navigation.navigate('Login');
            }, 2000); 
        }

    }, [result, dispatch, firstName, lastName, address, triggerPutUserProfile]);

    const onsubmit = () => {
        if (password !== confirmPassword) {
            console.log("Error: Las contraseñas no coinciden");
            return;
        }

        if (!email || !password || !confirmPassword || !firstName || !lastName || !address) {
            console.log("Todos los campos son obligatorios.");
            return;
        }

        triggerSignup({
            email,
            password,
            firstName,
            lastName,
            address
        });
    };

    return (
        <>
            <Header />
            <Text style={styles.signUpScreenTitle}>Regístrate</Text>
            <View style={styles.inputContainer}>
                
                <TextInput 
                    onChangeText={(text) => setFirstName(text)}
                    placeholderTextColor={colors.beigeClaro}
                    placeholder='Nombre'
                    style={styles.textInput}
                />
                <TextInput 
                    onChangeText={(text) => setLastName(text)}
                    placeholderTextColor={colors.beigeClaro}
                    placeholder='Apellido'
                    style={styles.textInput}
                />
                <TextInput 
                    onChangeText={(text) => setAddress(text)}
                    placeholderTextColor={colors.beigeClaro}
                    placeholder='Dirección'
                    style={styles.textInput}
                />
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
            <Toast />
            
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
});