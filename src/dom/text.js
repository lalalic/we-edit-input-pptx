import React, {Component} from "react"
import PropTypes from "prop-types"


export default ({Text})=>class extends Component{
	static displayName="text"
	render(){
		return <Text {...this.props} {...{fonts:"arial", size:12}}/>
	}
}
