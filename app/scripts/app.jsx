import '../styles/base.css';
import React from 'react/addons';

let App = React.createClass({
  getInitialState() {
    return {timeSlots: []}
  },
  addNewTimeSlot() {
    return this.state
  },
  handleNewSlot(date, startTime, endTime) {
    let slot = {date: date, startTime: startTime, endTime: endTime}
    let updatedTimeSlots = this.state.timeSlots.concat(slot);
    this.setState({timeSlots: updatedTimeSlots})
  },
  render() {
    return (
      <div id='wrapper'>
        <header className='ui container'>
          <h1 className='ui header'>Schedulator</h1>
        </header>
        <main>
          <CreateSchedule timeSlots={this.state.timeSlots}
                          addNewSlot={this.handleNewSlot} />
        </main>
      </div>
    )
  }
});

let CreateSchedule = React.createClass({
  addSlot(e) {
    e.preventDefault();
    let date = (React.findDOMNode(this.refs.date).value.trim());
    let startTime = (React.findDOMNode(this.refs.startTime).value.trim());
    let endTime = (React.findDOMNode(this.refs.endTime).value.trim());

    this.props.addNewSlot(date, startTime, endTime)
  },

  handleSubmit(e) {
    e.preventDefault();
    console.log('Schedule Created!');
    // grab this.props.timeSlots and create
  },

  render() {
    let pendingSchedule = this.props.timeSlots.map(function(slot) {
      return (
        <p>
          {slot.date}, from {slot.startTime} to {slot.endTime}
        </p>
      )
    });

    return (
      <form className='ui form container'>

        <div className='field'>
          <label>Date:</label>
          <input type='text' ref='date' placeholder='Date' />
        </div>
        <div className='field'>
          <label>Start Time:</label>
          <input type='text' ref='startTime' placeholder='Start Time' />
        </div>
        <div className='field'>
          <label>End Time:</label>
          <input type='text' ref='endTime' placeholder='End Time' />
        </div>

        <button className='ui button' type='submit' onClick={this.addSlot}>
          Add Time Slot
        </button>

        <button className='ui button' type='submit' onClick={this.handleSubmit}>
          Create Schedule
        </button>

        <div className='ui container' id='pending-schedule'>
          {pendingSchedule}
        </div>

      </form>
    )
  }
})

React.render(<App />, document.body);
