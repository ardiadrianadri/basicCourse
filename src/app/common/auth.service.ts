import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

import { IAuthentication } from './authDefinition';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

    getAuthQuery (): IAuthentication {
        let result: IAuthentication = {
            ts: new Date().getTime(),
            apikey: environment.marvelPublicKey,
            hash: null
        };
        let md5 = new Md5();

        md5.appendStr( result.ts.toString() );
        md5.appendStr ( environment.marvelPrivateKey );
        md5.appendStr ( environment.marvelPublicKey );

        result.hash = md5.end().toString();

        return result;
    }
}
