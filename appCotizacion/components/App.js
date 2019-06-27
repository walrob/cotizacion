'use strict';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Picker, Button } from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      moneda: 'dolar',
      monto: '0',
      cotizacion: '',
      messageError: '',
      messageResult: '',
      aPeso: true,
      buttonCambio: '... a Pesos'
    };
  }


  // Se consulta a la API la cotización
  async _onPressButton() {
    // localhost = 192.168.1.103
    await fetch(`http://192.168.1.103:3000/cotizacion/${this.state.moneda}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ cotizacion: data.precio });
        this._calculation();
      })
      .catch(error =>
        this.setState({
          messageError: `Ocurrió un error: ${error}`,
          messageResult: ''
        })
      );
  }

  // Calcula el resultado de la consulta
  _calculation() {
    if (this.state.aPeso) {
      // pasa el valor obtenido en la moneda seleccionada a pesos
      const num = (parseFloat(this.state.monto) * parseFloat(this.state.cotizacion)).toFixed(2);
      this.setState({
        messageResult: `1 ${this.state.moneda} = ${this.state.cotizacion} pesos${'\n'}${this.state.monto} ${this.state.moneda} = ${num} pesos`,
        messageError: ''
      });
    } else {
      // pasa el valor obtenido en pesos a la moneda seleccionada
      const cot = (1 / parseFloat(this.state.cotizacion)).toFixed(4);
      const num = (parseFloat(this.state.monto) / parseFloat(this.state.cotizacion)).toFixed(2);
      this.setState({
        messageResult: `1 peso = ${cot} ${this.state.moneda}${'\n'}${this.state.monto} pesos = ${num} ${this.state.moneda}`,
        messageError: ''
      });
    }

    // Se vuelve a realizar la petición luego de 5 segundos
    setTimeout(() => (
      this._onPressButton()
    ), 5000);
  }

  // Cambia el sentido de cálculo para la consulta
  _onPressCambio = () => {
    if (this.state.aPeso) {
      this.setState({
        aPeso: false,
        buttonCambio: `Pesos a ...`
      })
    } else {
      this.setState({
        aPeso: true,
        buttonCambio: '... a Pesos'
      })
    }
  }

  render() {
    let message;
    if (this.state.messageError === '') {
      message = <Text style={styles.respuesta}>{this.state.messageResult}</Text>
    } else {
      message = <Text style={styles.error}>{this.state.messageError}</Text>
    }

    return (
      <View style={styles.container}>

        <View style={styles.navBar}>
          <Text style={styles.title}>App-Cotización</Text>
        </View>

        <View style={styles.main}>
          <Text style={{ fontSize: 18 }}>Elegir moneda:</Text>

          <Picker
            selectedValue={this.state.moneda}
            style={styles.select}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ moneda: itemValue })
            }>
            <Picker.Item label="Dolar" value="dolar" />
            <Picker.Item label="Euro" value="euro" />
            <Picker.Item label="Real" value="real" />
          </Picker>

          <TextInput
            style={styles.inputValor}
            placeholder="Ingrese valor"
            keyboardType='numeric'
            onChangeText={(monto) => this.setState({ monto })}
          />

          <View style={styles.layoutButton}>
            <Button
              onPress={this._onPressCambio}
              title={this.state.buttonCambio}
              accessibilityLabel="Cambia el sentido del cálculo."
            />
          </View>

          <View style={styles.layoutButton}>
            <Button
              onPress={() => this._onPressButton()}
              title="Consultar"
              accessibilityLabel="Seleccionar para realizar la cotización."
            />
          </View>

          <View style={styles.message}>
            {message}
          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF5FB',
  },
  title: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 18,
  },
  navBar: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#2E86C1',
  },
  main: {
    margin: 15,
  },
  layoutButton: {
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    justifyContent: 'center'
  },
  select: {
    height: 60,
    width: 180,
  },
  error: {
    color: '#E13712',
    fontSize: 16
  },
  respuesta: {
    color: '#21618C',
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#AED6F1',
  },
  message: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  inputValor: {
    fontSize: 18,
    marginLeft: 10,
  }
});
