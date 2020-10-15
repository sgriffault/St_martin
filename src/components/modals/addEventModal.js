import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

/**
 * Contains the formular's HTML code
 */
class AddEventModal extends React.Component {

    parentFormular;

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            counter: 0,
            family: ["Camille", "Julie", "Odile", "Alain", "Simon", "Christian", "Caroline", "Pierre",
                    "Paola", "Lucie", "William"],
            selectedFamily: new Set(),
            selectedType: ""
        }
        
        this.parentFormular = props.parentFormular;
        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.keyPressedSubmit = this.keyPressedSubmit.bind(this);
        this.submit = this.submit.bind(this);
        this.addFriend = this.addFriend.bind(this);
        this.addFamily = this.addFamily.bind(this);
        this.selectType = this.selectType.bind(this);
    }

    handleShowModal() {
        this.setState({
            showModal: true
        });
    }

    handleCloseModal() {
        this.setState({
            showModal: false,
            counter: 1
        })
        
    }

    /**
     * Allow to submit on input key 'Enter' press
     * @param {*} event the event of the listener
     */
    keyPressedSubmit(event) {
        if (event.key === "Enter") {
            document.getElementById("orderByInputButton").click();
        }
    }

    /**
     * submit a list with each value of input
     */
    submit(){
        if(this.state.selectedType === "" || this.state.selectedFamily.size === 0){
            window.alert("Il me manque des informations");
            return;
        }

        const familySet = this.state.selectedFamily;
        const typeString = this.state.selectedType;
        let friendsList = [];
        this.handleCloseModal();
        let value;
        for(let i= 1; i <= this.state.counter; i++){
            value = document.getElementById('friend_' + i).value
            friendsList.push(value);
        }
        this.setState({
            counter: 0,
            selectedFamily: new Set(),
            type: ""
        })
        let parameters = {
            family: familySet,
            type: typeString,
            friends: friendsList
        }
        this.parentFormular.addEventToCalendar(parameters);
    }

    addFamily(e){
        const value = e.target.value;
        const selectClass = "w3-button w3-border w3-border-black w3-margin-top w3-margin-right w3-green";
        const unselectClass = "w3-button w3-border w3-border-black w3-margin-top w3-margin-right w3-hover-green";
        if(this.state.selectedFamily.has(value)){
            e.target.className = unselectClass;
            this.state.selectedFamily.delete(e.target.value);
        }else {
            e.target.className = selectClass;
            this.state.selectedFamily.add(e.target.value);
        }
        
    }

    selectType(e){
        let elems = document.getElementsByClassName("typeButton");
        for(let item of elems){
            if(!item.className.includes("w3-opacity"))
                item.className = item.className + " w3-opacity "
        }
        e.target.className = e.target.className.replace("w3-opacity", "");
        this.state.selectedType = e.target.innerHTML;
    }

    async addFriend(){
        const count = this.state.counter;  
        await this.setState({
            counter: count + 1
        });
        let inputsDiv = document.getElementById('friends');

        let div = document.createElement("div");

        let input = document.createElement('input');
        input.id ='friend_' + this.state.counter;
        input.className = 'w3-input w3-border w3-margin-top';
        input.type = 'text';
        input.placeholder = 'Name here';
        input.style = "width: 100%";
        input.onKeyPress = this.keyPressedSubmit;
        input.value = '';

        div.appendChild(input);
        inputsDiv.appendChild(div);
    }

    render() {
        return (
            <div>
                <Modal show={this.state.showModal} onHide={this.handleCloseModal} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Qui nous fait l'honneur de sa présence cette fois-ci ?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div id="family" className="form-group w3-animate-opacity">
                            <div>
                                {this.state.family.map(p => (
                                    <button onClick={this.addFamily} key={p} value={p}
                                        className="w3-button w3-border w3-border-black w3-margin-top w3-margin-right w3-hover-green">{p}</button>
                                ))}
                            </div>
                            <div id="friends">
                            </div>
                            <button className="w3-button w3-border w3-margin-top" onClick={this.addFriend} >Appel à un ami</button>                                    
                        </div>
                        <div>
                            <button className="typeButton w3-btn w3-lime w3-opacity w3-margin-top" onClick={this.selectType} style={{marginRight:'5px'}}>
                                Je viens passer du bon temps
                            </button>
                            <button className="typeButton w3-btn w3-amber w3-opacity w3-margin-top" onClick={this.selectType} style={{marginRight:'5px'}}>
                                Je viens peut-être
                            </button>
                            <button className="typeButton w3-btn w3-deep-orange w3-opacity w3-margin-top" onClick={this.selectType}>
                                Je voudrais être tranquile
                            </button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseModal}>
                            Annuler
                        </Button>
                        <Button id="orderByInputButton" variant="primary" onClick={this.submit}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Button id="addEventShowButton" onClick={this.handleShowModal} style={{display:'none'}}></Button>
            </div>
        );
    }
}

export default AddEventModal;
