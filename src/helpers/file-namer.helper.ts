import { v4 as uuid } from 'uuid';
import { File as MulterFile } from 'multer';

export const fileNamer = ( req: Express.Request, file: MulterFile, callback: Function ) => {

    // console.log({ file })
    if ( !file ) return callback( new Error('File is empty'), false );

    const fileExtension = file.mimetype.split('/')[1];

    const fileName = `${ uuid() }.${ fileExtension }`;


    callback(null, fileName );

}