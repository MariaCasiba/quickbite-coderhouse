import { FlatList, StyleSheet, Text, View } from 'react-native';
import receipts from "../data/receipts.json";
import { colors } from '../global/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FlatCard from '../components/FlatCard';


const ReceiptScreen = () => {

    const renderReceiptItem = ({item}) => {
        let total = item.items.reduce((acumulador, item) => (acumulador += item.quantity*item.price), 0)

        dateOptions = {
            year: 'numeric', // muestra año
            month: '2-digit', // muestra mes en formato de dos dígitos
            day: '2-digit', // muestra día en formato de dos dígitos
            hour: '2-digit', // muestra horas en formato de dos dígitos
            minute: '2-digit', // muestra minutos en formato de dos dígitos
            hour12: false // usa formato de 24 hs (true para 12 horas)
        }

        return (
            <FlatCard style={styles.receiptContainer}>
                <Text style={styles.title}>Recibo N° {item.id}</Text>
                <Text style={styles.date}>Creado el {new Date(item.createdAt).toLocaleString('es-Ar', dateOptions)} hs. </Text>
                <Text style={styles.total}>Total: {total}</Text>
                <Icon name='visibility' size={24} color={colors.beigeOscuro} style={styles.viewIcon}/>
            </FlatCard>
        )
    }
    return (
        <FlatList 
            data={receipts}
            keyExtractor={item => item.id}
            renderItem={renderReceiptItem}
        />
    )
}

export default ReceiptScreen

const styles = StyleSheet.create({
    receiptContainer:{
        padding: 20,
        justifyContent: 'flex-start',
        margin: 16,
        gap: 10
    },
    title:{
        fontWeight: 'bold'
    },
    total:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    viewIcon:{
        alignSelf: 'flex-end'
    }
})