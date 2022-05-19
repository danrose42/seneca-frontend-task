import React from 'react';
import './Toggles.css';
import Switch from './Switch';

interface TogglesProps {
  question: string;
  // Correct answer must be zeroth element for each array (positions randomised when displayed)
  options1: [string, string] | [string, string, string];
  options2?: [string, string] | [string, string, string];
  options3?: [string, string] | [string, string, string];
  options4?: [string, string] | [string, string, string];
}

interface TogglesState {
  answer1: boolean;
  answer2: boolean;
  answer3: boolean;
  answer4: boolean;
  solved: boolean;
}

class Toggles extends React.Component<TogglesProps, TogglesState> {
  state: TogglesState = {
    // All answer states begin true and are made false by the relevant Switch component if necessary
    // after mounting, in case a switch component never exits (ie. if question has < 4 toggles)
    answer1: true,
    answer2: true,
    answer3: true,
    answer4: true,
    solved: false,
  };

  // Randomises order of toggles
  rand_order: Array<any> = [this.props.options1, this.props.options2, this.props.options3,
  this.props.options4].sort(() => Math.random() - 0.5);

  // Picks a toggle at random (later used to ensure question doesn't accidentally start already solved)
  choose_unsolved(options: Array<any>) {
    let i = Math.floor(Math.random() * 4);
    while (!options[i]) {
      i = Math.floor(Math.random() * 4);
    };
    return i;
  };
  force_unsolved: number = this.choose_unsolved(this.rand_order);

  componentDidUpdate() {
    // Sets 'solved' state to true upon correct solution to question
    if (!this.state.solved && this.state.answer1 && this.state.answer2 &&
      this.state.answer3 && this.state.answer4) {
      this.setState({ solved: true });
    };
  };

  // Checks correctness of current solution to determine background colour
  background_colour() {
    const num_options = [this.props.options1, this.props.options2,
    this.props.options3, this.props.options4].filter(Boolean).length;
    const num_solved = [this.state.answer1, this.state.answer2,
    this.state.answer3, this.state.answer4].filter(n => n === true).length;
    // Colours possible dependant on number of toggles for that question
    if (num_options === 1) {
      if (num_solved === 4) { return 'background-4' }
      else { return 'background-0' };
    } else if (num_options === 2) {
      if (num_solved === 4) { return 'background-4' }
      else if (num_solved === 3) { return 'background-2' }
      else { return 'background-0' };
    } else if (num_options === 3) {
      if (num_solved === 4) { return 'background-4' }
      else if (num_solved === 3) { return 'background-3' }
      else if (num_solved === 2) { return 'background-1' }
      else { return 'background-0' };
    } else {
      if (num_solved === 4) { return 'background-4' }
      else if (num_solved === 3) { return 'background-3' }
      else if (num_solved === 2) { return 'background-2' }
      else if (num_solved === 1) { return 'background-1' }
      else { return 'background-0' };
    };
  };

  render() {
    return (
      <>
        <div className={'toggles-component ' + this.background_colour()}>
          <div className='toggles-question text'>
            {this.props.question}
          </div>
          <div>
            {this.rand_order[0] ?
              <Switch switch_num={0}
                // Passes question string to Switch component
                question={this.props.question}
                // Passes relevant answer options to Switch component
                options={this.rand_order[0]}
                // Passes function to allow Switch component to set (relevant) answer state here
                switch_correct={(correct: boolean) => this.setState({ answer1: correct })}
                // Passes question solution state to Switch component
                solved={this.state.solved}
                // Passes info to Switch component if it needs to ensure it starts unsolved
                start_switch_unsolved={this.force_unsolved === 0 ? true : false}
              /> : null}
            {this.rand_order[1] ?
              <Switch switch_num={1}
                question={this.props.question}
                options={this.rand_order[1]}
                switch_correct={(correct: boolean) => this.setState({ answer2: correct })}
                solved={this.state.solved}
                start_switch_unsolved={this.force_unsolved === 1 ? true : false}
              /> : null}
            {this.rand_order[2] ?
              <Switch switch_num={2}
                question={this.props.question}
                options={this.rand_order[2]}
                switch_correct={(correct: boolean) => this.setState({ answer3: correct })}
                solved={this.state.solved}
                start_switch_unsolved={this.force_unsolved === 2 ? true : false}
              /> : null}
            {this.rand_order[3] ?
              <Switch switch_num={3}
                question={this.props.question}
                options={this.rand_order[3]}
                switch_correct={(correct: boolean) => this.setState({ answer4: correct })}
                solved={this.state.solved}
                start_switch_unsolved={this.force_unsolved === 3 ? true : false}
              /> : null}
          </div>
          <div className='toggles-answer text'>
            {this.state.solved ? 'The answer is correct!' : 'The answer is incorrect'}
          </div>
        </div>
      </>
    );
  }
}

export default Toggles;