const fs = require('fs')
const path = require('path')


function organizeFn(dirpath) {
    //1. input of a directory path
    let destPath;

    if (dirpath == undefined) {
        console.log("Please enter a Directory Path")
        return;
    }
    else {

        let doesExist = fs.existsSync(dirpath)

        if (doesExist == true) {
            //2. create a organized files directory
            destPath = path.join(dirpath, 'organized_files')
            //dirpath -> C:\Users\ishik\Desktop\project\test folder
            // destPath ->C:\Users\ishik\Desktop\project\test folder\organized_files
            if (fs.existsSync(destPath) == false) {
                fs.mkdirSync(destPath)
            }

            else {
                console.log("Folder already exists")
            }
        }

        else {
            console.log("Please enter a valid path")
        }
    }
    organizeHelper(dirpath, destPath)
}

// organizeHelper() to categorize the files
function organizeHelper(src, dest) {

    let childNames = fs.readdirSync(src)     //to get all the files and folders in that directory

    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i])
        let isFile = fs.lstatSync(childAddress).isFile()   //getting the stats of the path(childAddress) and identifying files ; if it is path of folder then it cannot be organized

        if (isFile) {
            let fileCategory = getCategory(childNames[i])
            console.log(childNames[i] + ' belongs to ' + fileCategory)

            sendFiles(childAddress, dest, fileCategory)
        }
    }


}

function getCategory(name) {
    let ext = path.extname(name)     //taking out extension of files
    // console.log(ext)
    ext = ext.slice(1)       //to remove the dots from extension
    //console.log(ext)

    for (let type in types) {
        let cTypeArr = types[type]
        //console.log(cTypeArr)

        for (let i = 0; i < cTypeArr.length; i++) {
            if (ext == cTypeArr[i]) {
                return type     //returning type of the file
            }
        }
    }
    return 'others'

}

function sendFiles(srcFilePath, dest, fileCategory) {
    let catPath = path.join(dest, fileCategory)
    //C:\Users\ishik\Desktop\project\test folder\organized_files\app


    if (fs.existsSync(catPath) == false) {
        fs.mkdirSync(catPath)
    }

    let fileName = path.basename(srcFilePath)
    let destFilePath = path.join(catPath, fileName)
    //C:\Users\ishik\Desktop\project\test folder\organized_files\app\Git-2.34.1-64-bit.exe

    fs.copyFileSync(srcFilePath, destFilePath)  //copying files from srcFilePath(childAddress) to destFilePath (each category folder)
    fs.unlinkSync(srcFilePath)  //to remove files from path

    console.log(fileName + " copied to " + fileCategory)
}

module.exports ={
    organizeKey : organizeFn
}