import React from 'react';

function emptyChoice() {
    return {
        id: `choice_${Date.now()}`,
        count: 0,
        title: null
    };
}
function emptyVote() {
    return {
        id: `vote_${Date.now()}`,
        title: '',
        formCompleted: false,
        choices: [emptyChoice()]
    };
}
export default class VoteComposer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            vote: emptyVote()
        };

        this.activateIfNeeded = this.activateIfNeeded.bind(this);
        this.save = this.save.bind(this);
        this.close = this.close.bind(this);

    }
    close() {
        const { onDeactivate } = this.props;
        onDeactivate();
    }
    save() {
        const { onSave } = this.props;
        onSave();
        this.close()
    }
    activateIfNeeded() {
        const { onActivate, active } = this.props;
        if(!active) {
            onActivate();
        }
    }
    renderInactiveForm() {
        return(
            <div className="Row VotesRow Spacer"
            onClick={this.activateIfNeeded}>
            <h1> className="Title">
                <span className="Emphasis"> 
                    What do <b>you</b>want to know?
                </span>
            </h1>
            <p>Click here to leave your own question.</p>
            </div>

        );
    }
    renderActiveForm() {
        const { vote: { title, description, choices } } = this.state
        return (
            <div className="Row VoteComposer Spacer">
                <div className="Head">
                    <h1>
                        <input className="Title"
                                autoFocus
                                name="title"
                                value={title}
                                type="text"
                                onChange={this.onChange}
                                placeholder="What do yout want to know?"/>
                    </h1>
                    <input className="Description"
                            name="description"
                            type="text"
                            value={description}
                            onChange={this.onChange}
                            placeholder="Describe your question in one sentence"/>
                </div>
                <div className="Body">
                    <input className="Choice"
                            type="text"
                            key="Choice_1"
                            name="Choice_1"
                            placeholder="Choice #1"
                    />
                    <div className="ButtonBar">
                        <a className="Button" onClick={this.save}>Save</a>
                        <a className="Button" onClick={this.close}>Cancel</a>
                    </div>    
                </div>
            </div>
        )
        onChange(event) {
            //name und value proerty aus dem event der lokalen variablen ausweisen, über fieldName und fieldValue
            const { name: fieldName, value: fieldValue } = event.target;
            const { vote } = this.state;

            const { vote } = this.state;
            const { new vote } = {
                // bestehendes Objekt kopieren
                ...vote,
                [fieldName]: fieldValue // compute property - name des properties entspricht dem wert der in klammern angegebenen variablen.

            };
            this.setState({
                vote: newVote
            })
        }
        onChoiceChange(choiceIx, title) {
            const { vote } = this.state;
            const choices = vote.choices;
            const choice = choices[choiceIx];

            const newChoice = {
                ...choice,
                title
            };
            const newChoices = choices.map(c => (c.id === choice.id ? newChoice: C));
            
            // Neue Choice erzeugen, wenn in das letzte Eingabefeld etwas geschrieben wurde und das Feld noch leer war
            if(!choice.title && newChoice.title && choiceIx === (choices.length - 1)) {
                newChoices.push(emptyChoice());
            }
            )
        }
    }
    render() {
        const { active } = this.props;
    
        if ( !active ) {
            return this.renderInactiveForm();
        }
        return this.renderActiveForm();
    }

}
VoteComposer.PropTypes = {
    active: React.PropTypes.bool,
    onSave: React.PropType.func.isRequired,
    onActivate: React.PropType.func.isRequired,
    onDeactivate: React.PropType.func.isRequired
};