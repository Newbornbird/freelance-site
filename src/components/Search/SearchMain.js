import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
import Form from './Form';
import JobPostStatus from './JobPostStatus';
import Hello from './Hello';
import JobTalentSwitch from './JobTalentSwitch';
import Panel from './Panel';
import JobTalentButton from './JobTalentButton';
import PanelCheckboxJob from './PanelCheckboxJob';
import PanelCheckboxTalent from './PanelCheckboxTalent';
import JobList from './JobList';
import BtnStartNewProject from './BtnStartNewProject';
import BtnStartNewPromotion from './BtnStartNewPromotion';
import BtnTellOthers from './BtnTellOthers';
import JobListFooter from './JobListFooter';
import TalentList from './TalentList';
import PostJob from '../PostJob.js/PostJob';
// import TestModal from '../TestModal';
import { SWITCH_SEARCH, 
  GET_MORE, CHANGE_CHECKBOX_DATA_NAME,
  SORT, BIG_ACTION, CHANGE_INPUT_STRING_VALUE } from '../../actions';
    
export class SearchMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryParams: { },
      modalIsOpen: true

    }
  }

  openModal = () => {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.search !== this.props.location.search || prevProps.location.pathname !== this.props.location.pathname) {
      let parseString = queryString.parse(window.location.search);
      this.props.BIG_ACTION(parseString, window.location.pathname);
    }
  }

  componentDidMount() {
    let parseString = queryString.parse(window.location.search);
    this.props.BIG_ACTION(parseString, window.location.pathname);
  }

  render() {
    return (
      <div className="content">
        { this.props.redirectIsActive ? <Redirect to={{
              pathname: this.props.pathName,
              search: queryString.stringify(this.props.inputData, { encode: false })
        }} /> : ''}
        <PostJob isOpen={ this.state.modalIsOpen } openModal={ this.openModal }  />
        <div className="container-fluid">
          <div className="row content-header flexbox">
            <div className="col-xs-2 left-sidebar">
              <Hello />
              
            </div>
            <div className="col-xs-10">
              <Form 
                inputData = { this.props.inputData }
                CHANGE_CHECKBOX_DATA_NAME = { this.props.CHANGE_CHECKBOX_DATA_NAME } 
                CHANGE_INPUT_STRING_VALUE = { this.props.CHANGE_INPUT_STRING_VALUE }
                q = { this.props.inputStringValue['q'] }
              />
              <JobPostStatus />
            </div>
          </div>
          <div className="row job-boxes-header flexbox">
            <div className="col-xs-2 left-sidebar">
              <JobTalentSwitch
                pathName = {this.props.pathName}
                SWITCH_SEARCH = { this.props.SWITCH_SEARCH }
              />
              <JobTalentButton/>
            </div>
            <div className="col-xs-10">
              <Panel 
                meta = { this.props.meta }
                SORT = { this.props.SORT }
                pathName = { this.props.pathName }
                inputData = { this.props.inputData }
              />
            </div>
          </div>
          <div className="row main-content flexbox">
            <div className="col-xs-2 left-sidebar">
              <Switch>
                <Route path="/board/search/talent" component={ PanelCheckboxTalent } />
                <Route path="/board/search/job" component={ PanelCheckboxJob } /> 
              </Switch>
            </div>
            <div className={ 
              window.location.pathname==='/board/search/job' ? 
                "col-xs-10 container-fluid job-boxes--jobs" : 
                "col-xs-10 container-fluid job-boxes--talents"}>
              <div className="flexbox row">
                <div className="col-xs-12">
                  <Switch>
                    <Route path="/board/search/talent" component={ TalentList } />
                    <Route path="/board/search/job" component={ JobList } />         
                  </Switch>
                    <JobListFooter
                      meta={this.props.meta}
                      inputData={ this.props.inputData }
                      GET_MORE = { this.props.GET_MORE }
                      // SORT_JOBS = { this.props.SORT_JOBS }
                    />
                </div>
                <div className="col-xs-3">
                  <BtnStartNewProject openModal={ this.openModal }/>
                  <BtnStartNewPromotion />
                  <BtnTellOthers />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    pathName: state.status.pathName,
    inputData: state.inputData,
    redirectIsActive: state.status.redirectIsActive,
    meta: state.meta,
    inputStringValue: state.inputStringValue
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    SWITCH_SEARCH: bindActionCreators(SWITCH_SEARCH, dispatch),
    GET_MORE: bindActionCreators(GET_MORE, dispatch),
    SORT: bindActionCreators(SORT, dispatch),
    CHANGE_CHECKBOX_DATA_NAME: bindActionCreators(CHANGE_CHECKBOX_DATA_NAME, dispatch),
    BIG_ACTION: bindActionCreators(BIG_ACTION, dispatch),
    CHANGE_INPUT_STRING_VALUE: bindActionCreators(CHANGE_INPUT_STRING_VALUE, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchMain));
