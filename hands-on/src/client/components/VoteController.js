import React from 'react';
import VoteList from './VoteList';
import VoteComposer from './VoteComposer';
import { fetchJson, sendJson } from '../backend/backend';
import { makeCanelable } from '../backend/cancelPromise';
/* const makeCancelable = (promise) => {
  let hasCanCancled_ = false;

  return {
    promise: new Promise((resolve, reject) => promise 
      .then(r => hasCancancled_ ? reject({isCancled: true}) : resolve(r))
  ),
  cancel(){
    hasCancled_ = true;
  },
};
};*/
export default class VoteController extends React.Component {
  constructor(props) {
    super();

    this.state = {
      allVotes: []
    };

    this.setCurrentVote = this.setCurrentVote.bind(this);
    this.registerVote = this.registerVote.bind(this);
    this.addVote = this.addVote.bind(this);
    this.activateVoteComposer = this.activateVoteComposer.bind(this);
    this.deactivateVoteComposer = this.deactivateVoteComposer.bind(this);
  }
 
  componentDidMount() {
    //abbrechbares Promise erzeugen und speichern
    this.fetchPromise = fetchJson('/api/votes').then(allVotes => {
      this.setState({
        allVotes
      });
    });
  }
  componentDidUnmout(){
    //Promise sofern vorhanden abrechen
    if(this.fetchPromise) {
      this.fetchPromise.cancel();
    }
  }
  setCurrentVote(vote) {
    const { composerActive } = this.state;
    this.setState({currentVoteId: vote && !composerActive ? vote.id : null});
  }

  // from VotingComponent
  registerVote(vote, choice) {
    sendJson('put', 
    `/api/votes/${vote.id}/choices/${choice.id}/vote`,{})
    .then(updateVote => {
      const newAllVotes = 
      this.state.allVotes.map
      (vote => vote.id === updateVote.id ? updateVote : vote);
      this.setState({allVotes: newAllVotes});
      this.setCurrentVote(updatedVote);
    })
  }
 // der server sendet die gespeicherte antwort zurück, die wir dann in den state schreiben
  addVote(newVote) {
    sendJson('post', '/api/votes', newVote)
    .then(receivedVote => {
      this.setState({
        allVotes: [...this.state.allVotes, receivedVote]
      })
    });
  }

  activateVoteComposer() {
    this.setState({
      currentVoteId:  null,
      composerActive: true
    });
  }

  deactivateVoteComposer() {
    this.setState({
      composerActive: false
    });
  }

  render() {
    const { allVotes, currentVoteId, composerActive } = this.state;

    return (
      <div>
        <VoteList allVotes={allVotes}
                  currentVoteId={currentVoteId}
                  onSelectVote={this.setCurrentVote}
                  onDismissVote={()=>{this.setCurrentVote(null)}}
                  onRegisterVote={this.registerVote}
        />
        <VoteComposer active={composerActive}
                      onDeactivate={this.deactivateVoteComposer}
                      onActivate={this.activateVoteComposer}
                      onSave={this.addVote}/>
      </div>
    );
  }
}

