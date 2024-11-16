import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react';
//import cart from "../data/cart.json";
import { colors } from '../global/colors';
import Icon from 'react-native-vector-icons/MaterialIcons'
import CartItem from '../components/CartItem';
import FlatCard from '../components/FlatCard';
import NunitoText from '../components/NunitoText';
import { useSelector } from 'react-redux';

const CartScreen = () => {
    //const [total, setTotal] = useState(0);

    /*
    useEffect(()=>{
        let acumulador = 0
        cart.map(item=>acumulador += item.price*item.quantity)
        setTotal(acumulador)
    }, [cart])

    useEffect(()=>{
        setTotal(cart.reduce((acumulador, item)=>(acumulador+=item.price*item.quantity),0))
    }, [cart])*/

    const cart = useSelector(state => state.cartReducer.value.cartItems)
    const total = useSelector(state => state.cartReducer.value.total)

    const FooterComponent = () => {
        return(
            <View style={styles.footerContainer}>
                <NunitoText style={styles.footerTotal}>Precio Total: $ {total} </NunitoText>
                <Pressable style={styles.confirmButton}>
                    <NunitoText style={styles.confirmButtonText}>Confirmar pedido</NunitoText>
                </Pressable>
            </View>
        )
    }

    const renderCartItem = ({ item }) => (
        <FlatCard style={styles.cartContainer}>
            <View>
                <Image
                    source={{ uri: item.mainImage }}
                    style={styles.cartImage}
                    resizeMode='cover'
                />
            </View>
            <View style={styles.cartDescription}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.shortDescription}</Text>
                <Text style={styles.price}>Precio unitario: $ {item.price}</Text>
                <Text stlyle={styles.quantity}>Cantidad: {item.quantity}</Text>
                <Text style={styles.total}>Total: $ {item.quantity * item.price}</Text>
                <Icon name="delete" size={24} color={colors.rojo} style={styles.trashIcon} />
            </View>
        </FlatCard>
    )

    return (
        <FlatList 
            data={cart}
            keyExtractor={item => item.id}
            renderItem={renderCartItem} 
            ListHeaderComponent={<Text style={styles.cartScreenTitle}>Tu pedido:</Text>}
            ListFooterComponent={<FooterComponent />}
        />
    )
    
    
}

export default CartScreen

const styles = StyleSheet.create({
    cartContainer: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: "flex-start",
        margin: 16,
        alignItems: "center",
        gap: 10
    },
    cartImage: {
        width: 80,
        height: 80
    },
    cartDescription: {
        width: '80%',
        padding: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: '700'
    },
    description: {
        marginBottom: 16,
    },
    total: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: '700'
    },
    trashIcon: {
        alignSelf: 'flex-end',
        marginRight: 16,
    },
    footerContainer: {
        padding: 32,
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerTotal: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    confirmButton: {
        padding: 8,
        paddingHorizontal: 16,
        backgroundColor: colors.rojo,
        borderRadius: 16,
        marginBottom: 24,
    },
    confirmButtonText: {
        color: colors.blanco,
        fontSize: 16,
        fontWeight: 'bold'
    }, cartScreenTitle: {
        fontFamily: "Gloock",
        fontSize: 20,
        textAlign: "center",
        paddingVertical: 12
    }
})
