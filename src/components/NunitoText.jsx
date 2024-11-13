import {StyleSheet, Text } from 'react-native'


const NunitoText = ({children, style}) => {
    return (   
        <Text style={{...styles.NunitoText,...style}}>{children}</Text>
    )
}

export default NunitoText

const styles = StyleSheet.create({
    NunitoText:{
        fontFamily: 'Nunito'
    }
})