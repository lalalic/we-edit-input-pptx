import React, {Component} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"


export default ({Row})=>class extends Component{
	static displayName="row"

	static contextTypes={
		cols: PropTypes.arrayOf(PropTypes.shape({
            x: PropTypes.number,
            width: PropTypes.number
        }))
	}

	render(){
		const {style:$1,...props}=this.props
		const cols=this.context.cols
		const width=cols.slice(-1).reduce((w,a)=>a.x+a.width,0)
		return <Row {...props} {...{cols,width}}/>
	}
}
