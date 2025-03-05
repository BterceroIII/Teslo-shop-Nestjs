

import { Request } from 'express';
import { File as MulterFile } from 'multer';

export const fileFilter = ( req: Request, file: MulterFile, callback: Function ) => {

    // console.log({ file })
    if ( !file ) return callback( new Error('File is empty'), false );


    const fileExtension = file.mimetype.split('/')[1];
    const validExtensions = ['jpg','jpeg','png','gif'];

    if (  validExtensions.includes( fileExtension ) ) {
        return callback( null, true )
    }

    callback(null, false );

}