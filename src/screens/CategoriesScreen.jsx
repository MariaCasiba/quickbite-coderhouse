import { StyleSheet, Text, View, FlatList, Image, Pressable, useWindowDimensions } from 'react-native';
import categories from "../data/categories.json";
import FlatCard from '../components/FlatCard';
import { colors } from '../global/colors';
import { useEffect, useState } from 'react';


const CategoriesScreen = ({navigation}) => {
    const {width, height} = useWindowDimensions()
    

    const [isPortrait, setIsPortrait] = useState(true)

    useEffect(()=>{
        if (width>height) {
            setIsPortrait(false)
        } else{
            setIsPortrait(true)
        }
    },
[width, height])

    const renderCategoryItem = ({item, index}) => {
        return (
                <Pressable onPress={()=>navigation.navigate('Productos', item.title)} >

                <FlatCard style={
                    index%2==0?
                    {...styles.categoryItemContainer, ...styles.row}
                    :
                    {...styles.categoryItemContainer,...styles.rowReverse}
                }>
                    <Image 
                        source={{uri: item.image}}
                        style={styles.image}
                        resizeMode='contain'
                    />
                    <Text style={width>300?styles.categoryTitle: styles.categoryTitleSmall}>{item.title}</Text>
                </FlatCard>
                </Pressable>

        )
    }


    return (
        <>
            <Text style={styles.categoriesScreenTitle}>Nuestras menú:</Text>
            <FlatList
                data={categories}
                keyExtractor={item=> item.id}
                renderItem={renderCategoryItem}
                
            />
        </>
    )
}

export default CategoriesScreen

const styles = StyleSheet.create({
    categoryItemContainer:{
        justifyContent: "space-around",
        alignItems: "center",
        marginHorizontal: 30,
        marginVertical:10,
        padding: 20,
        
        
    },
    image:{
        width: 140,
        height: 140
    }, 
    categoryTitle: {
        fontSize: 18,
        fontWeight: "bold"
    },
    categoryTitleSmall:{
        fontSize: 14,
        fontWeight: "bold"
    },
    row:{
        flexDirection: "row"
    },
    rowReverse:{
        flexDirection: "row-reverse"
    },
    categoriesContainer:{
        backgroundColor: colors.marronSuave
    },
    categoriesScreenTitle:{
        fontFamily: 'Gloock',
        fontSize: 22,
        textAlign: 'center',
        marginVertical: 20,
        color: colors.marronOscuro
    }
})