import './App.css';
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import GetChips from './Components/GetChips';
import Navbar from './Components/Navbar';
import Home from './Home';
import CreateFolder from './CreateFolder';
import FolderCustomization from './FolderCustomization';

const errorLink =  onError(({ graphqlErrors, networkError}) => {
  if (graphqlErrors){
    graphqlErrors.map(({message, location, path}) => {
      alert(`Graphql error ${message}`)
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({uri: "http://localhost:4000/graphql"})
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})


function App() {
  return (
    <Router>
      <ApolloProvider client={client}> 
        <Navbar />
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/create-folder">
                <CreateFolder />
              </Route>
              <Route path="/folders/:id">
                <FolderCustomization />
              </Route>
            </Switch>
            
          </div>
        
      </ApolloProvider>
    </Router>
  
  );
}

export default App;
