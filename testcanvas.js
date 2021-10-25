const {registerFont, createCanvas} = require("canvas")
const fs = require("fs")

registerFont("fonts/Formula1-Bold.ttf", {family: "Formula1"})

function get_text_width(text, font){

    const canvas = createCanvas(0, 0)
    const context = canvas.getContext('2d')
    
    context.font = font

    const width = context.measureText(text.toString()).width
    return width
}

async function create_image(table, title, desc=null){
    const fs = require('fs')
    const { createCanvas, loadImage } = require('canvas')    

    const titleWidth = get_text_width(title, '50pt "Formula1 Display-Bold"') + 30
    const titleHeight = 120

    const descWidth = desc === null ? 0 : get_text_width(desc, '40pt "Formula1 Display-Bold"') + 25
    const descHeight = desc === null ? 0 : 120

    let maxTableColumnWidth = []
    for (let i=0; i<table[0].length; i++)
        maxTableColumnWidth.push(0)

    for (const t of table){
        for (const [i, text] of t.entries()){
            const textWidth = get_text_width(text, 'bold 30pt Arial') + 30
            maxTableColumnWidth[i] = Math.max(maxTableColumnWidth[i], textWidth)
        }
    }

    let image = await loadImage('./logo_f1.png')

    let totalTableWidth = Math.max(maxTableColumnWidth.reduce((prev, cur) => prev+cur), image.width)
    if (titleWidth > totalTableWidth){
        let dif = titleWidth-totalTableWidth
        for (let i=0; i<maxTableColumnWidth.length; i++){
            maxTableColumnWidth[i] += Math.floor(dif/maxTableColumnWidth.length)
        }
        maxTableColumnWidth[-1] += dif%maxTableColumnWidth.length
    }
    totalTableWidth = Math.max(maxTableColumnWidth.reduce((prev, cur) => prev+cur), image.width)

    let fontHeight = 90
    let totalTableHeight = (fontHeight) * (table.length+1)

    width = Math.max(totalTableWidth, image.width, titleWidth) + 20
    height = 10 + image.height + 10 + titleHeight + 10 + totalTableHeight + 10
    
    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')

    context.fillStyle = '#fff'
    context.fillRect(0, 0, width, height)

    context.drawImage(image, 10, 10)

    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.font = '50pt "Formula1 Display-Bold"'

    const titleY = 10+image.height+40
    context.fillStyle = '#000'
    context.fillRect(10, titleY, totalTableWidth, titleHeight)
    context.fillStyle = '#fff'
    context.fillText(title, 10 + totalTableWidth/2, titleY+titleHeight/2)

    const descY = titleY + titleHeight + (desc === null ? 0 : 20) 
    if (desc != null){
        context.fillStyle = '#888'
        context.fillRect(10, descY, totalTableWidth, descHeight)
        context.fillStyle = '#fff'
        context.fillText(desc, 10 + totalTableWidth/2, descY+descHeight/2)
    }

    const tableY = descY + descHeight + 50
    let curHeight = tableY
    context.textAlign = 'left'
    context.textBaseline = 'middle'
    for (const [line, t] of table.entries()){
        
        context.fillStyle = line%2 == 0 ? '#ddd' : '#fff'
        if (line == 0) context.fillStyle = '#ddd'
        context.fillRect(10, curHeight, totalTableWidth, fontHeight)

        context.fillStyle = '#000'
        context.font = line == 0 ? 'bold 30pt Arial': '30pt Arial' 
        let curWidth = 10
        for (const [i, text] of t.entries()){
            context.fillText(text, curWidth+10, curHeight+fontHeight/2)
            curWidth += maxTableColumnWidth[i]
        }
        curHeight += fontHeight
    }

    context.fillStyle = "#000"
    context.fillRect(10, tableY + fontHeight - 2, totalTableWidth, 4)

    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync('./out.png', buffer)
}

module.exports = create_image