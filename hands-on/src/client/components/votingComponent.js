import React from 'react';
import ChoiceBar from './ChoiceBar';

export default class votingComponent extends React.component {
    render() {
        const { vote } = this.props;
        return (
            <div className="Row VotingRow Spacer">
                <div ClassName="Head">
                    <h1 className="Title">{vote.title}
                        <div className="Badge"> {vote.totalVotes} Votes</div>
                    </h1>
                    <div className="Description Emphasis">
                        {vote.description}
                    </div>
                    <div>
                        {vote.choices.map(c => <ChoiceBar key={c.id} {...c}/>)}
                    </div>
                </div>
            </div>
        );
    }
}
VotingComponent.propTypes = {
    vote: React.PropTypes.object.isRequired
};  