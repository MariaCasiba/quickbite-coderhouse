import { View, StyleSheet } from "react-native";
import { colors } from '../global/colors';
import NunitoText from './NunitoText';

const DiscountBadge = ({ discount }) => {
    return (
        <View style={styles.discountContainer}>
            <NunitoText style={styles.discountText}>Descuento: -{discount}%</NunitoText>
        </View>
    );
};

const styles = StyleSheet.create({
    discountContainer: {
        backgroundColor: colors.rojo,
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 16,
        alignSelf: "flex-start",
        
    },
    discountText: {
        color: colors.blanco,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: 'center',
    }
});

export default DiscountBadge;