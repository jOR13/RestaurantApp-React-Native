import React, {useReducer} from 'react';
import firebase from '../../firebase';
import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';
import _ from 'lodash';
import {OBTENER_PRODUCTOS_EXITO} from '../../types';

const FirabeState = (props) => {
  //console.log(firebase);

  //Crear state i nicial
  const initialState = {
    menu: [],
  };

  // useReducer con dipatch para ejecutar las funciones
  const [state, dispatch] = useReducer(FirebaseReducer, initialState);

  //Funcion que se ejecuta para traer los productos
  const obtenerProductos = () => {
    //COnsultar firebase
    firebase.db.settings({experimentalForceLongPolling: true});
    firebase.db
      .collection('productos')
      .where('existencia', '==', true)
      .onSnapshot(manejarSnapshot); // traer solo que esten en existencia

    function manejarSnapshot(snapshot) {
      let platillos = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      
      //Ordenar por categoria cocn lodash
      platillos=_.sortBy(platillos, 'categoria');

      dispatch({
        type: OBTENER_PRODUCTOS_EXITO,
        payload: platillos,
      });
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        menu: state.menu,
        firebase,
        obtenerProductos,
      }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirabeState;
