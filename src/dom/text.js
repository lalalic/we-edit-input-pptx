import React, {Component} from "react"
import PropTypes from "prop-types"

export default ({Text})=>class extends Component{
	static displayName="text"
	static contextTypes={
		style:PropTypes.object
	}

	render(){
		const {style}=this.context
		return <Text {...this.props} {...style}/>
	}
}
