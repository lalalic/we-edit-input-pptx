import React from "react"
import ReactDOM from "react-dom"
import {Editor,Input,Representation} from "we-edit"
import Pagination from "we-edit/representation-pagination"
import PPTX from "./src"

Input.install(PPTX)
Representation.install(Pagination)

fetch("./test.pptx")
    .then(req=>req.blob())
    .then(data=>Input.parse({data,type:"pptx"}))
    .then(doc=>{
            const container=document.createElement("div")
            document.body.appendChild(container)
            container.style="position:absolute;width:100%;height:100%;overflow-y:scroll"
            ReactDOM.render(
                <doc.Store>
                    <Editor representation="pagination" viewport={{width:800,height:600}}/>
                </doc.Store>,
                container)
    })
