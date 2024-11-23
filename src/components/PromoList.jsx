
import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, Pressable, useWindowDimensions, ActivityIndicator } from 'react-native';
import { colors } from '../global/colors';
import { useGetPromosQuery } from '../services/shopService';
import { useDispatch } from 'react-redux';
import { setCategory } from '../features/shop/shopSlice';

const PromoList = ({ navigation }) => {
    const dispatch = useDispatch();
    const { width } = useWindowDimensions();
    const isSmallScreen = width <= 360;

    const { data: promos, isLoading, error } = useGetPromosQuery();

    const renderItem = ({ item }) => (
        <Pressable
            onPress={() => {
                dispatch(setCategory(item.category)); 
                navigation.navigate('Productos');
            }}
        >
            <View style={isSmallScreen ? styles.cardSmall : styles.card}>
                <Image 
                    source={{ uri: item.image }} 
                    style={isSmallScreen ? styles.imageSmall : styles.image} 
                />
                <Text style={isSmallScreen ? styles.textSmall : styles.text}>{item.text}</Text>
            </View>
        </Pressable>
    );

    return (
        <>
            {
                isLoading
                ? <>
                    <Text style={styles.loadingText}>Cargando promos...</Text>
                    <ActivityIndicator size="small" color={colors.marronOscuro} />
                </>
                : error 
                ? <Text style={styles.promoError}>Error! No se pudieron cargar las promos disponibles</Text>
                : <>
                    <FlatList
                        data={promos}
                        renderItem={renderItem}
                        keyExtractor={item => item.name.toString()}
                        horizontal={true} 
                        showsHorizontalScrollIndicator={false}
                        snapToAlignment="center" 
                        decelerationRate="fast" 
                        snapToInterval={width * 0.7} 
                    />
                </>
            }
        </>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.blanco,
        borderRadius: 10,
        marginHorizontal: 8,
        marginTop: 10,
        padding: 6,
        alignItems: 'center',
        elevation: 2,
        width: '90%', 
        minWidth: 260,
        minHeight: 250,
        justifyContent: 'flex-start',
        overflow: 'hidden'
        
    },
    cardSmall: {
        backgroundColor: colors.blanco,
        borderRadius: 8,
        marginHorizontal: 4,
        marginTop: 8,
        padding: 8,
        alignItems: 'center',
        elevation: 1,
        width: '90%', 
        minWidth: 250,
        minHeight: 240,
        justifyContent: 'flex-start',
        overflow: 'hidden'
        
    },
    image: {
        width: '100%',
        height: 60,
        borderRadius: 10,
    },
    imageSmall: {
        width: '100%',
        height: 40, 
        borderRadius: 8,
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 4,
        textAlign: 'center',
        color: colors.negro
    },
    textSmall: {
        fontSize: 12, 
        fontWeight: 'bold',
        marginTop: 4,
        textAlign: 'center',
        color: colors.negro

    },
    promoError: {
        fontFamily: 'Gloock',
        fontSize: 18,
        textAlign: 'center',
        margin: 26,
        color: colors.rojo,
        padding: 16,
        backgroundColor: colors.beigeDorado
    },
    loadingText: {
        fontFamily: 'Gloock',
        fontSize: 16,
        textAlign: 'center',
        margin: 26,
        color: colors.marronOscuro,
    }
});

export default PromoList;