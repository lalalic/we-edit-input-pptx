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

class Style{
    constructor(style,keys){
        this.flat=memoize(()=>Object.keys(style)
            .reduce((props, k)=>{
                if(k in this){
                    let v=this[k](style[k],style)
                    if(v!=undefined){
                        props[keys[k]||k]=v
                    }
                }
                return props
            },{}))
    }
}

class TextStyle extends Style{
    constructor(style){
        super(style,{sz:"size",b:"bold",i:"italic",latin:"fonts"})
    }
    sz=v=>parseInt(v)/100
    b=v=>!!b
    i=v=>!!b
    latin=(a,{latin, ea, cs})=>[latin,ea,cs].filter(a=>a).join(",")||undefined
}

class ParagraphStyle extends Style{
    constructor(style){
        super(style,{algn:"align"})
    }

    algn(v){
        return {ctr:"center"}[v]
    }
}

class ShapeStyle extends Style{
    constructor(style){
        super(style,{anchor:"vertAlign",xfrm:"size"})
    }

    anchor(v){
        return {b:"bottom",ctr:"middle",t:"top", dist:"distributed",just:"justified"}[v]
    }

    xfrm({ext}){
        return ext
    }
}
