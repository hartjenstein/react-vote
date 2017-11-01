import React from 'react';
import ChoiceBar from './ChoiceBar';

export default class VotingComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        vote: props.vote
        }
    }
    registerChoice(c) {
        const { vote } = this.state;
        const newVote = {
            //Properties aus dem Vote Objekt kopieren
            ...vote,
            //ein neues Choices Array erzeugen, innerhalb des
            //Choices Arrays die übergebene Choice (c) kopieren
            // und um den count erhöhen
            choices:
             vote.choices.map
                (choice => choice.id !== c.id ? choice: 
                {...c, count: c.count + 1}
            )
        }; 
        this.setState({vote: newVote});
        
    }
    render() {
        const { vote } = this.state;
        const totalVotes = vote.choices.reduce((prev, curr) => prev + curr.count,0 );
        return (
            <div className="Row VotingRow Spacer">
                <div className="Head">
                    <h1 className="Title">{vote.title}
                        <div className="Badge"> {totalVotes} Votes</div>
                    </h1>
                    <div className="Description Emphasis">
                        {vote.description}
                    </div>
                    <div>
                        {vote.choices.map(choice => 
                            <ChoiceBar key={choice.id} percent={choice.count * (100 / totalVotes)} onClickHandler = {() => this.registerChoice(choice)} 
                            {...choice}/>)}
                    </div>
                </div>
            </div>
        );
    }
}
VotingComponent.propTypes = {
    vote: React.PropTypes.object.isRequired
};  