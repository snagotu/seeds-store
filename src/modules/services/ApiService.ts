import { Observable, throwError, of } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map, retryWhen, switchMap, take, delay, concat } from 'rxjs/operators';

import { ENV } from '../../constants';
import { GeneralModel, UserModel, ProductsModel } from '../models';

export class ApiService {
  private http = ajax;
  private apiUrl: string = ENV.API.URL;
  private maxRetries: number = ENV.API.MAX_RETRIES;
  private retryTimeout: number = ENV.API.RETRY_TIMEOUT; /** @todo */
  private token: string = null;

  public setToken(token: string): void {
    this.token = token;
  }

  public login(body: { email: string; password: string }): Observable<GeneralModel.ILoginResponse> {
    // return this.request<GeneralModel.ILoginResponse>(`${ENV.API.ENTITY.AUTH}/parents/login`, { method: 'POST', body });
    return of({
      _id: '9164e4c4-6521-47bb-97fd-c75ac02b2cf5',
      email: body.email,
      name: 'SIVA NAGOTU',
      firstname: 'siva ',
      lastname: 'Nagotu',
      nickname: 'Siva',
      avatar: 'https://lh4.googleusercontent.com/-WUY2PDwnKZk/AAAAAAAAAAI/AAAAAAAAAAc/1UMlOKImKRA/photo.jpg',
      picture: 'https://s.gravatar.com/avatar/8e5ef526703b1e38f75cba07ec2c3604?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fdg.png',
      gender: null,
      location: 'sf',
      role: 'general',
      lastOnline: new Date(),
      forcedStatus: UserModel.ForcedStatus.AVAILABLE,
      status: UserModel.Status.ONLINE,
      access_token: 'access-token',
      createdAt: new Date(),
      updatedAt: null
    }).pipe(delay(300));
  }

  public getUserList(idList: string[]): Observable<GeneralModel.IPagination<UserModel.IUser>> {
    // return this.request(ENV.API.ENTITY.USER, { method: 'GET', query: { q: { _id: idList }, page: 1, limit: 20 } });
    return of({
      count: 1,
      page: 1,
      limit: 1,
      totalPages: 1,
      docs: [
        {
          _id: idList[0],
          email: 'snagotu@accenture.com',
          name: 'Siva Nagotu',
          firstname: 'Siva ',
          lastname: 'Nagotu',
          nickname: 'Siva',
          avatar: 'https://lh4.googleusercontent.com/-WUY2PDwnKZk/AAAAAAAAAAI/AAAAAAAAAAc/1UMlOKImKRA/photo.jpg',
          picture: 'https://s.gravatar.com/avatar/8e5ef526703b1e38f75cba07ec2c3604?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fdg.png',
          gender: null,
          location: 'sf',
          role: 'general',
          lastOnline: new Date(),
          forcedStatus: UserModel.ForcedStatus.AVAILABLE,
          status: UserModel.Status.ONLINE,
          createdAt: new Date(),
          updatedAt: null
        }
      ]
    }).pipe(delay(300));
  }
  
  public getProductsList(query: GeneralModel.IApiQuery): Observable<GeneralModel.IPagination<ProductsModel.IProducts>> {    
    //return this.request(ENV.API.ENTITY.PRODUCTS, { method: 'GET', query} );
    return of({
      count: query.limit,
      page: query.page,
      limit: query.limit,
      totalPages: 300,
      docs: Array.from(new Array(query.limit)).map(() => ({
        _id: String(Math.random()),       
        title: (Math.random() + 1).toString(36).substring(7),
        binomialName: (Math.random() + 1).toString(36).substring(7),
        description: `product description ${String(Math.random())}`,
        ukOnly: Math.random() < 0.5,
        image1: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Taraxacum_officinale_PID1200-1.jpg',
        image2: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Bombus_ruderarius_-_Taraxacum_officinale_-_Keila.jpg',
        accentColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
        backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
        textColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
        order: Number(Math.random()),
        price: Number(Math.random())
      }))
    }).pipe(delay(150));
  }

  private request<T = any>(
    path: string,
    options: { method: string; body?: any; query?: GeneralModel.IApiQuery; headers?: { [key: string]: any } } = { method: 'GET' }
  ): Observable<T> {
    options.headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
    if (options.body) options.body = this.parseBody(options.body);
    if (this.token) options.headers['x-access-token'] = this.token;
    const requestOptions = { body: options.body, headers: options.headers, method: options.method };
    return this.http({ url: `${this.apiUrl}/${path}?${this.parseQuery(options.query)}`, ...requestOptions }).pipe(
      map(data => data.response as T),
      retryWhen((error: Observable<AjaxResponse>) =>
        error.pipe(
          switchMap((e: AjaxResponse) => {
            if (e.status !== 401) return of(e).pipe(delay(this.retryTimeout));
            else return throwError(e);
          }),
          take(this.maxRetries),
          concat(throwError(error))
        )
      )
    );
  }

  private parseQuery(query: GeneralModel.IApiQuery): string {
    try {
      return Object.keys(query)
        .map(key => `${key}=${query[key] && typeof query[key] === 'object' ? JSON.stringify(query[key]) : query[key]}`)
        .join('&');
    } catch {
      /* istanbul ignore next line */
      return '';
    }
  }

  private parseBody(body: { [key: string]: any }): string {
    try {
      return JSON.stringify(body);
    } catch {
      /* istanbul ignore next line */
      return '';
    }
  }
}
