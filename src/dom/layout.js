import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"
import defaults from "lodash.defaultsdeep"

export default ({})=>class extends Component{
    static displayName="layout"
    static contextTypes={
        placeholders:PropTypes.arrayOf(PropTypes.element)
    }

    static childContextTypes={
        placeholders:PropTypes.arrayOf(PropTypes.element)
    }

    getChildContext(){
        return {
            placeholders:this.getPlaceholders()
        }
    }

    getPlaceholders(){
        const {placeholders}=this.context
        const content=React.Children.toArray(this.props.children)
        return content.reduce((phs, a)=>{
            if(a.props.placeholder){
                const {placeholder:{type,idx}}=a.props
                const phMaster=placeholders.find(({props:{placeholder:b}})=>b.type==type && b.idx==idx)
                if(phMaster){
                    phs.push(React.cloneElement(a),defaults({},a.props,phMaster.props))
                }else{
                    phs.push(a)
                }
            }
            return phs
        },[])
    }

    render(){
        const {slides,...props}=this.props
        return (
            <Fragment>
                {/*<Page {...props}/>*/}
                {slides}
            </Fragment>
        )
    }
}
