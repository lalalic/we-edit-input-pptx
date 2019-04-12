import React, {Component} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import defaults from "lodash.defaultsdeep"
import {toCellStyle} from "./style"

const PRIORIZED='lastCol,firstCol,lastRow,firstRow,band2H,band1H,band2V,band1V,wholeTbl'.split(',')

export default ({Cell})=>class extends Component{
	static displayName="cell"
	static contextTypes={
		tableStyle:PropTypes.object
	}

	getStyle(){
		const {cnf, }=this.props
		const {tableStyle}=this.context
		return Array.from(cnf)
			.sort((a,b)=>PRIORIZED.indexOf(a)-PRIORIZED.indexOf(b))
			.reduce((style,k)=>{
				if(k in tableStyle){
					return defaults(style, tableStyle[k])
				}
				return style
			},{})
	}



	render(){
		const {tcStyle, tcTxStyle}=this.getStyle()
		const {cnf, ...props}=this.props
		const {left,right,top,bottom,background,}=toCellStyle(tcStyle)
		return <Cell {...props} {...{background,border:{left,right,top,bottom}}}/>
	}
}
