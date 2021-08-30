import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from './styles'

class Button extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      content: props.content,
      onPress: props.onPress,
    }
  }

  callBack = () => {
    this.props.onPress(this.state.content);
  }

  render() {
    return (
      <TouchableOpacity 
        style={styles.button}
        onPress={this.callBack} 
      >
        <Text> {this.state.content} </Text>
      </TouchableOpacity>
    );
  }
}

export default Button;