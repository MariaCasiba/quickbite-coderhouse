import { Modal, View, Text, Button, StyleSheet, Pressable } from 'react-native';
import { colors } from '../global/colors';

const ModalMessage = ({ visible, message, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>{message}</Text>
                    <Pressable style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Cerrar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.marronOscuro,
        marginBottom: 10,
    },
    closeButton: {
        backgroundColor: colors.marronSuave, 
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 16,
        marginTop: 20, 
    },
    closeButtonText: {
        color: colors.blanco, 
        fontSize: 16,
        textAlign: 'center',
    },
});

export default ModalMessage;
