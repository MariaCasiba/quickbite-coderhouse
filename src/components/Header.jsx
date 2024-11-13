import { StyleSheet, View, Image, useWindowDimensions } from 'react-native';
import {colors} from "../global/colors.js";
import NunitoText from './NunitoText.jsx';
import { SafeAreaView } from 'react-native';

const Header = ({subtitle}) => {
    const {width, height} = useWindowDimensions();


    return (
        <SafeAreaView style={width<=300?styles.headerContainerSmall: styles.headerContainer}>
            <Image 
                source={{ uri: 'https://i.postimg.cc/gk6hQ9X1/logoquickbite.webp' }} 
                style={width<=300?styles.logoSmall: styles.logo} 
                resizeMode="contain" 
            />
            <NunitoText style={styles.subtitle}>{subtitle}</NunitoText>
        </SafeAreaView>
    )
}

export default Header

const styles = StyleSheet.create({
    headerContainer:{
        maxHeight:300,
        height: 250,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.beigeOscuro,
        padding: 10
    },
    headerContainerSmall:{
        maxHeight:150,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.beigeOscuro, 
        padding: 10
    },
    logo: {
        width: 220, 
        height: 220, 
    
    },
    logoSmall: {
        width: 60, 
        height: 60, 
    }
    
})