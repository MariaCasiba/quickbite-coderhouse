import React from 'react';
import { Text, StyleSheet, Pressable , useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { colors } from '../global/colors';

const Banner = () => {

    const { width } = useWindowDimensions();

    return (
        <Pressable style={width <=360 ? styles.bannerSmall : styles.banner} onPress={() => console.log('Banner Pressed!')}>
            <Icon name="bullhorn" size={width <=360 ? 18 : 24} color="white" /> 
            <Text style={width <= 360? styles.bannerTextSmall : styles.bannerText}>Hoy: ¡2x1 en cervezas de 19 a 21 hs!</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    banner: {
        backgroundColor: colors.rojo, 
        padding: 10,
        borderRadius: 10,
        borderWidth: 2, 
        borderColor: colors.marronOscuro,
        alignItems: 'center',
        flexDirection: 'row', 
        margin: 8,
        shadowColor: colors.beigeOscuro, 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, 
    },
    bannerSmall: {
        backgroundColor: colors.rojo,
        padding: 6,
        borderRadius: 8,
        borderWidth: 2, 
        borderColor: colors.marronOscuro,
        alignItems: 'center',
        flexDirection: 'row', 
        margin: 4,
        shadowColor: colors.beigeOscuro,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3, 
    },
    bannerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginLeft: 30, 
    },
    bannerTextSmall: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginLeft: 20, 
    },
});

export default Banner;