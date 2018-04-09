import React from 'react';
import color from 'color';

let __DEV__ = null;
if (process.env.__DEV__ === 'true') __DEV__ = true;
else if (process.env.__DEV__ === 'false') __DEV__ = false;

export { __DEV__ };

export const EMPTY_DIV = <div />;

export const modal_s = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    padding: 0,
    transform: 'translate(-50%, -50%)',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'none',
  },
};

export const ROUTES = {
  JOBS_TABLE: '/hiring-board',
  NEW_JOB_POSTING: '/new-job-posting',
  NEWS: '/news',
  AVAILABLE_FOR_WORK: '/available-for-work',
};

export const PAGE_CONTENT = {
  HIRING_TABLE: 'hiring-table',
  NEW_HIRING_POST: 'new-hiring-post',
  FREELANCER_TABLE: 'freelancer-table',
  NEW_FREELANCER: 'new-freelancer',
  NEWS_LISTINGS: 'all-news-listing',
};

export const MODAL_CONTENT = {
  PROFILE_VIEW: 'profile-view',
  SIGNIN_VIEW: 'signin-view',
  SIGNUP_VIEW: 'signup-view',
};

export const MODAL_PROFILE_CONTENT = {
  HIRING_BOARD_LISTINGS: 'hiring-board-listings',
  FREELANCER_POSTING: 'freelancer-posting',
};

export const LOADING_STATE = {
  NOT_STARTED_YET: 'not-started-yet',
  DID_LOAD: 'did-load',
  CURRENTLY_LOADING: 'currently-loading',
};

export const SUMMARY_LIMIT = 120;

export const JOB_POSTING_DESCRIPTION_LIMIT = 3000;

export const NEW_FREELANCER_SELF_DESCRIPTION_LIMIT = 1500;

export const SPACER_30_H = <div style={{ height: '30px', width: '100%' }} />;

export const SPACER_10_H = <div style={{ height: '10px', width: '100%' }} />;

export const SPACER_20_W = <div style={{ width: '20px', height: '100%' }} />;

export const MODAL_TRANSITION = 500;

export const FANCY_INPUT_BOXES = {
  // Submission for freelance position
  NAME: 'name-box',
  GITHUB: 'github-box',
  LINKEDIN: 'linkedin-box',
  RESUME_OR_PERSONAL: 'resume-or-personal-box',
  KNOWN_TECHS: 'known-techs-box',
  // Submission for signin
  SIGNIN_EMAIL: 'signin-email',
  SIGNIN_PASSWORD: 'signin-password',
  // Submission for signup
  SIGNUP_USERNAME: 'signup-username',
  SIGNUP_EMAIL: 'signup-email',
  SIGNUP_PASSWORD_ONE: 'signup-password-one',
  SIGNUP_PASSWORD_TWO: 'signup-password-two',
  // Submission for new tech job
  NEW_TECH_JOB_LOCATION: 'new-tech-job-location',
  NEW_TECH_JOB_CURRENCY_TYPE: 'new-tech-job-currency-type',
  NEW_TECH_JOB_POSTER_NAME: 'new-tech-job-poster-name',
  NEW_TECH_JOB_CONTACT_INFO: 'new-tech-job-contact-info',
  NEW_TECH_JOB_SALARY_FROM: 'new-tech-job-salary-from',
  NEW_TECH_JOB_SALARY_TO: 'new-tech-job-salary-to',
};

// Keep these in sync with styles.css's variables in :root
const MATERIAL_BLUE = `#37425D`;

const MATERIAL_GREY = `#C5C9CF`;

const FADE_WHITE_FORM = color('white')
  .darken(0.5)
  .hsl()
  .string();

const FANCY_INPUT_THEME_COLOR = color(MATERIAL_BLUE)
  .fade(0.15)
  .hsl()
  .string();

