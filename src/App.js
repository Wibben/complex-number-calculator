import React, {Component} from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from './styles'

const TestFunction = (props) => {
  return (
    <Text>{props.in}</Text>
  );
}

class ComplexNumberCalculator extends Component
{
  state = {
    count: 0,
  }

  onPress = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  render = () => {
    return (
      <View
        style={styles.center}
      >
        <TestFunction in="Hello World!" />
        <TestFunction in="This is done with a function call" />

        <TouchableOpacity
          style={styles.button}
          onPress={this.onPress}
        >
          <Text>Button Example</Text>
        </TouchableOpacity>
        
        <Text>You've clicked the button {this.state.count} times</Text>
      </View>
    )
  }
}

export default ComplexNumberCalculator;