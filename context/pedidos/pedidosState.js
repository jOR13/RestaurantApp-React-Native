import React, {useReducer} from 'react';


import PedidoReducer from './pedidosReducer';
import PedidoContext from './pedidosContext';

import {SELECCIONAR_PRODUCTO} from '../../types';

const PedidoState = (props) => {


    
  //Crear state i nicial
  const initialState = {
    pedido: [],
    platillo: null
  };

  // useReducer con dipatch para ejecutar las funciones
  const [state, dispatch] = useReducer(PedidoReducer, initialState);

  //Seleccionar el producto que el usuario desea ordenar
  const seleccionarPlatillo = platillo => {
    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: platillo
    })
  }

  return (
    <PedidoContext.Provider
      value={{
        pedido: state.pedido,
        platillo: state.platillo,
        seleccionarPlatillo
      }}>
      {props.children}
    </PedidoContext.Provider>
  );
};

export default PedidoState;
