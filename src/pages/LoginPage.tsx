import * as React from 'react';
import { Store } from 'redux';
import * as Types from '../Types';
import * as Rx from 'rxjs/Rx';

interface LoginState {
    data: any;
}

let LoginPage: Types.Page<any, any> = {
    // redux reducer http://redux.js.org/docs/basics/Reducers.html
    reducer: function (state: LoginState = {data: {}}, action: any) {
        switch (action.type) {
            case 'LOGIN_SUBMITED':
                alert(JSON.stringify(action));
                return state;
            default: return state;
        }
    },

    // function that returns the React component for the page
    pageFactory: function (store: Store<{}>) {
        return React.createClass({
            getInitialState() {
                return {password: ''};
            },
            bindState(property: string) {
                return (event) => { this.setState({ [property]: event.target.value }); };
            },
            onSubmit(e: Event) {
                e.preventDefault();
                store.dispatch({type: 'LOGIN_SUBMITED', password: this.state.password});
            },
            render: function () {
                return (
                    <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input 
                            type="password" 
                            value={this.state.name} 
                            onChange={this.bindState('password')} 
                            className="form-control" 
                            id="exampleInputPassword1" 
                            placeholder="Password" 
                        />
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>);
            }
        });
    },
    
    epic: function (action$: Rx.Observable<any>) {
        return Rx.Observable.empty();
    },

    // the route to match to this page
    route: 'login'
};
export default LoginPage;