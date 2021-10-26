const fs = require("fs")
const Jimp = require("jimp")
delete require.cache[require.resolve("slugify")]
const slugify = require("slugify")

// Make Slug
const Slug = (data) => {
    let newSlug = slugify(data, {
        replacement: '-',  // replace spaces with replacement character, defaults to `-`
        remove: /[`/|*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
        lower: true,      // convert to lower case, defaults to `false`
        strict: false,     // strip special characters except replacement, defaults to `false`
        locale: 'vi'       // language code of the locale to use
    })
    newSlug = newSlug + '-' + Date.now()
    return newSlug
}

// Get Host URL
const Host = (req) => {
    return req.protocol + '://' + req.get('host') + '/'
    // return 'https://' + req.get('host') + '/'
    // return 'http://api.famefair.com.bd/'
}

// Single file upload
const FileUpload = async (data, path) => {
    try {
        const image = data

        const newName = Date.now() + '.jpg'
        uploadPath = path + newName
        const moveFile = image.mv(uploadPath)

        if (moveFile) return newName
    } catch (error) {
        if (error) return error
    }
}

// Resize to 200x200 & upload
const SmFileUpload = async (file, uploadpath) => {
    try {
        // Recived file data
        let image = await Jimp.read(file.data)
        await image.resize(200, 200)
        await image.quality(50)
        const newFile = 'user-' + Date.now() + '.jpg'
        await image.write(uploadpath + '/' + newFile)
        return newFile
    } catch (error) {
        if (error) return error
    }
}

// Delete file from directory
const DeleteFile = (destination, file) => {
    fs.unlink(destination + file, function (error) {
        if (error) {
            return error
        }
        return
    })
}


module.exports = {
    Slug,
    Host,
    FileUpload,
    SmFileUpload,
    DeleteFile
}