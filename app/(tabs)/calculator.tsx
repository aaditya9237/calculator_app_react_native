import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

export default function CalculatorApp() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handlePress = (value: string) => {
    if (value === '=') {
      try {
        setResult(eval(input)); // Evaluate the expression
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === '⌫') {
      setInput(input.slice(0, -1)); // Remove last character
    } else {
      setInput((prev) => prev + value);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Display Section */}
      <View style={styles.display}>
        <Text style={styles.inputText}>{input || '0'}</Text>
        <Text style={styles.resultText}>{result}</Text>
      </View>

      {/* Buttons Section */}
      <View style={styles.buttons}>
        {[
          ['C', '⌫', '%', '/'],
          ['7', '8', '9', '*'],
          ['4', '5', '6', '-'],
          ['1', '2', '3', '+'],
          ['0', '.', '00', '='],
        ].map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((value, buttonIndex) => (
              <TouchableOpacity
                key={buttonIndex}
                style={[
                  styles.button,
                  value === '=' ? styles.equalButton : null,
                ]}
                onPress={() => handlePress(value)}
              >
                <Text style={styles.buttonText}>{value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  display: {
    flex: 2,
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
  },
  inputText: {
    fontSize: 36,
    color: '#fff',
  },
  resultText: {
    fontSize: 28,
    color: '#4caf50',
    marginTop: 10,
  },
  buttons: {
    flex: 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    height: 70,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  equalButton: {
    backgroundColor: '#4caf50',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});
