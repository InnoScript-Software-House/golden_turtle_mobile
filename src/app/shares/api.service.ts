import { Injectable } from '@angular/core';

/**
 * Import services, providers and lib
 */
import { Http } from '@capacitor-community/http';
import { environment } from 'src/environments/environment';

interface HTTP_OPTIONS {
  url: string;
  headers?: any;
  params?: any;
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor() { }

  public getRequest = async (path: string): Promise<any> => {
    const options: HTTP_OPTIONS = { url : `${environment.api_url}/${path}` }
    const response = await Http.get(options);

    if(response.status === 200) {
      return response.data;
    }

    return null;
  }
}
