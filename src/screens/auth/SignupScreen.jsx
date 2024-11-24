import { StyleSheet, Text, TextInput, View, Pressable, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { colors } from '../../global/colors';
import Header from '../../components/Header';
import { useSignupMutation } from '../../services/authService';
import { usePutUserProfileMutation } from '../../services/userService';
import { setUser } from '../../features/auth/authSlice';
import { validationSchema } from '../../validations/validationSchema';


const textInputWidth = Dimensions.get('window').width * 0.8;

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");

    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
    const [errorFirstName, setErrorFirstName] = useState("");
    const [errorLastName, setErrorLastName] = useState("");
    const [errorAddress, setErrorAddress] = useState("");
    const [genericValidationError, setGenericValidationError] = useState("")
    const [errorAddUser, setErrorAddUser] = useState("")
 

    const [triggerSignup, result] = useSignupMutation();
    const [triggerPutUserProfile] = usePutUserProfileMutation();
    const dispatch = useDispatch();

    

    useEffect(() => {
        if (result.status === "rejected") {
            console.log("Error. No se pudo agregar el usuario", result);
            setErrorAddUser("No se pudo agregar el usuario. Intente nuevamente")



        } else if (result.status === "fulfilled") {
            console.log("Usuario agregado con éxito");
        

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
            
        }

    }, [result, dispatch, firstName, lastName, address, triggerPutUserProfile]);

    const onsubmit = () => {

        try {
            validationSchema.validateSync({ email, password, confirmPassword,firstName, lastName,address })
            setErrorEmail("")
            setErrorPassword("")
            setErrorConfirmPassword("")
            setErrorFirstName("")
            setErrorLastName("")
            setErrorAddress("")
            triggerSignup({
                email,
                password,
                firstName,
                lastName,
                address
            });
            
        } catch (error) {
            switch (error.path) {
                case "email":
                    setErrorEmail(error.message)
                    break
                case "password":
                    setErrorPassword(error.message)
                    break
                case "confirmPassword":
                    setErrorConfirmPassword(error.message)
                    break
                case "firstName":
                    setErrorFirstName(error.message)
                    break 
                case "lastName":
                    setErrorLastName(error.message)
                    break   
                case "address":
                    setErrorAddress(error.message)
                    break 
                default:
                    setGenericValidationError(error.message)
                    break
                
            }
            
        }



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
                {(errorEmail && !errorPassword) && <Text style={styles.error}>{errorEmail}</Text>}
                <TextInput 
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor={colors.beigeClaro}
                    placeholder='Password'
                    style={styles.textInput}
                    secureTextEntry
                />
                {errorPassword && <Text style={styles.error}>{errorPassword}</Text>}
                <TextInput 
                    onChangeText={(text) => setConfirmPassword(text)}
                    placeholderTextColor={colors.beigeClaro}
                    placeholder='Repetir password'
                    style={styles.textInput}
                    secureTextEntry
                />
                {errorConfirmPassword && <Text style={styles.error}>{errorConfirmPassword}</Text>}
                
                <TextInput 
                    onChangeText={(text) => setFirstName(text)}
                    placeholderTextColor={colors.beigeClaro}
                    placeholder='Nombre'
                    style={styles.textInput}
                />
                {errorFirstName && <Text style={styles.error}>{errorFirstName}</Text>}
                <TextInput 
                    onChangeText={(text) => setLastName(text)}
                    placeholderTextColor={colors.beigeClaro}
                    placeholder='Apellido'
                    style={styles.textInput}
                />
                {errorLastName && <Text style={styles.error}>{errorLastName}</Text>}
                <TextInput 
                    onChangeText={(text) => setAddress(text)}
                    placeholderTextColor={colors.beigeClaro}
                    placeholder='Dirección'
                    style={styles.textInput}
                />
                {errorAddress && <Text style={styles.error}>{errorAddress}</Text>}
                
            </View>
            <Pressable style={styles.btn} onPress={onsubmit}>
                <Text style={styles.btnText}>Crear cuenta</Text>
                {errorAddUser && <Text style={styles.error}>{errorAddUser}</Text>}
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
    error: {
        color: colors.rojo
    }
});