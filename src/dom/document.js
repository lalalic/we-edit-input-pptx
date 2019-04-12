import React, {Component} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

export default ({Document,Section,Frame})=>{
    class MyDocument extends Document{
        shouldContinueCompose(){
            return true
        }
    }

    return class extends Component{
        static displayName="document"

        static childContextTypes={
            defaultTextStyle:PropTypes.object,
            tableStyles: PropTypes.object,
        }
        getChildContext(){
            return {
                defaultTextStyle:this.props.defaultTextStyle,
                tableStyles: this.props.tableStyles
            }
        }

        state={error:null}
        getSlides(){
            const {children, sldSz:size}=this.props
            return React.Children.toArray(children)
                .filter(a=>a.type.displayName=="slide")
                .map((a,i)=>React.cloneElement(a,{i,I:i,...size}))
        }

        getMasters(){
            const slides=this.getSlides()
            const {children, sldSz:size}=this.props
            return React.Children.toArray(children)
                .filter(a=>a.type.displayName=="master")
                .map((a,i)=>React.cloneElement(a,{slides:slides.filter(b=>b.props.master==a.props.id)}))
        }

        typedChildren(content=this.props.children){
            const {children, sldSz:size, ...props}=this.props
            var I=0
            const {masters, slides}=React.Children.toArray(children).reduce((o,a)=>{
                const {masters,slides}=o
                switch(a.type.displayName){
                case "master":
                    masters.set(a.props.part,{
                        el:a,
                        layouts:React.Children.toArray(master.props.children)
                            .filter(a=>a.type.displayName=="layout")
                            .reduce((layouts,b)=>(layouts[b.props.part]=b,layouts),{})
                    })
                    break
                case "slide":
                    slides.push(React.cloneElement(a,{I:I++}))
                    break
                }
                return
            },{masters:new Map(), slides:[]})

            const layouts=slides.reduce((o,a)=>{
                const {layout}=a.props
                if(!o.has(layout))
                    o.put(layout,[])
                o.get(layout).push(a)
                return o
            },new Map())
            /*
            const masters=Array.from(layouts.keys()).reduce((o,a)=>{
                const {master:part}=a.props
                //const master=masters[a.props.]
                if(!o.has(masters[master]))
                    o.put(masters[master],[])
                //o.get(master).push({layout, slides:layouts.get(a))
                return o
            },new Map())
            */
        }

        componentDidCatch(error){
            this.setState({error:error.message})
        }

        render(){
            if(this.state.error)
                return <div>{this.state.error}</div>
            const {children, sldSz:size, ...props}=this.props
            return (
                <MyDocument {...props} scale={0.5}>{
                    this.getMasters()
                }</MyDocument>
            )
        }
    }
}
