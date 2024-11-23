import { StyleSheet, Text, FlatList, Image, Pressable, useWindowDimensions, ActivityIndicator, View } from 'react-native';
import FlatCard from '../../components/FlatCard';
import Banner from '../../components/Banner';
import { colors } from '../../global/colors';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
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

    
    const renderCategoryItem = ({item, index}) => {
        return (
                <Pressable onPress={()=> {
                    dispatch(setCategory(item.title))
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
    user.email && (
        <Text style={styles.greetingText}>
            {user.email === "demo@quickbite.com"
                ? "¡Bienvenido! Estás navegando como "
                : "¡Hola "}
            <Text style={styles.emailText}>
                {user.email === "demo@quickbite.com"
                    ? "invitado."
                    : user.email}
            </Text>
            {user.email !== "demo@quickbite.com" && ", bienvenido/a a QuickBite!"}
        </Text>
    )
}
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
        textAlign: 'center',
        marginVertical: 20,
        paddingHorizontal: 8,
        color: colors.negro,

    }, emailText: {
        fontStyle: 'italic',
        color: colors.rojo,

    }
    
})