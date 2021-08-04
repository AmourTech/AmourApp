import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './Home'
import Clients from './Clients'
import Proposals from './Proposals'
import Services from './Services'
import Library from './Library'
import Settings from './Settings'

function App() {
  return (
    <Router>
      <div className="App">
        <aside>
          <Link to={'/'}>Home</Link>
          <Link to={'/Clients'}>Clients</Link>
          <Link to={'/Proposals'}>Proposals</Link>
          <Link to={'/Services'}>Services</Link>
          <Link to={'/Library'}>Library</Link>
          <Link to={'/Settings'}>Settings</Link>
        </aside>

        <main>
          <Route exact path="/" component={Home} />
          <Route path="/Clients" component={Clients} />
          <Route path="/Proposals" component={Proposals} />
          <Route path="/Services" component={Services} />
          <Route path="/Library" component={Library} />
          <Route path="/Settings" component={Settings} />
        </main>
      </div>
    </Router>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
