import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import defaults from "lodash.defaultsdeep"
import {toTextStyle} from "./style"

export default ({Container})=>class extends Component{
	static displayName="run"
	static propTypes={
		style: PropTypes.object.isRequired
	}

	static contextTypes={
		style: PropTypes.object
	}

    static childContextTypes={
        style: PropTypes.object
    }

    getChildContext(){
        return {
            style:this.style(this.props.style, this.context.style)
        }
    }

	style=memoize((direct, context)=>toTextStyle(defaults(direct, context)))

	render(){
		const {style, ...props}=this.props
		return (
			<Container {...props} type="run"/>
		)
	}
}
