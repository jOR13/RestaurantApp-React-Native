import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import DetallePlatillo from './views/DetallePlatillo';
import FormularioPlatillo from './views/FormularioPlatillo';
import Menu from './views/Menu';
import NuevaOrden from './views/NuevaOrden';
import ProgresoPedido from './views/ProgresoPedido';
import ResumenPedido from './views/ResumenPedido';

//importar state de context
import PedidosState from './context/pedidos/pedidosState';
import FirabeState from './context/firebase/firebaseState';

const Stack = createStackNavigator();
const App = () => {
  return (
    <>
      <FirabeState>
        <PedidosState>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#FFDA00',
                },
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}>
              <Stack.Screen
                name="NuevaOrden"
                component={NuevaOrden}
                options={{
                  title: 'Nueva Orden',
                }}
              />
              <Stack.Screen
                name="Menu"
                component={Menu}
                options={{
                  title: 'Menú',
                }}
              />
              <Stack.Screen
                name="DetallePlatillo"
                component={DetallePlatillo}
                options={{
                  title: 'Detalle Platillo',
                }}
              />
              <Stack.Screen
                name="FormularioPlatillo"
                component={FormularioPlatillo}
                options={{
                  title: 'Ordenar Platillo',
                }}
              />
              <Stack.Screen
                name="ResumenPedido"
                component={ResumenPedido}
                options={{
                  title: 'Resumen Pedido',
                }}
              />
              <Stack.Screen
                name="ProgresoPedido"
                component={ProgresoPedido}
                options={{
                  title: 'Progreso Pedido',
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PedidosState>
      </FirabeState>
    </>
  );
};

//const styles = StyleSheet.create({});

export default App;
