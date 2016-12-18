import { Injectable } from '@angular/core';
import { IAuthentication } from './authDefinition';
import { environment } from '../../environments/environment';
import { Md5 } from 'ts-md5/dist/md5';


@Injectable()
export class AuthService {

    getAuthQuery(): IAuthentication {
        let result: IAuthentication = {
            ts: new Date().getTime().toString(),
            apiKey: environment.marvelPublicKey,
            hash: null
        };

        let md5: Md5 = new Md5();

        md5.appendStr(result.ts);
        md5.appendStr(environment.marverPrivetKey);
        md5.appendStr(environment.marvelPublicKey);

        result.hash = md5.end().toString();

        return result;
    }
}
