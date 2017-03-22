import * as React from 'react';
import { Store } from 'redux';
import * as Types from '../Types';
import * as Rx from 'rxjs/Rx';
import Form, {IChangeEvent} from 'react-jsonschema-form';

interface LoginState {
    data: any;
}

/* tslint:disable:quotemark */
const loginFormSchema = {
  "title": "Login",
  "description": "A simple form example.",
  "type": "object",
  "required": [
    "Email",
    "Password"
  ],
  "properties": {
    "Email": {
      "type": "string",
      "format": "email"
    },
    "Password": {
      "type": "string",
      "format": "password"
    }
  }
};

const uiSchema = {
  "Email": {
    "ui:autofocus": true
  },
  "Password": {
    "ui:widget": "password",
    "ui:help": "Hint: Make it strong!"
  }
};
/* tslint:enable:quotemark */

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
            onSubmit(submission: IChangeEvent) {
                store.dispatch(Object.assign({type: 'LOGIN_SUBMITED'}, {formData: submission.formData}));
            },
            render: function () {
                const log = (type) => console.log.bind(console, type);
                return (
                        <Form 
                            schema={loginFormSchema}
                            onSubmit={this.onSubmit}
                            onError={log('errors')} 
                        />);
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