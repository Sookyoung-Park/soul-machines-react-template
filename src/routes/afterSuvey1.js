import React from 'react';
import { Model } from 'survey-core';
import ReactDOM from 'react-dom';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
// import './index.css';

const json = {
  elements: [
    {
      type: 'ranking',
      name: 'smartphone-features',
      title: 'Please rank the following smartphone features from the most important to the least',
      isRequired: true,
      choices: [
        'Long battery life',
        'Plenty of storage capacity',
        'High-quality camera',
        'Powerful CPU',
        'Large screen size',
        'High durability',
        'Low price',
      ],
    },
  ],
  showQuestionNumbers: false,
};
function SurveyComponent() {
  const survey = new Survey.Model(json);
  survey.onComplete.add((sender, options) => {
    console.log(options, 'for eslint');
    console.log(JSON.stringify(sender.data, null, 3));
  });
  return (<SurveyReact.Survey model={survey} />);
}

const root = ReactDOM.createRoot(document.getElementById('surveyElement'));
root.render(<SurveyComponent />);
