import DocxInput from "we-edit/input-docx"
import PPTX from "docx4js/openxml/pptx/document"
import HOCs from "./dom"

export default class extends DocxInput{
    static defaultProps={
		type: "pptx",
		name: "Presentation Document",
		ext: "pptx",
		mimeType: "application/vnd.openxmlformats-officedocument.presentationml.document"
	}

    static HOCs=HOCs

    parse({data,...props}){
        this.props=props
		return PPTX.load(data)
    }

    render(createElement, Dom){
        var fonts, defaultStyle
        const buildFactory=createElement=>(type,{node,type:_1,part,key:_2, ...props},children)=>{
			children=children.reduce((merged,a)=>{
				if(Array.isArray(a))
					merged.splice(merged.length,0, ...a)
				else
					merged.push(a)
				return merged
			},[])

			switch(type){
            case "document":
                node.id="root"
                return createElement(Dom.Document,{...props},children,node)
            case "slideMaster":
                node.id=part
                return createElement(Dom.Master,{...props,rid:node.attribs["r:id"]},children,node)
            case "slideLayout":
                node.id=part
                return createElement(Dom.Layout,{...props,rid:node.attribs["r:id"]},children,node)
            case "slide":
                node.id=part
                return createElement(Dom.Slide,{...props,rid:node.attribs["r:id"]},children,node)
            case "p":
                return createElement(Dom.Paragraph,props,children,node)
            case "r":
                return createElement(Dom.Run,props,children,node)
            case "t":
                return createElement(Dom.Text,{},node.children[0].data,node)
            case "shape":
                return createElement(Dom.Shape,props,children,node)
            case "picture":
            case "graphic":
            case "chart":
            case "diagram":
                return createElement(Dom.Container,props,children,node)
            case "table":
                return createElement(Dom.Table,props,children,node)
            default:
                if(children.length==1)
                    return children[0]
                return children
            }
        }

        this.doc.render(buildFactory(createElement))
    }
}
