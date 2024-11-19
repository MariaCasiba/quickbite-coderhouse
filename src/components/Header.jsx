import { StyleSheet, View, Image, useWindowDimensions } from 'react-native';
import {colors} from "../global/colors.js";
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
        </SafeAreaView>
    )
}

export default Header

const styles = StyleSheet.create({
    headerContainer:{
        maxHeight:200,
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.beigeOscuro,
        padding: 10,
        marginVertical: 12
    },
    headerContainerSmall:{
        maxHeight:80,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.beigeOscuro, 
        padding: 10
    },
    logo: {
        width: 200, 
        height: 200, 
    
    },
    logoSmall: {
        width: 60, 
        height: 60, 
    }
    
})