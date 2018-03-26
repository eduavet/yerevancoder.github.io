import React from 'react';
import color from 'color';

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

export const JOB_POSTING_DESCRIPTION_LIMIT = 1000;

export const NEW_FREELANCER_SELF_DESCRIPTION_LIMIT = 1500;

export const SPACER_30_H = <div style={{ height: '30px', width: '100%' }} />;

export const SPACER_10_H = <div style={{ height: '10px', width: '100%' }} />;

export const SPACER_20_W = <div style={{ width: '20px', height: '100%' }} />;

export const MODAL_TRANSITION = 500;

export const SESSION_USER = 'yerevan-coder-authed-user';

const SIDEBAR_FIXED_WIDTH = 250;

const BUSINESS_CONTENT_PADDING = 30;

const MATERIAL_BLUE = `#37425D`;

const MATERIAL_BEIGE = `#FAF5F1`;

const MATERIAL_GREY = `#C5C9CF`;

const MATERIAL_BLUE_LIGHT_FADE = color(MATERIAL_BLUE)
  .fade(0.35)
  .hsl()
  .string();

const MATERIAL_BLUE_HEAVY_FADE = color(MATERIAL_BLUE)
  .fade(0.6)
  .hsl()
  .string();

const MATERIAL_GREY_HEAVY_FADE = color(MATERIAL_GREY)
  .fade(0.6)
  .hsl()
  .string();

const _MATERIAL_GREY_HEAVY_FADE_ = color(MATERIAL_GREY)
  .fade(0.8)
  .hsl()
  .string();

const FADE_WHITE_BUTTON = color('white')
  .darken(0.1)
  .hsl()
  .string();

const FADE_WHITE_FORM = color('white')
  .darken(0.5)
  .hsl()
  .string();

