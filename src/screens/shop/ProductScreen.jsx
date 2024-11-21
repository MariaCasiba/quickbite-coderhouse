

import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, Image, useWindowDimensions, View, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../global/colors';
import { useDispatch, useSelector } from 'react-redux';
import NunitoText from '../../components/NunitoText';
import DiscountBadge from '../../components/DiscountBadge';
import { addItem } from '../../features/cart/cartSlice';
import { useGetProductQuery } from '../../services/shopService';
import ModalMessage from '../../components/ModalMessage';  // Importa el componente del modal

const ProductScreen = ({ navigation }) => {
    const { width } = useWindowDimensions();
    const productIdSelected = useSelector(state => state.shopReducer.value.productIdSelected);

    const { data: productFound, error, isLoading } = useGetProductQuery(productIdSelected);

    const dispatch = useDispatch();

    
    const [modalVisible, setModalVisible] = useState(false);

    const user = useSelector(state => state.authReducer.value)
    //console.log("user: ", user)

    const handleAddToCart = () => {
        if (!user || !user.token) {
            setModalVisible(true)
        }
        else {
            const itemToAdd = {
                id: productFound.id,
                title: productFound.title,
                price: productFound.price,
                mainImage: productFound.mainImage,
                quantity: 1,
            };
            dispatch(addItem(itemToAdd));
            setModalVisible(true); 
        };
        }
        

    return (
        <>
            {isLoading ? (
                <>
                    <Text style={styles.loadingText}>Cargando producto...</Text>
                    <ActivityIndicator size="small" color={colors.marronOscuro} />
                </>
            ) : error ? (
                <Text style={styles.errorText}>Error al cargar el producto</Text>
            ) : (
                <ScrollView contentContainerStyle={styles.container}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Icon style={styles.icon} name="arrow-back-ios" size={30} />
                    </Pressable>

                    <Text style={styles.textTitle}>{productFound.title}</Text>
                    <Image
                        source={{ uri: productFound.mainImage }}
                        alt={productFound.title}
                        width="100%"
                        height={width * 0.7}
                        resizeMode="contain"
                    />
                    <NunitoText style={styles.longDescription}>{productFound.longDescription}</NunitoText>
                    <View style={styles.tagsContainer}>
                        <Text style={styles.tagText}>Tags: </Text>
                        {productFound.tags?.map(tag => (
                            <Text key={Math.random()} style={styles.tagText}>
                                {tag}
                            </Text>
                        ))}
                    </View>
                    {productFound.discount > 0 && (
                        <View style={styles.discountContainer}>
                            <DiscountBadge discount={productFound.discount} />
                        </View>
                    )}
                    {productFound.stock <= 0 && <Text style={styles.noStockText}>Sin Stock</Text>}
                    <Text style={styles.price}>Precio: $ {productFound.price}</Text>
                    <Pressable
                        style={({ pressed }) => [
                            { backgroundColor: pressed ? colors.marronOscuro : colors.marronSuave },
                            styles.addToCartButton,
                        ]}
                        onPress={handleAddToCart} 
                    >
                        <Text style={styles.textAddToCart}>Agregar al carrito</Text>
                    </Pressable>
                </ScrollView>
            )}

            
            <ModalMessage
                visible={modalVisible}  
                message={user && user.token ? "¡Producto agregado al carrito!" : "Debes estar logueado para agregar un producto al carrito"}
                onClose={() => setModalVisible(false)}  
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    icon: {
        color: colors.marronOscuro,
        alignSelf: 'flex-end',
        padding: 5,
    },
    textTitle: {
        fontFamily: 'Gloock',
        fontSize: 24,
        alignSelf: 'center',
        color: colors.marronOscuro,
        marginBottom: 8,
    },
    longDescription: {
        fontSize: 16,
        textAlign: 'justify',
        padding: 8,
        marginTop: 8,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
        marginVertical: 8,
        padding: 8,
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
        alignSelf: 'flex-start',
        marginLeft: 8,
        marginTop: 10,
    },
    noStockText: {
        color: 'red',
    },
    price: {
        fontSize: 22,
        fontWeight: '700',
        alignSelf: 'center',
        paddingVertical: 16,
    },
    addToCartButton: {
        padding: 8,
        paddingHorizontal: 16,
        borderRadius: 16,
        marginVertical: 16,
        
    },
    textAddToCart: {
        color: colors.blanco,
        fontSize: 22,
        textAlign: 'center',
    },
    loadingText: {
        fontFamily: 'Gloock',
        fontSize: 16,
        textAlign: 'center',
        margin: 26,
        color: colors.marronOscuro,
    },
    errorText: {
        fontFamily: 'Gloock',
        fontSize: 18,
        textAlign: 'center',
        margin: 26,
        color: colors.rojo,
        padding: 16,
        backgroundColor: colors.beigeDorado,
    },
});

export default ProductScreen;