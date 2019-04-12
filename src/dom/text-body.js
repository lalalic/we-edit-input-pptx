import React, {Component} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import defaults from "lodash.defaultsdeep"


export default ({Container})=>class extends Component{
    static displayName="textBody"

    static contextTypes={
        placeholder:PropTypes.object,
    }

    static childContextTypes={
        placeholder: PropTypes.object,
    }

    getChildContext(){
        return {
            placeholder: this.getTextStyle(this.props.textStyle,this.context.placeholder)
        }
    }

    getTextStyle=memoize((direct, context)=>{
        return defaults({},direct, context)
    })

    render(){
        const {textStyle:_1, ...props}=this.props
        return (<Container {...props} type="textbox"/>)
    }
}