const GLOBAL_CSS = `
body {
  background-color: ${MATERIAL_BEIGE};
}

form { margin: 0; }

textarea { resize:none; }

.AuthingErrorMessage {
  font-family:Montserrat, sans-serif;
  text-align:center;
  font-weight: 700;
  font-size: 14px;
  color:red;
  margin:0;
  text-align:center;
  padding-left: ${BUSINESS_CONTENT_PADDING / 2}px;
  padding-right: ${BUSINESS_CONTENT_PADDING / 2}px;
}

.AuthingWelcomeMessage {
  text-align:center;
  padding-left: ${BUSINESS_CONTENT_PADDING}px;
  padding-right: ${BUSINESS_CONTENT_PADDING}px;
  font-weight:700;
  font-size:22px;
  padding-bottom:15px;
}

.HiringSubmissions {
  overflow-y: scroll;
  height:100%;
}

.HiringSubmissions > * {
  margin:0;
}

.SubmitInput__Wrapper {
  width:100%;
}

.SubmitInput {
  background-color:${MATERIAL_BLUE};
  width:100%;
  padding:7px 14px;
  box-shadow:none;
  border:none;
  color: ${FADE_WHITE_BUTTON};
  border-radius:5px;
  cursor:pointer;
}

.SubmitInput:active {
  background-color:${MATERIAL_BLUE_LIGHT_FADE};
  transition: all 0.1s ease-in-out
}

.BlogIndex__TopCredentialBar {
  display:flex;
  justify-content:flex-end;
}

.FreelanceProfileSubmission {
  flex:1;
  justify-content:space-around;
  display:flex;
  align-items:center;
  flex-direction:column;
}

.Profile__Container__LoadingSpinner {
  padding-left:20px;
  display:flex;
  align-items:center;
  justify-content:center;
  padding-right:20px;
}

.ModalContentWrapper {
  border-top-width: 7px;
  border-top-color: ${MATERIAL_BLUE_LIGHT_FADE};
  border-top-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: ${MATERIAL_BLUE_LIGHT_FADE};
  border-bottom-style: solid;
  display:flex;
  align-items:center;
  flex-direction:column;
  justify-content:center;
  padding:25px;
}

.ModalContainer__Form {
  width:100%;
  display:flex;
  flex:1;
  align-items:center;
  justify-content:center;
  margin:0;
}

.ReactModal__Content--after-open.Profile__Container.ProfileContainer__SpinningCentered {
  height:100%;
  justify-content:center;
  display:flex;
  align-items:center;
}

.FreelanceProfileSubmission__PostingBanner {
  font-size:25px;
  text-align:center;
  text-shadow: 2px 2px 3px gold;
  color:${MATERIAL_BLUE};
  font-weight:600;
}

.FreelanceProfileSubmission__MonoText {
  background-color: #ffffff;
  border-width: 1px;
  border-style: solid;
  border-color: #666666;
  padding:5px;
  font-size:14px;
  margin:0;
  font-family: Mono;
  display:flex;
  justify-content:center;
  width:100%;
}

.FreelanceProfileSubmission__SelfDescription {
  margin:0;
  height:150px;
  width:100%;
  padding:5px;
}

.FreelanceProfileSubmission__MonoText > span {
}

/* https://codepen.io/ayoungh/pen/ABJKu */
.TextSubmissionArea {
  -moz-border-bottom-colors: none;
  -moz-border-left-colors: none;
  -moz-border-right-colors: none;
  -moz-border-top-colors: none;
  border-color: -moz-use-text-color #FFFFFF #FFFFFF -moz-use-text-color;
  border-image: none;
  border-radius: 6px 6px 6px 6px;
  border-style: none solid solid none;
  border-width: medium 1px 1px medium;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12) inset;
  color: #555555;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 1em;
  line-height: 1.4em;
  padding: 5px 8px;
  transition: background-color 0.2s ease 0s;
}

.TextSubmissionArea:focus {
  background: none repeat scroll 0 0 #FFFFFF;
  outline-width: 0;
}

.WithTextSubmissionBackground {
  background: none repeat scroll 0 0 rgba(0, 0, 0, 0.07);
}

.PlainFlexColumn {
  display:flex;
  flex-direction:column;
}

.OnePaddingLeft {
  padding-left:1px;
}

.FullHeight {
  height:100%;
}

.FullWidth {
  width:100%;
}

.PlainFlexCentered {
  align-items: center;
  justify-content: center;
}

.PlainFlexRow {
  display:flex;
  flex-direction:row;
}

.FlexSpaceBetween {
  justify-content:space-between;
}

.FlexSpaceAround {
  justify-content:space-around;
}

.FormTopEntry {
  background-color:${_MATERIAL_GREY_HEAVY_FADE_};
  padding:14px 28px;
  border-radius: 5px;
}

.FormTopEntry > input[type="checkbox"] {
  align-self:flex-start;
}

.RememberMeRow {
  font-size:12px;
  padding:7px 14px;
  align-items:flex-end;
}

RememberMeRow__RememberMe--Checked {
  color:black;
}

.RememberMeRow__RememberMe--Unchecked{
  color:${FADE_WHITE_FORM};
}

.RememberMeRow__ForgotPassword {
  color:${color('red')
    .lighten(0.25)
    .hsl()
    .string()};
  cursor:pointer;
}

.PlainFlexRow.FlexSpaceBetween {
  justify-content:space-between;
  width:100%;
}

.FreelancerTable__FreelancerName {
  font-weight:700;
  font-family: Montserrat, sans-serif;
  font-size:36px;
}

.FreelancerTable__FlexRow {
  display:flex;
  flex:1;
  justify-content:space-between;
  width: 100%;
  padding:10px;
}

.FreelancerTable__FlexColumn {
  display:flex;
  width:100%;
  font-family: Montserrat, sans-serif;
  flex-direction:column;
}

.FreelancerTable__FreelancerColumnDescription > textarea {
  width:100%;
  font-family: Merriweather;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.NewFreelancerFormContainer__SubmitButton {
  width:100%;
  padding-top:7px;
  padding-bottom:7px;
  color:${color('white')
    .darken(0.75)
    .hsl()
    .string()};
  background-color:${color(MATERIAL_GREY)
    .fade(0.4)
    .hsl()
    .string()};
  justify-content:center;
}

form > fieldset {
  border:none;
  display:flex;
  flex:1;
  height:100%;
  flex-direction:column;
  align-items:space-between;
}

.FreelancerTable__FreelancerColumnDescription {
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  width: 100%;
  padding:25px;
}

.InputEffect:nth-child(n) {
  margin-top:2rem;
}

.InputEffect:nth-child(1) {
  margin-top:0;
}

.loginActionRow__CustomInputField--UserSignedOut {
  background-color:red;
}

.loginActionRow__CustomInputField--UserSignedIn,
.loginActionRow__CustomInputField--UserSignedOut {
  background-color:transparent;
  box-shadow:none !important;
}

.loginActionRow__RowContainer > input {
  padding:7px 14px;
}

.loginActionRow__RowContainer {
  margin:0;
  display:inline-flex;
  padding:10px;
}

.loginActionRow__RowContainer > input:nth-child(2) {
  margin-left:1rem;
}

.loginActionRow__RowContainer > input:nth-child(3) {
  margin-left:1rem;
}

.AvailableForWorkContainer__NavTopRow {
  padding-top:${BUSINESS_CONTENT_PADDING / 2}px;
  padding-bottom:${BUSINESS_CONTENT_PADDING / 2}px;
}

.loginActionRow__RowContainer > input,.NewFreelancerFormContainer__SubmitButton {
  position: relative;
  font-family: Montserrat, sans-serif;
  display: flex;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  outline: none;
  font-size: 14px;
  border-bottom: 4px solid rgba(0, 0, 0, 0.33);
  transition: box-shadow 0.15s ease-in-out;
}

.loginActionRow__RowContainer > input:active,
.NewFreelancerFormContainer__SubmitButton:active {
  border-bottom: 0.25px solid rgba(0, 0, 0, 0.33);
  top: 0.5rem;
}

.loginActionRow__RowContainer > input:active:before,
.NewFreelancerFormContainer__SubmitButton:active:before {
  position: absolute;
  top: 0;
  left: 0;
  content: '';
  height: 100%;
  width: 100%;
}

.loginActionRow__SignUpOrLoggedIn--UserSignedIn,
.loginActionRow__SignUpOrLoggedIn--UserSignedOut {
  color:white;
  background-color:${MATERIAL_BLUE_LIGHT_FADE};
}

.loginActionRow__SignUpOrLoggedIn--UserSignedIn:active,
.loginActionRow__SignUpOrLoggedIn--UserSignedOut:active {
  color:${color('white')
    .darken(0.7)
    .hsl()
    .string()};
  background-color:${color(MATERIAL_BLUE)
    .fade(0.2)
    .hsl()
    .string()};
}

.loginActionRow__SigninOrSignOut--UserSignedIn,
.loginActionRow__SigninOrSignOut--UserSignedOut {
  color:${color('white')
    .darken(0.75)
    .hsl()
    .string()};
  background-color:${color(MATERIAL_GREY)
    .fade(0.4)
    .hsl()
    .string()};
}

.loginActionRow__SigninOrSignOut--UserSignedIn:active,
.loginActionRow__SigninOrSignOut--UserSignedOut:active {
  color:${color('white')
    .darken(0.05)
    .hsl()
    .string()};
  background-color:${color(MATERIAL_GREY)
    .darken(0.2)
    .hsl()
    .string()};
}

.AvailableForWorkContainer > * {
  margin:0;
}

.AvailableForWorkContainer__PageBanner {
  margin:0;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:20px;
}

.AvailableForWorkContainer > *:nth-child(1) {
  display:flex;
  justify-content:space-between;
}

.JobPostingCard > * {
  margin:0;
}

.BlogEntryCard > * {
  margin:0;
  font-family: Montserrat, sans-serif;
}

.BlogEntryCard__Byline, .BlogEntryCard__Excerpt {
  font-family:Merriweather;
}

.BlogEntryCard__Excerpt {
  font-weight: 500;
}

.FreelancerTable__Freelancer {
  display:flex;
  justify-content:center;
  padding:10px;
  border-radius:5px;
  margin-bottom:1rem;
}

.BlogTable {
  display:flex;
  flex-direction:column;
  align-items:center;
  width:100%;
}

.BlogEntryCard:nth-child(2n + 1),
.FreelancerTable__Freelancer:nth-child(2n + 1) {
  background-color:${MATERIAL_GREY_HEAVY_FADE};
}

.BlogEntryCard:nth-child(2n),
.FreelancerTable__Freelancer:nth-child(2n) {
  background-color:${MATERIAL_BLUE_HEAVY_FADE};
}

/* http://tobiasahlin.com/blog/how-to-animate-box-shadow/ */
.BlogEntryCard {
  margin:15px 0px;
  padding:15px;
  position: relative;
  display: inline-block;
  width: 90%;
  height: 90%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.BlogEntryCard::after {
  content: "";
  border-radius: 5px;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  opacity: 0;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.BlogEntryCard:hover {
  -webkit-transform: scale(1.05, 1.05);
  transform: scale(1.05, 1.05);
}

.BlogEntryCard:hover::after {
  opacity: 1;
}

.JobPostingCard {
  box-shadow: 3px 3px 5px 6px #ccc;
  border-radius: 5px;
  margin-bottom:20px;
  padding:5px;
}

.InformationBar {
  display:flex;
  flex-direction:column;
}

.InformationBar > * {
  font-family: Montserrat, sans-serif;
  margin:0;
  color:${MATERIAL_BLUE};
  font-weight:600;
}

.Headroom__Container {
  padding-left: 1%;
  padding-right: 1%;
  padding-top: 1%;
  transition: all .1s ease-in-out;
}

.Headroom__Container--ShowingHeader {
  background-color: hsla(247.5, 50%, 3.1%, 0.9);
  display: flex;
  color: white;
  flex-direction: column;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 1rem;
}

.ApplicationContainer__Container {
  display:flex;
  padding:0;
}

.Profile__Container {

}

.Profile__Container > * {
  margin:0;
  font-family: Montserrat, sans-serif;
}

.Profile__User {
  font-size:14px;
  background-color:hsl(220, 12%, 95%);
  padding:10px;
  display:flex;
}

.Profile__PostingsTable {
  padding-top:10px;
  padding-left:${BUSINESS_CONTENT_PADDING / 2}px;
  padding-right:${BUSINESS_CONTENT_PADDING / 2}px;
  display:flex;
  flex-direction:column;
  background-color: hsl(220, 12%, 95%);
  overflow-y: scroll;
}

.HiringSubmissions > h4 {
  text-align:center;
  padding: 7px;
}

.Profile__DeletePosting {
  cursor:pointer;
}

.Profile__PostingRecord {
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:2rem 15px;
}

.Profile__PostingRecord:nth-child(2n) {
  background-color:${MATERIAL_BLUE_LIGHT_FADE};
}

legend {
  margin-bottom:0;
  font-family: Montserrat, sans-serif;
  padding-left:5px;
  padding-right:5px;
  font-style:italic;
  font-weight:700;
}

.NewFreelancerFormContainer__GuidingLegend--Error {
  color:red;
}

.NewFreelancerFormContainer__GuidingLegend--Success {
  color:${MATERIAL_BLUE};
  text-shadow: 2px 2px 3px gold;
}

.loginActionRow__GetHiredText {
  margin-bottom:0;
  font-family: Montserrat, sans-serif;
}

.NewJobPosting__JobDescription {
  color:${MATERIAL_BLUE};
  font-weight:600;
  font-family: Montserrat, sans-serif;
}

.Profile__CreationTime:nth-child(2) {
  text-align:right;
}
`;

