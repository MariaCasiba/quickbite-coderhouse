import { FlatList, StyleSheet, View, Text, Image, Pressable } from 'react-native';
//import products from "../data/products.json";
import FlatCard from '../components/FlatCard';
import NunitoText from '../components/NunitoText';
import { colors } from '../global/colors';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Search from '../components/Search';
import DiscountBadge from '../components/DiscountBadge';
import { useSelector, useDispatch } from 'react-redux';
import { setProductId } from '../features/shop/shopSlice';

const ProductsScreen = ({ navigation }) => {
    const [productsFiltered, setProductsFiltered] = useState([]);

    const [search, setSearch] = useState("");
    
    // const category = route.params
    const category = useSelector(state => state.shopReducer.value.categorySelected)
    const productsFilteredByCategory = useSelector(state => state.shopReducer.value.productsFilteredByCategory)

    const dispatch = useDispatch()

    // busqueda
    useEffect(()=>{
        setProductsFiltered(productsFilteredByCategory)
        if (search) {
            // buscar productos que coincidan con el título o un tag
            setProductsFiltered(productsFilteredByCategory.filter(product => {
                const filterTitle = product.title.toLowerCase().includes(search.toLowerCase())
                const filterTag = product.tags && product.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
                
                return filterTitle || filterTag;
            }));
            
        
        }
    }, [search, productsFilteredByCategory])


    const renderProductItem = ({item})=>{
        return(
            <Pressable onPress={()=> {
                dispatch(setProductId(item.id))
                navigation.navigate("Producto") }
                }>
            <FlatCard style={styles.productContainer}>
                <View>
                    <Image 
                        source={{uri: item.mainImage}}
                        style={styles.productImage}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.productDescription}>
                    <Text style={styles.productTitle}>{item.title}</Text>
                    <NunitoText style={styles.shortDescription}>{item.shortDescription}</NunitoText>
                    <View style={styles.tags}>
                        <Text style={styles.tagText}>Tags: </Text>
                        {
                            <FlatList 
                                style={styles.tags}
                                data={item.tags}
                                keyExtractor={() => Math.random()}
                                renderItem={({item}) => (<NunitoText style={styles.tagText}>{item}</NunitoText>)}
                            />
                        }
                    </View>  
                    {item.discount > 0 && <DiscountBadge discount={item.discount} />}
                    {item.stock <= 0 && <NunitoText style={styles.noStockText}>Sin stock</NunitoText>}
                    <Text style={styles.price}>Precio: $ {item.price}</Text>
                </View>    
            </FlatCard>
            </Pressable>
        )    
    }


    return (
        <>
            <Pressable onPress={()=>navigation.goBack()}><Icon style={styles.icon} name='arrow-back-ios' size={30}  /></Pressable>
            <Search setSearch={setSearch} />
            <Text style={styles.categoryTitle}>{category}</Text>
            
            {productsFiltered.length === 0 ? (
                <Text>No hay productos</Text>
            ) : (
                <FlatList 
                    data={productsFiltered}
                    keyExtractor={item=>item.id}
                    renderItem={renderProductItem}
                />
            )}
                
            
        </>

    )
}

export default ProductsScreen

const styles = StyleSheet.create({
    productContainer:{
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        gap: 15,
    },
    productImage:{
        width: 100,
        height: 100
    }, 
    productDescription: {
        width: "75%",
        padding: 20,
        gap: 10,

    },
    productTitle: {
        fontFamily: 'Gloock',
        fontSize: 22,
        color: colors.marronOscuro
        
    },
    shortDescription:{
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.rojo,
        fontStyle: 'italic'
    },
    tags:{
        flexDirection: "row",
        gap: 5
    },
    tagText:{
        fontWeight: '700',
        fontSize: 14
    },
    price: {
        fontWeight: '800',
        fontSize: 18
    },
    noStockText: {
        color: colors.rojo,
        fontSize: 16,
        fontWeight: 'bold',
        
    },
    categoryTitle:{
        fontFamily: 'Gloock',
        fontSize: 29,
        textAlign: 'center',
        marginBottom: 8,
        color: colors.marronOscuro

    },
    icon:{
        color: colors.marronOscuro,
        alignSelf: 'flex-end',
        padding: 5
    }
})