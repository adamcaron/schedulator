import '../styles/base.css';
import React from 'react/addons';

let App = React.createClass({
  render() {
    return (
      <div id='shell'>
        <header>
          <h1>Schedulator</h1>
        </header>
        <main>
        </main>
      </div>
    )
  }
});

React.render(<App />, document.body);
