import { StyleSheet, Text, FlatList, Image, Pressable, useWindowDimensions, ActivityIndicator, View } from 'react-native';
import FlatCard from '../../components/FlatCard';
import Banner from '../../components/Banner';
import { colors } from '../../global/colors';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // con useDispatch puedo usar el reducer del state. con useSelector selecciono algo del estado global. Dispatch para hacer un cambio
import { setCategory } from '../../features/shop/shopSlice';
import { useGetCategoriesQuery } from '../../services/shopService';
import PromoList from '../../components/PromoList';
import { clearUser } from '../../features/auth/authSlice';
import Toast from 'react-native-toast-message';
import toastConfig from '../../config/toastConfig';


const CategoriesScreen = ({navigation}) => {
    const {width, height} = useWindowDimensions()
    const isSmallScreen = width <= 360;
    const [isPortrait, setIsPortrait] = useState(true)

    const { data: categories, error, isLoading } = useGetCategoriesQuery()
    
    const user = useSelector((state) => state.authReducer.value )
    
    const dispatch = useDispatch()


    useEffect(()=>{
        if (width>height) {
            setIsPortrait(false)
        } else{
            setIsPortrait(true)
        }
    }, [width, height])

    const handleLogout = () => {
        dispatch(clearUser())
        Toast.show({
            type: 'success',
            text1: 'Sesión cerrada',
            text2: 'Has salido exitosamente',
            visibilityTime: 3000,
            position: 'top',
        });
        
    }
    
    const renderCategoryItem = ({item, index}) => {
        return (
                <Pressable onPress={()=> {
                    dispatch(setCategory(item.title)) // esto es action.payload
                    navigation.navigate('Productos') 
                    }}>

                <FlatCard style={
                    index%2==0?
                    {...styles.categoryItemContainer, ...styles.row}
                    :
                    {...styles.categoryItemContainer,...styles.rowReverse}
                }>
                    <Image 
                        source={{uri: item.image}}
                        style={styles.image}
                        resizeMode='contain'
                    />
                    <Text style={isSmallScreen?styles.categoryTitleSmall: styles.categoryTitle}>{item.title}</Text>
                </FlatCard>
                </Pressable>

        )
    }


    return (
        <>
            {
                isLoading
                ?
                <>
                    <Text style={styles.loadingText}>Cargando categorías...</Text>
                    <ActivityIndicator size="small" color={colors.marronOscuro} />
                </>
                : 
                error 
                ?
                <Text style={styles.categoryError}>Error! No se pudieron cargar las categorías de productos disponibles</Text>
                :
                <>
                <Banner />
                <PromoList navigation={navigation} />
                {user.email && user.token
                    ?
                    <Text style={styles.greetingText}>¡Hola, {user.email}!</Text>
                    :
                    <Text style={styles.greetingText}>¡Bienvenido!, inicia sesión o regístrate para más beneficios. </Text>
                }
                {user.email && user.token
                    ?
                    <Pressable onPress={handleLogout} style={styles.logoutButton}>
                            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
                    </Pressable>
                    :
                    <Pressable onPress={handleLogout} style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>Ir al login</Text>
                    </Pressable>
                }
                        
                <Text style={isSmallScreen? styles.categoriesScreenTitleSmall : styles.categoriesScreenTitle}>Hacé tu pedido:</Text>
                <FlatList
                    data={categories}
                    keyExtractor={item=> item.id}
                    renderItem={renderCategoryItem}
                    />

                </>
            }
            <Toast config={toastConfig} />
        </>
    )
}

export default CategoriesScreen

const styles = StyleSheet.create({
    categoryItemContainer:{
        justifyContent: "space-around",
        alignItems: "center",
        marginHorizontal: 30,
        marginVertical:10,
        padding: 20,
        
    },
    image:{
        width: 140,
        height: 140
    }, 
    categoryTitle: {
        fontSize: 18,
        fontWeight: "bold"
    },
    categoryTitleSmall:{
        fontSize: 14,
        fontWeight: "bold"
    },
    row:{
        flexDirection: "row"
    },
    rowReverse:{
        flexDirection: "row-reverse"
    },
    categoriesContainer:{
        backgroundColor: colors.marronSuave
    },
    categoriesScreenTitle:{
        fontFamily: 'Gloock',
        fontSize: 22,
        textAlign: 'center',
        marginVertical: 16,
        color: colors.marronOscuro
    },
    categoriesScreenTitleSmall:{
        fontFamily: 'Gloock',
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 12,
        color: colors.marronOscuro
    },
    categoryError: {
        fontFamily: 'Gloock',
        fontSize: 18,
        textAlign: 'center',
        margin: 26,
        color: colors.rojo,
        padding: 16,
        backgroundColor: colors.beigeDorado
    },
    loadingText:{
        fontFamily: 'Gloock',
        fontSize: 16,
        textAlign: 'center',
        margin: 26,
        color: colors.marronOscuro,
    },
    greetingText: {
        fontSize: 16,
        textAlign: 'right',
        marginTop: 18,
        paddingHorizontal: 8,
        color: colors.negro,
    },
    logoutButton: {
        marginTop: 6,
        marginHorizontal: 6,
        paddingHorizontal: 10,
        backgroundColor: colors.marronOscuro,
        borderRadius: 8,
        alignSelf: 'flex-end'
    },
    logoutButtonText: {
        fontSize: 14,
        color: 'white',
        padding: 4,
        
    },
    loginButton: {
        marginTop: 6,
        marginHorizontal: 6,
        paddingHorizontal: 10,
        backgroundColor: colors.beigeDorado,
        borderRadius: 8,
        alignSelf: 'flex-end',
    },
    loginButtonText: {
        fontSize: 14,
        color: colors.marronOscuro,
        padding: 4,
    },
})