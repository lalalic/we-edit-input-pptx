import React, {Component} from "react"
import PropTypes from "prop-types"

export default ({Page})=>class extends Component{
    static displayName="slide"

    render(){
        return (
            <Page {...this.props}/>
        )
    }
}
