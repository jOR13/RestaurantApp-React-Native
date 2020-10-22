import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import PedidoContext from '../context/pedidos/pedidosContext';
import {
  Container,
  Content,
  Form,
  Icon,
  Input,
  Button,
  Footer,
  FooterTab,
  Text,
  Grid,
  Col,
  View,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';

const FormularioPlatillo = () => {
  //state para las cantidades
  const [cantidad, setCantidad] = useState(1);

  const [total, setTotal] = useState(0);

  //Context
  const {platillo} = useContext(PedidoContext);
  const {precio} = platillo;

  // en cuanto el compoenente carga calcula el total

  useEffect(() => {
    calcularTotal();
  }, [cantidad]);

  //calcula el total del platillo por su cntidad

  const calcularTotal = () => {
    const totalPagar = precio * cantidad;
    setTotal(totalPagar);
  };

  const aumentarCantidad = () => {
    const nuevaCantidad = parseInt(cantidad) + 1;
    setCantidad(nuevaCantidad);
  };

  const reduCantidad = () => {
    if (cantidad > 1) {
      const nuevaCantidad = parseInt(cantidad) - 1;
      setCantidad(nuevaCantidad);
    }
  };

  return (
    <Container>
      <Content>
        <Form>
          <Text style={globalStyles.titulo}> Cantidad</Text>
          <Grid>
            <Col>
              <Button
                onPress={(cantidad) => reduCantidad(cantidad)}
                rounded
                props
                dark
                style={{
                  marginStart: 10,
                  height: 80,
                  width: 120,
                  justifyContent: 'center',
                }}>
                <Icon style={{fontSize: 40}} name="remove" />
              </Button>
            </Col>
            <Col>
              <Input
                style={{textAlign: 'center', fontSize: 20}}
                value={cantidad.toString()}
                onChangeText={(cantidad) => setCantidad(cantidad)}
                keyboardType="numeric"
              />
            </Col>
            <Col>
              <Button
                onPress={(cantidad) => aumentarCantidad(cantidad)}
                rounded
                props
                dark
                style={{height: 80, width: 120, justifyContent: 'center'}}>
                <Icon style={{fontSize: 40}} name="add" />
              </Button>
            </Col>
          </Grid>
          <Text style={globalStyles.cantidad}>Subtotal: $ {total}</Text>
          <Footer>
            <FooterTab>
              <Button
                style={globalStyles.boton}
                onPress={() => confirmarOrden()}>
                <Text style={globalStyles.botonTexto}>Agregar al pedido</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Form>
      </Content>
    </Container>
  );
};

export default FormularioPlatillo;
