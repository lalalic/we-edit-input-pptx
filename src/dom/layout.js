import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"

export default ({})=>class extends Component{
    static displayName="layout"
    static contextTypes={
        placeholders:PropTypes.object,
        mergePlaceholders: PropTypes.func,
    }

    static childContextTypes={
        placeholders:PropTypes.any,
    }

    getChildContext(){
        return {
            placeholders:this.getPlaceholders()
        }
    }

    getPlaceholders(){
        const {placeholders:fromMaster, mergePlaceholders}=this.context
        const mine=React.Children.toArray(this.props.children).reduce((phs, a)=>{
            if(a.props.placeholder){
                phs.push(a)
            }
            return phs
        },[])
        return mergePlaceholders(mine, fromMaster)
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
