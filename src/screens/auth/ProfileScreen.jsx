import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import { colors } from '../../global/colors'
import CameraIcon from '../../components/CameraIcon'
import { useSelector, useDispatch } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import { setProfilePicture } from '../../features/auth/authSlice'
import { usePutProfilePictureMutation } from '../../services/userService'



const ProfileScreen = () => {

    const user = useSelector(state => state.authReducer.value.email)
    const image = useSelector(state => state.authReducer.value.profilePicture)
    const localId = useSelector(state => state.authReducer.value.localId)
    const firstName = useSelector(state => state.authReducer.value.firstName)
    const lastName = useSelector(state => state.authReducer.value.lastName)
    const address = useSelector(state => state.authReducer.value.address)


    const dispatch = useDispatch()

    const [ triggerPutProfilePicture, result ] = usePutProfilePictureMutation()

    const verifyCameraPermissions = async () => {
        const {granted} = await ImagePicker.requestCameraPermissionsAsync()
        if(!granted) return false
        return true
    }

    const pickImage = async () =>{
        const permissionOk = await verifyCameraPermissions()
        if(permissionOk){
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1,1],
                base64: true,
                quality: 0.7
            })
            
            if(!result.canceled){
                dispatch(setProfilePicture(`data:image/jpeg;base64,${result.assets[0].base64}`))
                triggerPutProfilePicture({image:`data:image/jpeg;base64,${result.assets[0].base64}`, localId})
            }
        }else{
            console.log("Permisos denegados")
        }
    }
    
    return (
        
        <View style={styles.profileContainer}>
            <Text style={styles.profileScreenTitle}>Mi perfil</Text>
            <View style={styles.imageProfileContainer}>
                {
                    image
                        ?
                        <Image source={{ uri: image }} resizeMode='cover' style={styles.profileImage} />
                        :
                        <Text style={styles.textProfilePlaceHolder}>{user.charAt(0).toUpperCase()}</Text>
                        
                }
                <Pressable onPress={pickImage} style={({ pressed }) => [{ opacity: pressed ? 0.90 : 1 }, styles.cameraIcon]} >
                    <CameraIcon /> 
                </Pressable>
            </View>
            <View>
                <Text style={styles.profileData}>Email: {user}</Text>
                <Text style={styles.profileData}>Nombre: {firstName} {lastName}</Text>
                <Text style={styles.profileData}>Dirección: {address}</Text>
            </View>
            
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    profileContainer: {
        padding: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageProfileContainer: {
        width: 128,
        height: 128,
        borderRadius: 64,
        backgroundColor: colors.marronOscuro,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative'

    },
    profileScreenTitle: {
        fontFamily: 'Gloock',
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 20,
        color: colors.marronOscuro,
    },
    textProfilePlaceHolder: {
        color: colors.beigeClaro,
        fontSize: 48,
    },
    profileData: {
        paddingVertical: 8,
        fontSize: 16,
        color: colors.marronOscuro
    },
    cameraIcon: {
        position: 'absolute',
        bottom: -10,
        right: -10,
    },
    profileImage: {
        width: 128,
        height: 128,
        borderRadius: 64
    }
})
