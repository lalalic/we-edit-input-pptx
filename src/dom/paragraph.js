import React, {Component} from "react"
import PropTypes from "prop-types"

export default ({Paragraph})=>class extends Component{
    static displayName="paragraph"
    static contextTypes={
        defaultTextStyle:PropTypes.object,
        txStyles:PropTypes.object,
        placeholder:PropTypes.any,
        placeholders:PropTypes.any,
    }

    getDefaultStyle(){
        //direct, phInLayout, phInMaster, defaultTextStyle
    }

    render(){
        const {defaultTextStyle, txStyles, placeholders, placeholder:{type,idx,sz}={}}=this.context
        const {style:direct}=this.props
        const base=placeholders.find(({placeholder:ph})=>ph.type==type && ph.idx==idx)
        return <Paragraph {...this.props} defaultStyle={{fonts:"arial", size:12}}/>
    }
}
