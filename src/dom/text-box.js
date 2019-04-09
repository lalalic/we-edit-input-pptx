import React, {Component} from "react"
import PropTypes from "prop-types"

export default ({Container})=>class extends Component{
    static displayName="textbox"
    static contextTypes=
    static childContextTypes={
        placeholder: PropTypes.object,
    }

    getChildContext(){
        return {
            placeholder: this.props.placeholder
        }
    }

    render(){
        return <Container {...this.props}/>
    }
}
