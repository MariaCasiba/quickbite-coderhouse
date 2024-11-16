import { StyleSheet, Text, Pressable, Image, useWindowDimensions, View, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../global/colors';
//import products from "../data/products.json";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NunitoText from '../components/NunitoText';
import DiscountBadge from '../components/DiscountBadge';
import { addItem } from '../features/cart/cartSlice';
import { useGetProductQuery } from '../services/shopService';


const ProductScreen = ({ navigation }) => {

    const {width} = useWindowDimensions();

     //const productId = route.params;
    const productIdSelected = useSelector(state => state.shopReducer.value.productIdSelected)
    //const products = useSelector(state => state.shopReducer.value.products)
    //console.log("productIdSelected: ", productIdSelected)

    //const [productFound, setProductFound] = useState({});

    /*
    useEffect(()=>{
        if (productIdSelected) {
            const product = products.find(product =>  product.id === productIdSelected)
            setProductFound(product)  
        }
    }, [productIdSelected, products])


    if (!productFound) {
        return <Text>Cargando producto...</Text>;  
    }*/

    const {data: productFound, error, isLoading} = useGetProductQuery(productIdSelected)
    
    /*
    useEffect(() => {
        console.log("Product Found after transformResponse: ", productFound);
    }, [productFound]);
    */

    const dispatch = useDispatch()
    
    return (
        <>
            {
                isLoading 
                ?
                <>
                    <Text style={styles.loadingText}>Cargando productos...</Text>
                    <ActivityIndicator size="small" color={colors.marronOscuro} />

                </>
                :
                error
                ?
                <Text style={styles.errorText}>Error al cargar el producto</Text>
                :
        
                <ScrollView contentContainerStyle={styles.container}>
                    <Pressable onPress={()=> navigation.goBack()}><Icon style={styles.icon} name='arrow-back-ios' size={30}  /></Pressable>

                    <Text style={styles.textTitle}>{productFound.title}</Text>
                    <Image 
                        source={{uri: productFound.mainImage}}
                        alt={productFound.title}
                        width="100%"
                        height={width * .7}
                        resizeMode= "contain"
                    />
                    <NunitoText style={styles.longDescription}>{productFound.longDescription}</NunitoText>
                    <View style={styles.tagsContainer}>
                        <Text style={styles.tagText}>Tags: </Text>
                        {
                            productFound.tags?.map(tag => (
                            <Text key={Math.random()} style={styles.tagText}>{tag}</Text>
                        ))}
                    </View>
                    {productFound.discount > 0 && (    
                        <View style={styles.discountContainer}>
                            <DiscountBadge discount={productFound.discount} />
                        </View>
                    )}
                    {
                        productFound.stock <= 0 && <Text style={styles.noStockText}>Sin Stock</Text>
                    }
                    <Text style={styles.price}>Precio: $ {productFound.price}</Text>
                    <Pressable 
                        style={({ pressed }) => [{backgroundColor: pressed? colors.marronOscuro : colors.marronSuave }, styles.addToCartButton]}
                        onPress={() => dispatch(addItem({...productFound, quantity:1 }))}>
                        <Text style={styles.textAddToCart}>Agregar al carrito</Text>
                    </Pressable>
                </ScrollView>
            }
        </>
    );
}

export default ProductScreen

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 16,
        paddingBottom: 20
    },
    icon:{
        color: colors.marronOscuro,
        alignSelf: 'flex-end',
        padding: 5
    },
    textTitle: {
        fontFamily: 'Gloock',
        fontSize: 24,
        alignSelf: "center",
        color: colors.marronOscuro,
        marginBottom: 8
    },
    longDescription: {
        fontSize: 16,
        textAlign: 'justify',
        padding: 8,
        marginTop: 8
        
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: "wrap",
        gap: 5,
        marginVertical: 8,
        padding: 8
    },
    tagText: {
        fontSize: 14,
        color: colors.marronOscuro,
    },
    discountContainer: {
        backgroundColor: colors.rojo,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 16,
        alignSelf: "flex-start",
        marginLeft: 8,
        marginTop: 10
    },
    discountText: {
        color: colors.blanco,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: 'center',
    },
    noStockText: {
        color: 'red'
    },
    price: {
        fontSize: 22,
        fontWeight: '700',
        alignSelf: 'center',
        paddingVertical: 16
    },
    addToCartButton: {
        padding: 8,
        paddingHorizontal: 16,
        
        borderRadius: 16,
        marginVertical: 16
    },
    textAddToCart: {
        color: colors.blanco,
        fontSize: 22,
        textAlign: 'center',
    },
    loadingText:{
        fontFamily: 'Gloock',
        fontSize: 16,
        textAlign: 'center',
        margin: 26,
        color: colors.marronOscuro,
    },
    errorText:{
        fontFamily: 'Gloock',
        fontSize: 18,
        textAlign: 'center',
        margin: 26,
        color: colors.rojo,
        padding: 16,
        backgroundColor: colors.beigeDorado
    }
})