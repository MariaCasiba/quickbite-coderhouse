import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../global/colors';

const toastConfig = {
    success: ({ text1, text2, ...rest }) => (
        <View style={[styles.toastContainer, styles.successContainer]}>
            <Text style={styles.toastTitle}>{text1}</Text>
            <Text style={styles.toastMessage}>{text2}</Text>
        </View>
    ),
    error: ({ text1, text2, ...rest }) => (
        <View style={[styles.toastContainer, styles.errorContainer]}>
            <Text style={styles.toastTitle}>{text1}</Text>
            <Text style={styles.toastMessage}>{text2}</Text>
        </View>
    ),
};

const styles = StyleSheet.create({
    toastContainer: {
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 20,
        marginVertical: 5,
    },
    successContainer: {
        backgroundColor: colors.beigeDorado,
    },
    errorContainer: {
        backgroundColor: colors.rojo,
    },
    toastTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.marronOscuro,
    },
    toastMessage: {
        fontSize: 14,
        color: colors.marronSuave,
    },
});

export default toastConfig;