// https://codepen.io/Takumari85/pen/RaYwpJ
const create_effects_css = box_name => `
.effect-${box_name}{
  border: 1px solid ${MATERIAL_GREY};
  padding: 7px 14px;
  transition: 0.4s;
  width:100%;
  background: transparent;
}

.effect-${box_name} ~ .focus-border:before,
.effect-${box_name} ~ .focus-border:after{
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 0; height: 2px;
  background-color: ${FANCY_INPUT_THEME_COLOR};
  transition: 0.3s;
}

.effect-${box_name} ~ .focus-border:after{
top: auto; bottom: 0;
left: auto; right: 0;}

.effect-${box_name} ~ .focus-border i:before,
.effect-${box_name} ~ .focus-border i:after{
  content: ""; position: absolute; top: 0;
  left: 0; width: 2px; height: 0;
  background-color: ${FANCY_INPUT_THEME_COLOR};
  transition: 0.4s;
}

.effect-${box_name} ~ .focus-border i:after{
left: auto; right: 0;
top: auto; bottom: 0;
}

.effect-${box_name}:focus ~ .focus-border:before,
.effect-${box_name}:focus ~ .focus-border:after,
.has-content.effect-${box_name} ~ .focus-border:before,
.has-content.effect-${box_name} ~ .focus-border:after{
  width: 100%; transition: 0.3s;
}

.effect-${box_name}:focus ~ .focus-border i:before,
.effect-${box_name}:focus ~ .focus-border i:after,
.has-content.effect-${box_name} ~ .focus-border i:before,
.has-content.effect-${box_name} ~ .focus-border i:after{
  height: 100%;
  transition: 0.4s;
}
.effect-${box_name} ~ label{
  position: absolute;
  left: 14px; width: 100%; top: 10px;
  color: ${FADE_WHITE_FORM};
  transition: 0.3s;
  z-index: -1;
  letter-spacing: 0.5px;
}

.effect-${box_name}:focus ~ label,
.has-content.effect-${box_name} ~ label {
  top: -18px;
  left: 0;
  font-size: 12px;
  color: ${FANCY_INPUT_THEME_COLOR};
  transition: 0.3s;
}

`;

const FANCY_INPUT_BOX = `
:focus{outline: none;}

/* necessary to give position: relative to parent. */
.InputEffect {
  position: relative;
  width:100%;
}

.InputEffect > input[type="text"],input[type="email"],input[type="password"]  {
  font-family: 'Titillium Web', sans-serif;
  color: #333;
  width: 100%;
  font-size:1.1rem;
  border-radius:5px;
  box-sizing:border-box;
  letter-spacing: 1px;
}

${create_effects_css(FANCY_INPUT_BOXES.NAME)}
${create_effects_css(FANCY_INPUT_BOXES.GITHUB)}
${create_effects_css(FANCY_INPUT_BOXES.LINKEDIN)}
${create_effects_css(FANCY_INPUT_BOXES.RESUME_OR_PERSONAL)}
${create_effects_css(FANCY_INPUT_BOXES.KNOWN_TECHS)}
${create_effects_css(FANCY_INPUT_BOXES.SIGNIN_EMAIL)}
${create_effects_css(FANCY_INPUT_BOXES.SIGNIN_PASSWORD)}

${create_effects_css(FANCY_INPUT_BOXES.SIGNUP_USERNAME)}
${create_effects_css(FANCY_INPUT_BOXES.SIGNUP_EMAIL)}
${create_effects_css(FANCY_INPUT_BOXES.SIGNUP_PASSWORD_ONE)}
${create_effects_css(FANCY_INPUT_BOXES.SIGNUP_PASSWORD_TWO)}

${create_effects_css(FANCY_INPUT_BOXES.NEW_TECH_JOB_LOCATION)}
${create_effects_css(FANCY_INPUT_BOXES.NEW_TECH_JOB_CURRENCY_TYPE)}
${create_effects_css(FANCY_INPUT_BOXES.NEW_TECH_JOB_POSTER_NAME)}
${create_effects_css(FANCY_INPUT_BOXES.NEW_TECH_JOB_CONTACT_INFO)}
${create_effects_css(FANCY_INPUT_BOXES.NEW_TECH_JOB_SALARY_FROM)}
${create_effects_css(FANCY_INPUT_BOXES.NEW_TECH_JOB_SALARY_TO)}
`;

export const global_styles = <style>{`${FANCY_INPUT_BOX}`}</style>;

export const DID_YOU_KNOW = (
  <span>
    Did you know you can see all your postings in your profile view? Click on your display name once
    signed in.
  </span>
);

export const EMAIL_REGEX = new RegExp('', 'ig');
