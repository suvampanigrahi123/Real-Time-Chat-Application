import './App.css';
// import socketIo from 'socket.io-client'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Join from './Components/join/Join'
import chat from './Components/Chat/Chat'
// const ENDPOINT='http://localhost:3100'
// const Socket=socketIo(ENDPOINT,{transports:['websocket']})
function App() {
  // Socket.on('connect',()=>{})
  return (
    <div className="App">
    <Router>
    <Route exact path='/' component={Join} />
    <Route exact path='/chat' component={chat} />
    </Router>
    </div>
  );
}
export default App;