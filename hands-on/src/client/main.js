import React from 'react';
import ReactDOM from 'react-dom';
import ChoiceBar from './components/choicebar';

ReactDOM.render(
    <ChoiceBar title='JavaScript' count={123} percent= {37}/>,
    document.getElementById('voteAppMountPoint')
);