import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"

export default ({Page})=>class extends Component{
    static displayName="master"
    static childContextTypes={
        txStyles:PropTypes.object,
        placeholders:PropTypes.object,
    }

    getChildContext(){
        return {
            txStyles:this.props.txStyles,
            placeholders:this.typedChildren().content.reduce((phs, a)=>{
                if(a.props.placeholder){
                    phs[a.props.placeholder]=a
                }
                return phs
            },{})
        }
    }

    typedChildren(){
        const {children,slides}=this.props
        return React.Children.toArray(children).reduce((o,a)=>{
            if(a.type.displayName=="layout"){
                o.layouts.push(React.cloneElement(a,{slides:slides.filter(b=>b.props.layout==a.props.id)}))
            }else{
                o.content.push(a)
            }
            return o
        },{layouts:[], content:[]})
    }

    render(){
        const {layouts,content}=this.typedChildren()
        return (
            <Fragment>
                {/*<Page {...props} children={content}/>*/}
                {layouts}
            </Fragment>
        )
    }
}
