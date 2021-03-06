import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RfbUser } from './rfb-user.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RfbUserService {

    private resourceUrl =  SERVER_API_URL + 'api/rfb-users';

    constructor(private http: Http) { }

    create(rfbUser: RfbUser): Observable<RfbUser> {
        const copy = this.convert(rfbUser);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(rfbUser: RfbUser): Observable<RfbUser> {
        const copy = this.convert(rfbUser);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<RfbUser> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to RfbUser.
     */
    private convertItemFromServer(json: any): RfbUser {
        const entity: RfbUser = Object.assign(new RfbUser(), json);
        return entity;
    }

    /**
     * Convert a RfbUser to a JSON which can be sent to the server.
     */
    private convert(rfbUser: RfbUser): RfbUser {
        const copy: RfbUser = Object.assign({}, rfbUser);
        return copy;
    }
}
