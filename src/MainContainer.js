import React from "react";
import App from "./App";
import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

library.add(faStroopwafel)

class MainContainer extends React.Component {
    themeInput = {
        theme: ["light", "dark"]
    }

    constructor(props) {
        super(props);    
        this.state = {
          themeMode: 0,
        };

        global.theme = 0;
    }

    handleThemeModeChange = () => {
        let currMode = this.state.themeMode;
        currMode = (currMode + 1) % 2;
        this.setState({ themeMode: currMode });
        global.theme = currMode;
    
        // Change button text
        const content = "Theme Mode: " + this.themeInput["theme"][currMode];
    }
    
    render() {
      return (
        <>
        <App 
            handleOnPress={this.handleThemeModeChange}
            />
        </>
      );
    }
  }

  export default MainContainer