import * as React from 'react';
import { Store } from 'redux';
import * as Types from '../Types';
import * as Rx from 'rxjs/Rx';

declare var fetch: any;

interface AboutPageState {
    data: any;
}

function aboutReducer(state: AboutPageState = {data: {}}, action: any) {
    switch (action.type) {
        case 'STUFF_FROM_WORLD_BANK':
            return { data: action.data };
        default: return state;
    }
}

function aboutPageFactory(store: Store<any>) {
    var fetching = false;
    return class AboutPage extends React.Component<any, any> {
        render() {
            var data = store.getState().about.data;
            return (
                <div>{data['user-agent'] ? data['user-agent'] : 'Loading...'}
                <button type="button" className="btn btn-default btn-lg">
                    <span className="glyphicon glyphicon-star" aria-hidden="true"/> Star
                </button>
            </div>);       
        }
        constructor() {
            super();
        }
        componentWillMount() {
            if (fetching) { return; };
            fetching = true;
            store.dispatch({type: 'FETCH_DATA'});
        }
    };
}

let AboutPage: Types.Page<any, any> = {
    // redux reducer http://redux.js.org/docs/basics/Reducers.html
    reducer: aboutReducer,

    // function that returns the React component for the page
    pageFactory: aboutPageFactory,
    
    epic: function (action$: Rx.Observable<any>) {
        return action$.filter(a => a.type === 'FETCH_DATA')
            .mergeMap(action => 
                Rx.Observable.ajax.getJSON('https://httpbin.org/user-agent')
                    .map(function (response: any) {
                        return { type: 'STUFF_FROM_WORLD_BANK', data: response };
                    })
            );
    },

    // the route to match to this page
    route: 'about'
};
export default AboutPage;