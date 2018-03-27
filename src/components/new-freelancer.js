import React from 'react';

import { FANCY_INPUT_BOXES, NEW_FREELANCER_SELF_DESCRIPTION_LIMIT } from '../utils/constants';
import { updateByPropertyName } from '../utils/funcs';
import WithEffectInput from './with-effect-input';
import SubmitInput from './submit-input';

const INIT_STATE = {
  name: '',
  github_link: '',
  linkedin_link: '',
  resume_link: '',
  self_description: '',
  known_technologies: '',
  error: null,
};

export default class NewFreelancerEntry extends React.Component {
  state = { ...INIT_STATE };

  render() {
    const { error, name, self_description, known_technologies } = this.state;
    const { submit_post_lifecycle } = this.props;
    return (
      <div className={'NewFreelancerFormContainer'}>
        <form
          onSubmit={submit_post_lifecycle.bind(
            null,
            this.state,
            after_form_cleanup => {
              this.setState(() => ({ ...INIT_STATE }), after_form_cleanup);
            },
            error => {
              this.setState(updateByPropertyName('error', error));
            }
          )}>
          <fieldset>
            <legend
              className={
                error
                  ? 'NewFreelancerFormContainer__GuidingLegend--Error'
                  : 'NewFreelancerFormContainer__GuidingLegend--Success'
              }>
              {error ? error.message : 'Let employers find you'}
            </legend>
            <div className={'FreelancerTable__FreelancerColumnDescription'}>
              <WithEffectInput
                box_name={FANCY_INPUT_BOXES.NAME}
                query_field={() => this.state.name}
                on_change={event => this.setState(updateByPropertyName('name', event.target.value))}
                label={'Your name'}
              />
              <WithEffectInput
                box_name={FANCY_INPUT_BOXES.GITHUB}
                query_field={() => this.state.github_link}
                on_change={event =>
                  this.setState(updateByPropertyName('github_link', event.target.value))
                }
                label={'Github'}
                input_type={'url'}
              />
              <WithEffectInput
                box_name={FANCY_INPUT_BOXES.LINKEDIN}
                query_field={() => this.state.linkedin_link}
                on_change={event =>
                  this.setState(updateByPropertyName('linkedin_link', event.target.value))
                }
                label={'Linkedin'}
                input_type={'url'}
              />
              <WithEffectInput
                box_name={FANCY_INPUT_BOXES.RESUME_OR_PERSONAL}
                query_field={() => this.state.resume_link}
                on_change={event =>
                  this.setState(updateByPropertyName('resume_link', event.target.value))
                }
                label={'Resume/Personal site'}
                input_type={'url'}
              />
              <WithEffectInput
                box_name={FANCY_INPUT_BOXES.KNOWN_TECHS}
                query_field={() => this.state.known_technologies}
                on_change={event =>
                  this.setState(updateByPropertyName('known_technologies', event.target.value))
                }
                label={'Known Technologies, comma-separated'}
              />
              <textarea
                onChange={event =>
                  this.setState(updateByPropertyName('self_description', event.target.value))
                }
                className={'TextSubmissionArea FullWidth'}
                maxLength={NEW_FREELANCER_SELF_DESCRIPTION_LIMIT}
                rows={7}
                placeholder={`Describe yourself for employers...(${NEW_FREELANCER_SELF_DESCRIPTION_LIMIT} char max)`}
                value={this.state.self_description}
              />
              <SubmitInput className={'NewJobPosting__SubmitButton'} value={'Get hired'} />
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}
