import React from 'react';

export default class VoteComposer extends React.Component {

    constructor(props) {
        super(props);

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
        return (
            <div className="Row VoteComposer Spacer">
                <div className="Head">
                    <h1>
                        <input className="Title"
                                autoFocus
                                name="title"
                                type="text"
                                placeholder="What do yout want to know?"/>
                    </h1>
                    <input className="Description"
                            name="description"
                            type="text"
                            placeholder="Describe your question in one sentence"/>
                </div>
                <div className="Body">
                    <input className="Choice"
                            type="text"
                            key="Choice_1"
                            name="Choice_!"
                            placeholder="Choice #1"
                    />
                    <div className="ButtonBar">
                        <a className="Button" onClick={this.save}>Save</a>
                        <a className="Button" onClick={this.close}>Cancel</a>
                    </div>    
                </div>
            </div>
        )
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