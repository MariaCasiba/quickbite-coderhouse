import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react';
import cart from "../data/cart.json";
import { colors } from '../global/colors';
import CartItem from '../components/CartItem';
import NunitoText from '../components/NunitoText';


const CartScreen = () => {
    const [total, setTotal] = useState(0);

    /*
    useEffect(()=>{
        let acumulador = 0
        cart.map(item=>acumulador += item.price*item.quantity)
        setTotal(acumulador)
    }, [cart])*/

    useEffect(()=>{
        setTotal(cart.reduce((acumulador, item)=>(acumulador+=item.price*item.quantity),0))
    }, [cart])

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

    return (
        <FlatList 
            data={cart}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <CartItem item={item} />}
            ListHeaderComponent={<Text style={styles.cartScreenTitle}>Tu pedido:</Text>}
            ListFooterComponent={<FooterComponent />}
        />
    )
    
    
}

export default CartScreen

const styles = StyleSheet.create({
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
