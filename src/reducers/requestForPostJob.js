import { handleActions } from 'redux-actions';

const requestForPostJob = handleActions(
  {
    CHOOSE_CATEGORY: (state, action) => ({ ...state, category: { ...action.payload } }),
    CHOOSE_SKILL_CATEGORY: (state, action) => ( { ...state, category: { ...state.category, skills_categories: [  ...action.payload ] } } ),
    CHOOSE_PROMOTION: (state, action) => ( { ...state, promotion: { ...action.payload } } ),
    CHANGE_STR_INP_FOR_POSTJOB: (state, action) => ( { ...state, ...action.payload } ),
    CHANGE_CHECKBOX_FOR_POSTJOB: (state, action) => ( { ...state, ...action.payload } ),
    CLEAR_REQUEST_DATA: (state, action) => ( { category: {  }, title: '', commitment: '', contract_general_notes: '', description: '', hourly_price: null, level: '', payment: '',
    period: '1', period_type: 'week', price: '', promotion: {  }, promotion_description: '', promotion_title: '', skill_tags: [], time_type: '',
    hourly_price: null } )
  }
  ,
  { category: {  }, title: '', commitment: '', contract_general_notes: '', description: '', hourly_price: null, level: '', payment: '',
    period: '1', period_type: 'week', price: '', promotion: {  }, promotion_description: 'Any skill test defined by the client', promotion_title: '', skill_tags: [], time_type: '',
    hourly_price: '' }
)

export default requestForPostJob;