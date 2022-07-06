import React, { Component } from 'react';

class Colors extends Component {
    render(){
      return(
        <div>
          Colors
        </div>
      )
    }
}
  
class Layout extends Component{
    render(){
      return(
        <div>
          Layout
        </div>
      )
    }
}

class Math extends Component{
    render(){
        return(
            <div>
                Math
            </div>
        )
    }
}

class Code extends Component{
    render(){
        return(
            <div>
                Code
            </div>
        )
    }
}

class Export extends Component{
    render(){
        return(
            <div>
                Export
            </div>
        )
    }
}

export {
    Colors,
    Layout,
    Math,
    Code, 
    Export
}