import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './pages/Home';
import Calendars from './pages/Calendars';
import Documents from './pages/Documents';
import Projects from './pages/Projects';
import Reports from './pages/Reports';
import Teams from './pages/Teams';
import { Overlay } from './UX/Overlay';
import Dashboard from './pages/Dashboard';
import ContactsProvider, { ContactsContext } from './UX/Context/ContactsContext';

function App() {

  return (
    <div className='App '>
      {/* <ContactsContext.Provider value={USERS}> */}
      <ContactsProvider>
       <Router className='App '>
        <Overlay>
           <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/calendars" component={Calendars} />
              <Route path="/documents" component={Documents} />
              <Route path="/projects" component={Projects} />
              <Route path="/reports" component={Reports} />
              <Route path="/teams" component={Teams} />
              <Route path="/" component={Home} />
           </Switch>
        </Overlay>
       </Router>
      </ContactsProvider>
      {/* </ContactsContext.Provider> */}
    </div>
  );
}

export default App;
