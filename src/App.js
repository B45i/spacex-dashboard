import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LaunchGrid from './components/LaunchGrid/LaunchGrid';

import 'react-calendar/dist/Calendar.css';
import './App.css';

function App() {
    return (
        <Router>
            <Navbar />
            <Route path="/">
                <LaunchGrid />
            </Route>
        </Router>
    );
}

export default App;
