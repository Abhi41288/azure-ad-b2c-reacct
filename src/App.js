import logo from './logo.svg';
import './App.css';
import { config } from './Config';
import { PublicClientApplication } from '@azure/msal-browser';
import {useState, useEffect, Component} from 'react';


class App extends Component {
  // const [error, setError] = useState(null);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [user,setUser] = useState({});
  // let publicClientApplication;

  constructor(props){
    super(props);
    this.state={
      error:null,
      isAuthenticated:false,
      user:{}
    };
    this.login = this.login.bind(this)
    this.publicClientApplication = new PublicClientApplication({
      auth:{
        clientId:config.appId,
        redirectUri: config.redirectUri,
        authority:config.authority
      },
      cache:{
        cacheLocation:"sessionStorage",
        storeAuthStateInCookie:true
      }
    });
  }

     

   async login (){
    try {
      await this.publicClientApplication.loginPopup(
        {
          scopes:config.scopes,
          prompt: "select account"
        }
      );
      this.setState({isAuthenticated:true})
    } catch (error) {
      this.setState({
        isAuthenticated:false,
        user:{},
        error:error
      });
    }
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
         {this.isAuthenticated ? <p>
          success
         </p>: 
         <button onClick={()=>this.login()}>login</button>}      
        </header>
      </div>
    );
  }
  
}

export default App;
