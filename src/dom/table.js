import React,{Component} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import {ReactQuery} from "we-edit"
import defaults from "lodash.defaultsdeep"

export default ({Table})=>class extends Component{
    static displayName="table"
    static contextTypes={
        tableStyles: PropTypes.object
    }

    static childContextTypes={
		cols: PropTypes.arrayOf(PropTypes.shape({
            x: PropTypes.number,
            width: PropTypes.number
        })),
        tableStyle: PropTypes.object
	}

    getChildContext(){
        return {
            cols:this.getRowCols(),
            tableStyle: this.getTableStyle()
        }
    }

    getRowCols(){
        return memoize((cols=this.props.cols)=>cols.reduce((state,w)=>{
            state.cols.push({x:state.x,width:w})
            state.x+=w
            return state
        },{x:0,cols:[]}).cols)()
    }

    getTableStyle(){
        const {
            props:{tblStyle:direct={},tableStyleId,...toggles},
            context:{tableStyles}
        }=this

        return "bandCol,bandRow,firstCol,firstRow,lastCol,lastRow".split(",")
            .reduce((style,a)=>{
                if(toggles[a]!=="1"){
                    switch(a){
                    case 'bandCol':
                        delete style.band1V
                        delete style.band2V
                    break
                    case 'bandRow':
                        delete style.band1H
                        delete style.band2H
                    break
                    default:
                        delete style[a]
                    }
                }
                return style
            },defaults({},direct, tableStyles[tableStyleId]))
    }


    getConditionalChildren(){
        const {bandCol,bandRow,firstCol,firstRow,lastCol,lastRow, children}=this.props
        const rows=new ReactQuery(<table>{children}</table>).find("row").toArray()
        rows.forEach((a,iRow)=>{
            const $row=new ReactQuery(a)
            const cells=$row.find("cell").toArray()
            cells.forEach((cell,iCell)=>{
                const attr=type=>cell.props.cnf.add(type)
                cell.props.cnf.clear()
                attr("wholeTbl")

                if(firstRow=="1" && iRow==0){
                    attr("firstRow","1")
                }

                if(lastRow=="1" && iRow==rows.length-1 && rows.length>1){
                    attr("lastRow","1")
                }

                if(firstCol=="1" && iCell==0){
                    attr("firstCol","1")
                }
                if(lastCol=="1" && iCell==cells.length-1 && cells.length>1){
                    attr("lastCol","1")
                }

                if(bandCol=="1"){
                    attr(`band${2-iCell%2}V`,"1")
                }
                if(bandRow=="1"){
                    attr(`band${2-iRow%2}H`,"1")
                }
            })
        })
        return children
    }

    render(){
        const {
            style:$1,
            bandCol,bandRow,firstCol,firstRow,lastCol,lastRow,
            cols,
            width=cols.reduce((w,a)=>w+a,0),
            children,
            ...props}=this.props
        return <Table {...props} {...{width}} children={this.getConditionalChildren()}/>
    }
}
