const fs = require('fs')
const path = require('path')
const helpObj = require('./Commands/help')
const treeObj = require('./Commands/tree')
const organizeObj = require('./Commands/organize')


//let input = process.argv[3]
//console.log(input)

let inputArr = process.argv.slice(2)
//console.log(inputArr)

let command = inputArr[0]

let types = {
    media: ["mp4", "mkv","mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}


switch(command){
        case 'tree':
            treeObj.treeFnKey(inputArr[1])
            break;

        case 'organize':
            organizeObj.organizeKey(inputArr[1])
            break;

        case 'help':
            helpObj.helpFnKey()
            break;
            
         default :
         console.log('PLEASE ENTER A VALID COMMAND')
         break;
}









