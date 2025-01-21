import React,{useState, useEffect} from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

let originalData = []

const styles = StyleSheet.create({
    box: {
        flexDirection: 'column',
        backgroundColor: 'moccasin',
        padding:'auto',
        marginTop: '7',
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 1
    },
    header:{
        textAlign:'center',
        fontWeight:'600',
        fontSize: 26,
        marginBottom: 10,
        backgroundColor: 'lightblue',
    },
    titleStyle: {
        fontSize: 20,
        marginLeft: 7,
        fontWeight: '500'
    },
    textStyle: {
        fontSize: 15,
        marginLeft: 7,
    },
});

const App = () => {
  const [mydata, setMyData] = useState([]);

  // Exercise 1B
    useEffect(() => {
        // Exercise 1A
        fetch("https://mysafeinfo.com/api/data?list=titanic&format=json&case=default").then((response) => {
            return response.json();
        }).then((myJson)=>{
            if(originalData.length < 1){
                setMyData(myJson);
                originalData = myJson;
            }
            setMyData(myJson);
        })
    }, []);

    const FilterData = (text) => {
        if (text != ' '){
            let myFilteredData = originalData.filter((item) =>
            item.PassengerName.includes(text));
            setMyData(myFilteredData);
        }
        else{
            setMyData(originalData);
        }
    }



  const renderItem = ({item, index}) => {
    return (
    <View>
        <View style={styles.box}>
            <Text style={[styles.titleStyle, {paddingTop: 3}]}>{item.PassengerName}</Text>
            <Text style={styles.textStyle}>Age: {item.Age}</Text>
            <Text style={styles.textStyle}>Passenger Type: {item.PassengerType}</Text>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.textStyle}>Status:</Text>
                <Text style={[styles.textStyle, {fontWeight: 700, paddingBottom: 3}]}>{item.Status}</Text>
            </View>
        </View>
    </View>
    );
  };

  return (
    <View style={{backgroundColor: 'mintcream'}}>
      <StatusBar/>
        <Text style={styles.header}>Titanic Passengers & Crew <Icon name="ship" size={26} color="black" /></Text>
      <Text style={{marginLeft: 5, fontSize: 18, fontWeight: 500, }}>Search (Status):</Text>
      <TextInput style={{borderWidth:1, marginLeft: 5, marginRight: 5, backgroundColor: 'white', marginBottom: 10,}} onChangeText={(text)=>{FilterData(text)}}/>
      <FlatList data={mydata} renderItem={renderItem}/>
    </View>
  );
}

export default App;
