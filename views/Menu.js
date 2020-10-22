import React, {useContext, useEffect, Fragment} from 'react';
import {StyleSheet} from 'react-native';
import FirebaseContext from '../context/firebase/firebaseContext';
import PedidoContext from '../context/pedidos/pedidosContext';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  Separator,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  //Left,
  Body,
} from 'native-base';
import globalStyles from '../styles/global';
import {indexOf} from 'lodash';

const Menu = () => {
  //Context de firebase

  const {menu, obtenerProductos} = useContext(FirebaseContext);

  //COntext pedido
  const {seleccionarPlatillo} = useContext(PedidoContext);

  //Hook parra redireccionar
  const navigation = useNavigation();

  useEffect(() => {
    obtenerProductos();
  }, []);

  const mostrarHeading = (categoria, i) => {
    if (i > 0) {
      const categoriaAnterior = menu[i - 1].categoria;
      if (categoriaAnterior !== categoria) {
        return (
          <Separator style={styles.separador}>
            <Text style={styles.separadorTexto}>{categoria}</Text>
          </Separator>
        );
      }
    } else {
      return (
        <Separator style={styles.separador}>
          <Text style={styles.separadorTexto}>{categoria}</Text>
        </Separator>
      );
    }
  };

  return (
    <Container style={globalStyles.contenedor}>
      <Content style={{backgroundColor: '#FFF'}}>
        <List>
          {menu.map((platillo, i) => {
            const {
              imagen,
              nombre,
              precio,
              descripcion,
              categoria,
              id,
            } = platillo;
            return (
              <Fragment key={id}>
                {mostrarHeading(categoria, i)}
                <ListItem
                    onPress={() => {
                        //Eliminar porpiedades que  nousamos
                        const {existencia, ...platillo2} = platillo;
                        seleccionarPlatillo(platillo2);
                        navigation.navigate('DetallePlatillo');
                    }}
                >
                  {/* <Left></Left> */}
                  <Thumbnail large source={{uri: imagen}} />
                  <Body>
                    <Text style={{fontWeight: 'bold'}}>{nombre}</Text>
                    <Text note numberOfLines={2}>
                      {descripcion}
                    </Text>

                    <Text>Precio: $ {precio}</Text>
                  </Body>
                </ListItem>
              </Fragment>
            );
          })}
        </List>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  separador: {
    backgroundColor: '#000',
  },
  separadorTexto: {
    color: '#FFDA00',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Menu;
