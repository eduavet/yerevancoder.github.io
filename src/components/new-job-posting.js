import React from 'react';

import { updateByPropertyName, is_number } from '../utils/funcs';
import WithEffectInput from './with-effect-input';
import SubmitInput from './submit-input';
import {
  JOB_POSTING_DESCRIPTION_LIMIT,
  SUMMARY_LIMIT,
  FANCY_INPUT_BOXES,
  SPACER_30_H,
  SPACER_10_H,
} from '../utils/constants';

const INIT_STATE = {
  job_location: '',
  payment_currency: 'dram',
  salary_from: '',
  salary_to: '',
  post_author: '',
  job_description: '',
  short_job_description: '',
  contact_info: '',
  error: null,
};

export default class NewJobPosting extends React.Component {
  state = { ...INIT_STATE };

  submit_new_job_posting = e => {
    e.preventDefault();
    const { submit_new_hiring_post, new_tech_job_post_did_finish } = this.props;
    let missing_field = null;
    if (true) {
      const { error, ...useful_data } = this.state;
      useful_data.short_job_description = useful_data.short_job_description.slice(0, SUMMARY_LIMIT);
      useful_data.job_description = useful_data.job_description.slice(
        0,
        JOB_POSTING_DESCRIPTION_LIMIT
      );
      const now = new Date();
      for (const k of Object.keys(useful_data)) useful_data[k] = useful_data[k].trim();
      submit_new_hiring_post({ ...useful_data, creation_time: now.getTime() })
        .then(() => this.setState(() => ({ ...INIT_STATE })))
        .then(new_tech_job_post_did_finish)
        .catch(error => this.setState(updateByPropertyName('error', error)));
    } else {
      this.setState(() => ({ error: new Error(`Something incorrect with ${missing_field}`) }));
    }
  };

  is_invalid = (cb = null) => {
    const { salary_from, salary_to, error, ...rest } = this.state;
    const validated =
      is_number(salary_from) &&
      is_number(salary_to) &&
      +salary_from <= +salary_to &&
      Object.keys(rest)
        .map(k => {
          const is_missing = rest[k] !== '';
          if (is_missing && cb) cb(k);
          return is_missing;
        })
        .reduce((accumulator, currentValue) => accumulator && currentValue);
    return validated;
  };

  render() {
    const { error, short_job_description, job_description } = this.state;
    const s_j_d_len = short_job_description.length;
    const f_j_d_len = job_description.length;
    return (
      <div className={'NewFreelancerFormContainer'}>
        <form onSubmit={this.submit_new_job_posting}>
          <fieldset>
            <legend
              className={
                error
                  ? 'NewFreelancerFormContainer__GuidingLegend--Error'
                  : 'NewFreelancerFormContainer__GuidingLegend--Success'
              }>
              {error ? error.message : 'Post a new tech job'}
            </legend>
            <div className={'FreelancerTable__FreelancerColumnDescription'}>
              <WithEffectInput
                box_name={FANCY_INPUT_BOXES.NEW_TECH_JOB_LOCATION}
                input_type={'text'}
                query_field={() => this.state.job_location}
                on_change={event =>
                  this.setState(updateByPropertyName('job_location', event.target.value))
                }
                label={'Location'}
              />
              <WithEffectInput
                box_name={FANCY_INPUT_BOXES.NEW_TECH_JOB_SALARY_FROM}
                query_field={() => this.state.salary_from}
                input_type={'text'}
                on_change={event =>
                  this.setState(updateByPropertyName('salary_from', event.target.value))
                }
                label={'Salary from'}
              />
              <WithEffectInput
                box_name={FANCY_INPUT_BOXES.NEW_TECH_JOB_SALARY_TO}
                input_type={'text'}
                query_field={() => this.state.salary_to}
                on_change={event =>
                  this.setState(updateByPropertyName('salary_to', event.target.value))
                }
                label={'Salary to'}
              />
              <WithEffectInput
                box_name={FANCY_INPUT_BOXES.NEW_TECH_JOB_LOCATION}
                input_type={'text'}
                query_field={() => this.state.payment_currency}
                on_change={event =>
                  this.setState(updateByPropertyName('payment_currency', event.target.value))
                }
                label={'Currency Type'}
              />
              <WithEffectInput
                box_name={FANCY_INPUT_BOXES.NEW_TECH_JOB_POSTER_NAME}
                input_type={'text'}
                query_field={() => this.state.post_author}
                on_change={event =>
                  this.setState(updateByPropertyName('post_author', event.target.value))
                }
                label={'Poster Name'}
              />
              <WithEffectInput
                box_name={FANCY_INPUT_BOXES.NEW_TECH_JOB_CONTACT_INFO}
                on_change={event =>
                  this.setState(updateByPropertyName('contact_info', event.target.value))
                }
                query_field={() => this.state.contact_info}
                label={'Contact Information'}
                input_type={'text'}
              />
              {SPACER_30_H}
              <div className={'PlainFlexColumn PlainFlexCentered FullWidth'}>
                <label className={'NewJobPosting__JobDescription'}>
                  Short Job Description ({SUMMARY_LIMIT} chars, {SUMMARY_LIMIT - s_j_d_len} chars
                  left)
                </label>
                {SPACER_10_H}
                <div className={'TextSubmissionWrapper'}>
                  <textarea
                    className={
                      'TextSubmissionArea WithTextSubmissionBackground OneHundredMinusFifteen'
                    }
                    maxLength={SUMMARY_LIMIT}
                    rows={4}
                    autoComplete={'off'}
                    onChange={event =>
                      this.setState(
                        updateByPropertyName('short_job_description', event.target.value)
                      )
                    }
                    value={this.state.short_job_description}
                    placeholder={'This will be the single line description on the jobs board'}
                  />
                </div>
              </div>
              {SPACER_30_H}
              <div className={'PlainFlexColumn PlainFlexCentered FullWidth'}>
                <label className={'NewJobPosting__JobDescription'}>
                  Full Job Description ({JOB_POSTING_DESCRIPTION_LIMIT} chars,{' '}
                  {JOB_POSTING_DESCRIPTION_LIMIT - f_j_d_len} chars left)
                </label>
                {SPACER_10_H}
                <div className={'TextSubmissionWrapper'}>
                  <textarea
                    className={'TextSubmissionArea OneHundredMinusFifteen'}
                    maxLength={JOB_POSTING_DESCRIPTION_LIMIT}
                    role={'textbox'}
                    autoComplete={'off'}
                    rows={6}
                    onChange={event =>
                      this.setState(updateByPropertyName('job_description', event.target.value))
                    }
                    value={this.state.job_description}
                    placeholder={'The full job description, please phrase this carefully'}
                  />
                </div>
              </div>
              {SPACER_30_H}
              <SubmitInput className={'NewJobPosting__SubmitButton'} value={'Submit New Job'} />
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}
