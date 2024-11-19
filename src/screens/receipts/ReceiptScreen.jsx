
import { FlatList, StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native';
import { colors } from '../../global/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FlatCard from '../../components/FlatCard';
import { useGetReceiptsQuery } from '../../services/receiptsService';

const ReceiptScreen = ({ navigation }) => {
    const { data: receipts = [], isLoading, error } = useGetReceiptsQuery();


    const renderReceiptItem = ({ item }) => {

        const receiptId = `${item.createdAt}`;

        let total = item.cart.reduce(
            (acumulador, cartItem) => (acumulador += cartItem.quantity * cartItem.price), 0
        );

        const dateOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };

    
        return (
            <FlatCard style={styles.receiptContainer}>
                <Text style={styles.title}>Recibo N° {receiptId}</Text>
                <Text style={styles.date}>Creado el {new Date(item.createdAt).toLocaleString('es-Ar', dateOptions)} hs. </Text>
                <Text style={styles.total}>Total: ${total}</Text>
                <Icon name='visibility' size={24} color={colors.beigeOscuro} style={styles.viewIcon} />
            </FlatCard>
        );
    };

    return (
        <View style={styles.container}>
            {
                isLoading
                    ? (
                        <>
                            <Text style={styles.loadingText}>Cargando recibos...</Text>
                            <ActivityIndicator size="small" color={colors.marronOscuro} />
                        </>
                    )
                    : error
                        ? (
                            <Text style={styles.errorText}>Error al cargar recibos</Text>
                        )
                        : (
                            <>
                                <Pressable onPress={() => navigation.goBack()}>
                                    <Icon style={styles.icon} name="arrow-back-ios" size={30} />
                                </Pressable>
                                <FlatList
                                    data={receipts}
                                    keyExtractor={(item) => `${item.createdAt}`}
                                    renderItem={renderReceiptItem}
                                />
                            </>
                        )
            }
        </View>
    );
};

export default ReceiptScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    receiptContainer: {
        padding: 20,
        justifyContent: 'flex-start',
        margin: 16,
        gap: 10
    },
    title: {
        fontWeight: 'bold'
    },
    total: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    viewIcon: {
        alignSelf: 'flex-end'
    },
    loadingText: {
        fontFamily: 'Gloock',
        fontSize: 16,
        textAlign: 'center',
        margin: 26,
        color: colors.marronOscuro,
    },
    errorText: {
        fontFamily: 'Gloock',
        fontSize: 18,
        textAlign: 'center',
        margin: 26,
        color: colors.rojo,
        padding: 16,
        backgroundColor: colors.beigeDorado,
    },
    icon: {
        color: colors.marronOscuro,
        alignSelf: 'flex-start',
        padding: 10,
    }
});
