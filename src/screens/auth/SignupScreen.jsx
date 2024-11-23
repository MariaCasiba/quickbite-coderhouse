/*
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
*/

import { StyleSheet, Text, TextInput, View, Pressable, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { colors } from '../../global/colors';
import Header from '../../components/Header';
import { useSignupMutation } from '../../services/authService';
import { setUser } from '../../features/auth/authSlice';

const textInputWidth = Dimensions.get('window').width * 0.8;

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");

    const [triggerSignup, result] = useSignupMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (result.status === "rejected") {
            console.log("Error. No se pudo agregar el usuario", result?.error?.data?.error);
        } else if (result.status === "fulfilled") {
            console.log("Usuario agregado con éxito");
            dispatch(setUser(result.data));
        }
    }, [result]);

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

