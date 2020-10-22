import React, {useContext} from 'react';
import {Image} from 'react-native';
import PedidoContext from '../context/pedidos/pedidosContext';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  H1,
  Text,
  Body,
  Card,
  CardItem,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import globalStyles from '../styles/global';
const DetallePlatillo = () => {
  //Context pedido
  const {platillo} = useContext(PedidoContext);
  const {imagen, nombre, precio, descripcion, categoria, id} = platillo;

  //redireccionar
  const navigation = useNavigation();

  return (
    <Container style={globalStyles.contenedor}>
      <Content style={globalStyles.contenido}>
        <H1 style={globalStyles.titulo}>{nombre}</H1>
        <Card>
          <CardItem>
            <Body>
              <Image source={{uri: imagen}} style={globalStyles.imagen} />
              <Text style={{marginTop: 20}}>{descripcion}</Text>
              <Text style={globalStyles.cantidad}>Precio: $ {precio}</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
      <Footer>
          <FooterTab>
              <Button
                style={globalStyles.boton }
                onPress={() => navigation.navigate('FormularioPlatillo')}
              >
                  <Text
                    style={globalStyles.botonTexto }
                  >Ordenar Platillo</Text>
              </Button>
          </FooterTab>
      </Footer>
    </Container>
  );
};

export default DetallePlatillo;
