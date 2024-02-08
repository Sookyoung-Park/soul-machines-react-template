import ReactGA from 'react-ga4';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Link,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { XCircle } from 'react-bootstrap-icons';
import DPChat from './routes/DPChat';
import DPChat2 from './routes/DPChat2';
import LandingAfter from './routes/LandingAfter';
import Loading from './routes/Loading';
import Feedback from './routes/FeedbackRoute';
import ContentCardTest from './routes/ContentCardTest';
import PreSurvey from './routes/PreSurvey';
import PreSurvey1 from './routes/PreSurvey1';
import PreSurvey2 from './routes/PreSurvey2';
import NextConversation from './routes/NextConversation';
import afterSurvey1 from './routes/afterSurvey1';

// only init google analytics if a tracking ID is defined in env
const { REACT_APP_GA_TRACKING_ID } = process.env;
if (REACT_APP_GA_TRACKING_ID) {
  ReactGA.initialize(REACT_APP_GA_TRACKING_ID, { debug: true });
  console.log(`initializing google analytics with tracking ID ${REACT_APP_GA_TRACKING_ID}`);
} else console.warn('no google analytics tracking ID provided!');

// make GA aware of what pages people navigate to in react router
const LinkGAtoRouter = withRouter(({ history }) => {
  history.listen((location) => {
    ReactGA.set({ page: location.pathname });
  });
  return null;
});

function App() {
  const { error } = useSelector(({ sm }) => ({ ...sm }));
  const [ignoreError, setIgnoreError] = useState(false);
  // every time error changes, set ignore error to false
  useEffect(() => setIgnoreError(false), [error]);

  // send SM session ID to google analytics when we connect
  if (REACT_APP_GA_TRACKING_ID) {
    const sessionID = useSelector(({ sm }) => sm.sessionID);
    useEffect(() => {
      if (sessionID !== '') ReactGA.gtag('event', 'sm_session_id', { sm_session_id: sessionID });
    }, [sessionID]);
  }

  return (
    <Router>
      { error && !ignoreError
        ? (
          <div className="error-modal">
            <div className="error-modal-card">
              <div className="d-flex justify-content-end">
                <button className="btn-unstyled" type="button" onClick={() => setIgnoreError(true)}>
                  <XCircle size={22} />
                </button>
              </div>
              <div className="error-modal-inner">
                <h2 className="text-center mb-4">
                  Something has gone wrong!
                </h2>
                <p className="mb-4">
                  Sorry for the interruption.
                  Feel free to start again, or give us some feedback to help us improve!
                </p>
                <div className="d-flex justify-content-center mb-4">
                  <Link to="/loading" className="btn btn-dark me-2">Reconnect</Link>
                  <Link to="/" className="btn btn-outline-dark">Return to Main Page</Link>
                </div>
                <div className="d-flex justify-content-center">
                  <code className="text-danger">{error.msg}</code>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      <Switch>
        <Route path="/content-card-test">
          <ContentCardTest />
        </Route>
        <Route path="/loading">
          <Loading />
        </Route>
        <Route path="/chat">
          <DPChat2 />
        </Route>
        <Route path="/video">
          <DPChat />
        </Route>
        <Route path="/feedback">
          <Feedback />
        </Route>
        <Route path="/feedback">
          <afterSurvey1 />
        </Route>
        <Route path="/next-conversation">
          <NextConversation />
        </Route>
        <Route path="/presurvey1">
          <PreSurvey1 />
        </Route>
        <Route path="/presurvey2">
          <PreSurvey2 />
        </Route>
        <Route path="/landingafter">
          <LandingAfter />
        </Route>
        {/* / goes at the bottom */}
        <Route path="/">
          <PreSurvey />
        </Route>
      </Switch>
      <LinkGAtoRouter />
    </Router>
  );
}

export default App;
