import { Store } from 'redux';

export interface Page<PageProps, PageState> {
    reducer: (state: any, action: any) => any;
    pageFactory: (store: Store<any>, sideEffects: any) => any;
    sideEffects: any;
    route: string;
}