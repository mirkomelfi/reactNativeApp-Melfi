import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [textItem,setTextItem]= useState("");
  const [itemList,setItemList]= useState([]);
  const [modalVisible,setModalVisible]= useState(false);
  const [itemSelected,setItemSelected]= useState({});

  const handlerChangeItem=(t)=>{
    setTextItem(t)
  }
  const addItem=()=>{
    setItemList(currentItems=>[
      ...currentItems,
      {id:Math.random().toString(),value:textItem}
    ]);
    setTextItem("")
  }
    const selectedItems=(id)=>{
    setItemSelected(itemList.filter(item=>item.id===id)[0])
    setModalVisible(true)
  }
  const renderItem=({item})=>(
    <TouchableOpacity onPress={()=>selectedItems(item.id)}>
        <Text style={styles.item}> ◉ {item.value}</Text>
    </TouchableOpacity>
  )

  const deleteItem =()=>{
    setItemList(currentState=>currentState.filter(item=>item.id!==itemSelected.id))
    setItemSelected({})
    setModalVisible(false)
  }


  return (
    <View style={styles.container}>

       <Text style={{fontSize:25,backgroundColor:"green"}}>Lista de Tareas Semanales</Text>
       
      <View style={styles.addItem}>
        <TextInput value={textItem} placeholder='Ingresa elementos a agregar' style={styles.inputItem} onChangeText={handlerChangeItem} />
        <Button title="Agregar" style={{padding:30, marginTop:0}} onPress={addItem} />
      </View>

      <View>
        <FlatList
          data={itemList}
          renderItem={renderItem}
          keyExtractor={(item)=>item.id}
        />
      </View>

      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={()=>{
          Alert.alert("Modal cerrado")
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.modal}>
          <Text style={{marginBottom:10,fontSize:25}} >¿Tarea completada?</Text>
            <Pressable style={{marginBottom:10,backgroundColor:"green"}} onPress={()=>deleteItem()}><Text>Sí, quitar de la lista</Text></Pressable>
            <Pressable style={{backgroundColor:"red"}} onPress={()=>setModalVisible(false)}><Text>No :(</Text></Pressable>
        </View>

      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding:30,
    marginTop: 50,
  },

  addItem:{
    marginTop: 50,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  inputItem: {
    width:200,
    borderBottomColor:"black",
    borderBottomWidth:1
  },
  modal:{
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },

  item: {
    backgroundColor: "#f9aa33",
    fontSize:16,
    marginTop: 30,
    height:30,
    justifyContent: 'center',
    alignItems: 'center'

  },



});
