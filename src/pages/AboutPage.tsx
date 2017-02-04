import * as React from 'react';
import { Store } from 'redux';

declare var fetch: any;

interface AboutPageState {
    data: any;
}
interface AboutSideEffects {
    onLoad: () => Promise<any>;
}
interface AppState {
    about: AboutPageState;
}

function aboutReducer(state: AboutPageState = {data: {}}, action: any) {
    switch (action.type) {
        case 'STUFF_FROM_WORLD_BANK':
            return { data: action.data };
        default: return state;
    }
}

function aboutPageFactory(store: Store<AppState>, sideEffects: AboutSideEffects) {
    return class AboutPage extends React.Component<any,any> {
        render() {
            var data = store.getState().about.data;
            return <div>{data['user-agent'] ? data['user-agent'] : 'Loading...'}
                <button type="button" className="btn btn-default btn-lg">
                    <span className="glyphicon glyphicon-star" aria-hidden="true"/> Star
                </button>
            </div>;       
        }
        constructor() {
            super();
            sideEffects.onLoad()
                .then(data => store.dispatch({type: 'STUFF_FROM_WORLD_BANK', data: data}))
                .catch(err => { throw err; });
        }
    };
}

const aboutSideEffects: AboutSideEffects = { 
    onLoad: function () {
        return fetch('https://httpbin.org/user-agent')
            .then(response => response.json());
    }
};

let AboutPage = {
    // redux reducer http://redux.js.org/docs/basics/Reducers.html
    reducer: aboutReducer,

    // function that returns the React component for the page
    pageFactory: aboutPageFactory,
    
    // collection of side effect functions (ajax etc)    
    sideEffects: aboutSideEffects,

    // the route to match to this page
    route: 'about'
};
export default AboutPage;