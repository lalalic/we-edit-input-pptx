import React, {Component} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import defaults from "lodash.defaultsdeep"
import {toShapeStyle} from "./style"


export default ({Frame})=>class extends Component{
    static displayName="shape"

    static contextTypes={
        placeholders:PropTypes.arrayOf(PropTypes.element)
    }

    static childContextTypes={
        placeholder: PropTypes.object,
    }

    getChildContext(){
        return {
            placeholder: this.getTextAndShapeStyle(this.props,this.context).textStyle
        }
    }

    getTextAndShapeStyle=memoize(({placeholder:b={}, textStyle={}, children, ...shapeStyle}, {placeholders=[]})=>{
        const ph=placeholders.find(({props:{placeholder:a}})=>a.type==b.type && a.idx==b.idx)
        if(ph){
            const {textStyle:phTextStyle, children:_1, ...phShapeStyle}=ph.props
            return {
                textStyle:{
                    ...defaults({}, textStyle, phTextStyle),
                    ...b
                },
                shapeStyle: defaults({}, shapeStyle, phShapeStyle)
            }
        }

        return {
            textStyle,
            shapeStyle
        }
    })

    render(){
        const {textStyle:_1, children, id, changed,...props}=this.props
        const {textStyle, shapeStyle}=this.getTextAndShapeStyle(this.props, this.context)
        const {vertAlign, ...shapePr}=toShapeStyle({...textStyle, ...shapeStyle})
        return <Frame {...{children,id,changed, vertAlign}} {...shapePr}/>
    }
}
