import md5 from 'crypto-js/md5';

export enum HTTP_METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}


export function getFixtureFileName(method: HTTP_METHOD, requestBody: string, url: string): string {
   return md5(`${method}${requestBody.replace(/\n|\s/g, '')}${url}`);
}