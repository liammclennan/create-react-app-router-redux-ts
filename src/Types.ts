import { Store } from 'redux';
import * as Rx from 'rxjs/Rx';

export interface Page<PageProps, PageState> {
    reducer: (state: any, action: any) => any;
    pageFactory: (store: Store<any>, sideEffects: any) => any;
    sideEffects: any;
    epic: (action$: Rx.Observable<any>) => Rx.Observable<any>;
    route: string;
}