import React, {Component} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import defaults from "lodash.defaultsdeep"

import {toTextStyle, toParagraphStyle} from "./style"

export default ({Paragraph})=>class extends Component{
    static displayName="paragraph"
    static contextTypes={
        defaultTextStyle:PropTypes.object,
        txStyles:PropTypes.object,
        placeholder:PropTypes.object,
        style:PropTypes.object,
    }

    static childContextTypes={
        style:PropTypes.object
    }

    getChildContext(){
        return {
            style:this.getStyle(this.props.style, this.context).defRPr
        }
    }

    getDefaultStyle(){
        return defaults(this.props.defaultStyle,this.getChildContext().style)
    }

    getStyle=memoize((direct, context)=>{
        const {defaultTextStyle, txStyles, placeholder={},style={},containerStyle={defRPr:style}}=context
        const {lvl=0, lvlpPr=`lvl${lvl+1}pPr`}=direct
        const styles=[direct,containerStyle, placeholder[lvlpPr]]

        const txStyle=txStyles[`${placeholder.type||'body'}Style`]||txStyles.otherStyle
        if(txStyle){
            styles.push(txStyle[lvlpPr])
            styles.push(txStyle.defPPr)
        }

        if(defaultTextStyle){
            styles.push(defaultTextStyle[lvlpPr])
            styles.push(defaultTextStyle.defPPr)
        }

        return defaults({},...styles.filter(a=>!!a))
    })

    render(){
        const {style:_1, ...props}=this.props
        const defaultStyle=toTextStyle(this.getDefaultStyle())
        var {numbering, ...pstyle}=toParagraphStyle(this.getStyle(_1, this.context))
        if(numbering){
            const size=toTextStyle(defaults(this.getChildContext().style,this.props.defaultStyle)).size
            if(numbering.sizePct)
                numbering.style.size=size*sizePct

            if(!numbering.style.size)
                numbering.style.size=size
        }
        return <Paragraph {...props} defaultStyle={defaultStyle} {...pstyle} numbering={numbering} End=""/>
    }
}