const MODAL_CSS = `
.ReactModal__Content {
  opacity: 0;
}

.ReactModal__Content--after-open {
  opacity: 1;
  transition: opacity ${MODAL_TRANSITION}ms;
}

.ReactModal__Content--before-close {
  opacity: 0;
}`;

const MEDIA_QUERIES_CSS = `
.loginActionRow__Container, .loginActionRow__AuthingButtons {
  display:flex;
}

@media (min-width: 650px) and (orientation: landscape) {
  .sk-spinner {
    margin:200px;
  }
  .NewsPageContainer {
    height:100vh;
  }
  .NewsPageContainer__FixedSubmitFooter {
    background-color:blue;
    position: fixed;
    bottom:0;
    width:calc(100% - ${SIDEBAR_FIXED_WIDTH}px - ${BUSINESS_CONTENT_PADDING * 2}px);
  }
  .InformationBar__SiteBannerName {
    font-size:30px;
  }
  .InformationBar > * {
    text-shadow: 2px 2px 3px gold;
  }
  .InformationBar {
    position: fixed;
    justify-content:space-around;
    z-index:99;
    left:0;
    bottom:0;
    top:0;
    background: linear-gradient(
      to bottom,
      ${MATERIAL_GREY},
      ${MATERIAL_GREY} 50%,
      ${MATERIAL_BEIGE} 50%,
      ${MATERIAL_BEIGE}
    );
    background-size: 100% 20px;
    width:${SIDEBAR_FIXED_WIDTH}px;
    padding:10px;
  }

  .ApplicationContainer__MainContent {
    padding-left:${SIDEBAR_FIXED_WIDTH}px;
    width:100%;
  }

  .ApplicationContainer__BusinessContent {
    padding-left:${BUSINESS_CONTENT_PADDING}px;
    padding-right:${BUSINESS_CONTENT_PADDING}px;
  }
  .Profile__User {
    justify-content:space-between;
  }
  legend {
    font-size:32px;
  }
  .loginActionRow__GetHiredText {
    font-size:24px;
  }
  .loginActionRow__Container, .loginActionRow__AuthingButtons {
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
  }
  .loginActionRow__RowContainer {
    justify-content:center;
  }
}

@media (max-width: 1200px) {
  .sk-spinner {
    margin:150px
  }
  .FreelancerTable__FlexRow {
    flex-direction:column;
    padding-left:20px;
    padding-right:20px;
  }
  .AvailableForWorkContainer__NavTopRow {
    flex-direction:column;
    text-align:center;
  }
  .FreelanceProfileSubmission__MonoText {
    font-size:18px;
  }
}

@media (max-width: 649px) {
  .FreelancerTable__FreelancerColumnDescription {
    font-size:12px;
  }
  .FreelancerTable__FreelancerName {
    font-size:24px;
  }
  .loginActionRow__RowContainer > input:nth-child(2) {
    margin:0;
  }
  .loginActionRow__RowContainer > input:nth-child(3) {
    margin:0;
  }
  .sk-spinner {
    margin:75px;
  }
  .Profile__User {
    flex-direction:column;
    align-items:center;
    justify-content:center;
    align-content:center;
    text-align:center;
  }
  .Profile__CreationTime {
    text-align:center !important;
  }
  .FreelanceProfileSubmission__MonoText {
    font-size:12px;
  }

  .loginActionRow__RowContainer {
    padding:15px;
    display:flex;
    flex-direction:column;
    justify-content:center;
  }

  .FreelancerTable__FlexRow {
    flex-direction:column;
    padding-left:20px;
    padding-right:20px;
  }

  .AvailableForWorkContainer > *:nth-child(1) {
    flex-direction:column;
    justify-content:flex-start;
  }

  .InformationBar {
    border-bottom-width:1px;
    border-bottom-style:inset;
    border-bottom-color: black;
    background-color: ${MATERIAL_BEIGE};
    justify-content:space-between;
    margin:0;
  }

  .InformationBar > *:not(h3) {
    font-size:11px;
    padding-bottom:10px;
  }

  .InformationBar__SiteBannerName {
    font-weight:700;
    padding-bottom:10px;
  }
  .Headroom__Container--ShowingHeader > * {
    font-size:3px;
  }

  .ApplicationContainer__Container {
    flex-direction:column;
    padding:4px;
  }

  .Profile__User > div {
    flex-direction:column;
    align-items:center;
  }

  legend {
    font-size:20px;
  }
  .ReactModal__Content--after-open {

  }
  .loginActionRow__GetHiredText {
    font-size:39px;
  }
  .loginActionRow__Container, .loginActionRow__AuthingButtons {
    flex-direction:column;
    text-align:center;
  }
  input[type=button] {
    margin-top:10px;
  }
}
`;

const LARGER_CHECKBOX_CSS = `

@supports (zoom:2) {
	input[type="radio"],  input[type=checkbox]{
	  zoom: 1.3;
	}
}

@supports not (zoom:2) {
	input[type="radio"],  input[type=checkbox]{
		transform: scale(1.3);
	}
}
`;

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

.InputEffect > input[type="text"],input[type="email"], input[type="password"]  {
  font-family: Merriweather, sans-serif;
  color: #333;
  width: 100%;
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

export const global_styles = (
  <style>{`${GLOBAL_CSS}${MODAL_CSS}${LARGER_CHECKBOX_CSS}${MEDIA_QUERIES_CSS}${FANCY_INPUT_BOX}`}</style>
);
