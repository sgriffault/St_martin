import React from 'react';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import AddEventModal from './modals/addEventModal';


// const BACKEND_URL = "http://localhost:8081";

/**
 * Contains the header's HTML code.
 */
class Calendrier extends React.Component {

    constructor(props){
      super();
      this.state = {
        date: new Date(),
        calendarMap: new Map()
      }

      this.showModal = this.showModal.bind(this);
  }
   
    onChange = date => this.setState({ date })
   
    render() {
      return (
        <div>
          <AddEventModal parentFormular={this} />

          <Calendar
            onChange={this.onChange}
            value={this.state.date}
            onClickDay={this.showModal}
          />
        </div>
      );
    }

    showModal(){
      let button = document.getElementById("addEventShowButton");
        if (button !== null) {
            button.click();
        }
    }

    addEventToCalendar(params){
      console.log(params.family);
      console.log(params.friends);
      console.log(params.type);
    }
  }

export default Calendrier;
