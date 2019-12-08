import fs from 'fs';
import Jimp = require('jimp');
const path = require('path');
const slash = require('slash');
const regex = require('regex');

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string>{
    return new Promise( async resolve => {
        const photo = await Jimp.read(inputURL);
        const outpath = '/tmp/filtered.'+Math.floor(Math.random() * 2000)+'.jpg';

        var re = /(^[a-zA-Z]:)(.*)/;
        var str = slash(__dirname);
        var dirname = str.replace(re, '$2');
        // console.log("dirname = " + dirname);

        await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        // .write(__dirname+outpath, (img)=>{
        .write(dirname+outpath, (img)=>{
            resolve(dirname+outpath);
        });
    });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
// export async function deleteLocalFiles(files:Array<string>){
  export async function deleteLocalFiles(file: string){
      // console.log("deleteLocalFiles 111 - file = " + file);

      fs.unlinkSync(file);
      // console.log("deleteLocalFiles 222 - file = " + file);

}

// export async function sendResponse(res: Response, file:string) {
//     res.status(200)
//        .sendFile(file);
//       console.log("sendResponse- file = " + file);
//}
