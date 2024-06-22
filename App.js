import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider, Text, TextInput } from 'react-native-paper';

export default function App() {
  const [input, setInput] = useState('');
  const [resultado, setResultado] = useState('');

  const handlePress = (value) => {
    if (value === '=') {
      calculate();
    } else if (value === 'C') {
      clear();
    } else {
      setInput(prevInput => prevInput + value);
    }
  };

  const calculate = () => {
    try {
      const evalResult = eval(input.replace(',', '.')).toString();
      setResultado(evalResult);
      setInput(evalResult);
    } catch (e) {
      setResultado('Erro');
    }
  };

  const clear = () => {
    setInput('');
    setResultado('');
  };

  const buttons = [
    ['(', ')', 'C', '/'],
    ['7', '8', '9', 'X'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  return (
    <PaperProvider>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Entrada"
              value={input}
              onChangeText={setInput}
              editable={true}
            />
            <Text style={styles.resultado}>{resultado}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            {buttons.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((buttonValue) => (
                  <TouchableOpacity
                    key={buttonValue}
                    style={[
                      styles.button,
                      buttonValue === 'C' || buttonValue === '=' ? styles.specialButton : null
                    ]}
                    onPress={() => handlePress(buttonValue)}
                  >
                    <Text style={styles.buttonText}>{buttonValue}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    fontSize: 24,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
  },
  resultado: {
    fontSize: 32,
    textAlign: 'right',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    width: 64,
    height: 64,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#757575',
    borderRadius: 32,
  },
  specialButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    fontSize: 24,
    color: '#ffffff',
  },
});
