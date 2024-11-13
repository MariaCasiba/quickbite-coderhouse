import { StyleSheet, View } from 'react-native';
import { colors } from '../global/colors';

export default function FlatCard({children, style}) {
    return (
        <View style={{...styles.cardContainer, ...style}}>
        {children}
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer:{
        backgroundColor: colors.beigeDorado,
        shadowColor: colors.marronOscuro,
        shadowOpacity: 1,
        shadowRadius: 1,
        shadowOffset: {width: 3, height:5},
        elevation: 10
    },

})