import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FlatCard from './FlatCard';
import { colors } from '../global/colors';
import { useDispatch } from 'react-redux';
import { removeItem } from '../features/cart/cartSlice';


const CartItem = ({ item }) => {

    const dispatch = useDispatch()

    const handleRemove = () => {
        dispatch(removeItem({ id: item.id }))
    }

    return (
        <FlatCard style={styles.cartContainer}>
            <View>
                <Image 
                    source={{uri: item.mainImage}}
                    style={styles.cartImage}
                    resizeMode='cover'
                />
            </View>
            <View style={styles.cartDescription}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.shortDescription}</Text>
                <Text style={styles.price}>Precio unitario: ${item.price}</Text>
                <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
                <Text style={styles.total}>Subtotal: ${item.quantity*item.price}</Text>
                <Pressable onPress={handleRemove}> 
                    <Icon name='delete' size={24} color={colors.rojo} style={styles.trashIcon} />
                </Pressable>           
            </View>
        </FlatCard>
    )
}

export default CartItem

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
        fontFamily: "Gloock",
        fontSize: 18,
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
    }
})


