
import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react';
import { colors } from '../../global/colors';
import { useDispatch, useSelector } from 'react-redux';
import { usePostReceiptMutation } from '../../services/receiptsService';
import { clearCart } from '../../features/cart/cartSlice';
import CartItem from '../../components/CartItem';
import ModalMessage from '../../components/ModalMessage';
import NunitoText from '../../components/NunitoText';
import { useState } from 'react';


const CartScreen = ({navigation}) => {

    const cart = useSelector(state => state.cartReducer.value.cartItems)
    const total = useSelector(state => state.cartReducer.value.total)
    const cartLength = useSelector(state => state.cartReducer.value.cartLength)
    const user = useSelector(state => state.authReducer.value)

    const [modalVisible, setModalVisible] = useState(false);

    const [triggerPost] = usePostReceiptMutation()

    const dispatch = useDispatch()

    const FooterComponent = () => {

        return(
            <View style={styles.footerContainer}>
                <NunitoText style={styles.footerTotal}>Precio Total: $ {total} </NunitoText>
                <Pressable style={styles.confirmButton} onPress={()=> {
                    setModalVisible(true)
                }}
                > 
                    <NunitoText style={styles.confirmButtonText}>Confirmar pedido</NunitoText>
                </Pressable>
            </View>
        )
    }

    const renderCartItem = ({ item }) => <CartItem item={item} />;

    const EmptyCartComponent = () => (
        <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>No hay productos en tu carrito</Text>
        </View>
    );


    return (
        <>
            {cartLength === 0 ? (
                <EmptyCartComponent />
            ) : (
                <FlatList
                    data={cart}
                    keyExtractor={item => item.id}
                    renderItem={renderCartItem}
                    ListHeaderComponent={<Text style={styles.cartScreenTitle}>Tu pedido:</Text>}
                    ListFooterComponent={<FooterComponent />}
                />
            )}

            {modalVisible && (
                <ModalMessage
                    visible={modalVisible}
                    message={`Tu pedido ha sido confirmado.`}
                    onClose={() => {
                        triggerPost({ cart, total, createdAt: Date.now(), userId: user.email });
                        dispatch(clearCart());
                        navigation.navigate("Categorías");
                        setModalVisible(false); 
                    }}
                />
            )}
        </>
    );

}

export default CartScreen

const styles = StyleSheet.create({
    footerContainer: {
        padding: 32,
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerTotal: {
        fontSize: 22,
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
    },
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    emptyCartText: {
        fontSize: 18,
        fontStyle: 'italic',
        color: 'gray',
    },
})

