import memoize from "memoize-one"

export function toTextStyle({sz, b, i, cap, strike, u, fill, latin, ea, cs}){
    return new TextStyle(...arguments).flat()
}

export function toParagraphStyle({spcBef, spcAft, indent,algn}){
    return new ParagraphStyle(...arguments).flat()
}

export function toShapeStyle(){
    return new ShapeStyle(...arguments).flat()
}

export function toCellStyle(){
    return new CellStyle(...arguments).flat()
}

class Style{
    constructor(style,keys,...directs){
        const drFn=k=>k
        this.flat=memoize(()=>Object.keys(style)
            .reduce((props, k)=>{
                const fn=this[k]||(directs.includes(k)&&drFn)
                if(fn){
                    let v=fn.bind(this)(style[k],props, style)
                    if(v!=undefined && v!=props){
                        const name=keys[k]||k
                        props[name]=v
                    }
                }

                return props
            },{}))
    }

    got(props,key){
        return props[key]||(props[key]={})
    }
}

class TextStyle extends Style{
    constructor({latin, ea, cs, ...style}){
        super({...style, fonts:{latin, ea, cs}},
            {sz:"size",b:"bold",i:"italic",solidFill:"color"},
            "solidFill"
        )
    }
    sz=v=>parseInt(v)/100
    b=v=>!!v
    i=v=>!!v
    fonts=({latin, ea, cs})=>[latin,ea,cs].filter(a=>a).join(",")||undefined
}

class ParagraphStyle extends Style{
    constructor({buFont:fonts, buChar:char, buSzPct:size, buSzPts:sizePts, buAutoNum:num,buNone, ...style}){
        super({...style, numbering:{fonts, char, size, sizePts, num, buNone}},{
            algn:"align",
            spcBef:""
        })
    }

    algn(v){
        return {ctr:"center",l:"left", r:"right"}[v]
    }

    marL(v,props){
        this.got(props,'indent').left=v
    }

    indent(v,props){
        this.got(props,'indent').firstLine=v
    }

    numbering({fonts, char, size, sizePts, num, buNone}){
        if(buNone || !fonts)
            return
        return {style:{fonts, size}, sizePts, label:char||num}
    }

    spcBef(v,props){
        this.got(props, 'spacing').top=v
    }

    spcAft(v,props){
        this.got(props, 'spacing').bottom=v
    }
}

class ShapeStyle extends Style{
    constructor(style){
        super(style,{
            anchor:"vertAlign",

        },"geometry","solidFill")
    }

    anchor(v){
        return {b:"bottom",ctr:"middle",t:"top", dist:"distributed",just:"justified"}[v]
    }

    xfrm=(a, props)=>Object.assign(props, a)

    blipFill=({blip, ...props})=>({...blip, ...props})
}

class CellStyle extends Style{
    constructor({tcBdr={}, ...others}){
        super({...tcBdr, ...others},{fill:"background"})
        const edge=({w:sz=0,cmpd,solidFill:color})=>({sz,color})
        this.bottom=this.top=this.right=this.left=edge
    }

    fill({solidFill}){
        return solidFill
    }
}
