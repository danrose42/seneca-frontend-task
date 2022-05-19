import React from 'react';
import './Toggles.css';
import { motion } from 'framer-motion';

// Switch props explained in Toggles.tsx (when Switch component is first called)
interface SwitchProps {
  switch_num: number;
  question: string;
  options: [string, string] | [string, string, string];
  switch_correct: Function;
  solved: boolean;
  start_switch_unsolved: boolean;
}

interface SwitchState {
  selected: number;
  animate: boolean;
  wrap: boolean;
}

class Switch extends React.Component<SwitchProps, SwitchState> {
  state: SwitchState = {
    // Picks a toggle option at random to start as selected
    selected: Math.floor(Math.random() * (this.props.options[2] ? 3 : 2)),
    // State to control toggle animation (prevents unintended animations when changing active question)
    animate: false,
    // State to control visual elements when toggle wraps onto multiple lines (mainly border radius)
    wrap: false,
  };

  // Randomises order of toggle options
  random_options: Array<string> = [...this.props.options].sort(() => Math.random() - 0.5);

  // Function to update 'wrap' state for toggle by checking height of element 
  update_width() {
    // State update used to immedaitely trigger re-render if necessary after window resize
    this.setState({ wrap: false }, () => {
      // Get height of element
      const switch_height = document.getElementById('switch' + this.props.switch_num + this.props.question);
      // Check whether height of element is large enough to indicate wrapping
      if (switch_height && (switch_height.clientHeight > 85 ||
        // Accommodate for other size screens (using @media query breakpoints defined in Toggles.css)
        (window.innerWidth <= 1024 && switch_height.clientHeight > 68) ||
        (window.innerWidth <= 480 && switch_height.clientHeight > 52))) {
        // Set 'wrap' state to true if necessary (otherwise already set false by outer function)
        this.setState({ wrap: true });
      };
    });
  };

  componentDidMount() {
    // Checks whether initially selected option is the correct answer
    if (this.random_options[this.state.selected] !== this.props.options[0]) {
      // If not, set relevant answer state in Toggles.tsx to false
      this.props.switch_correct(false);
    } else {
      // Otherwise if initially selected answer is already correct, check whether this toggle needs to
      // ensure it starts unsolved (one toggle picked at random by Toggles.tsx and passed as a prop)
      if (this.props.start_switch_unsolved) {
        // If toggle does need to start unsolved, change selected option to an incorrect one
        if (this.state.selected === 0) {
          this.setState({ selected: 1 });
        } else {
          this.setState({ selected: 0 });
        };
        // And set relevant answer state in Toggles.tsx to false
        this.props.switch_correct(false);
      };
    };
    // Check screen size after initial mount (in case screen starts off small enough for toggle to wrap)
    this.update_width();
    // Add a 'resize' event listener to check if toggle has wrapped each time screen size changes
    window.addEventListener('resize', () => this.update_width());
  };

  componentWillUnmount() {
    // Clean up 'resize' event listener if component is unmounted
    window.removeEventListener('resize', () => this.update_width());
  };

  // Function to change selected answer (called onClick for each toggle option)
  select_answer(option: number) {
    // Disables toggle if question reaches fully solved state (prop passed from Toggles.tsx)
    if (!this.props.solved) {
      // Enables toggle animation
      this.setState({ animate: true }, () => {
        // Updates 'selected' state as a callback function to ensure animation is enabled
        this.setState({ selected: option });
        // And disables animation again immediately after transition has finished (250ms)
        setTimeout(() => this.setState({ animate: false }), 250);
      });
      // Checks whether newly selected option is the correct answer
      if (this.random_options[option] === this.props.options[0]) {
        // And modify relevant answer in Toggles.tsx accordingly
        this.props.switch_correct(true);
      } else {
        this.props.switch_correct(false);
      };
    };
  };

  render() {
    return (
      <>
        <div className='toggles-switch' style={{ cursor: (this.props.solved ? 'default' : 'pointer') }}>
          <div id={'switch' + this.props.switch_num + this.props.question}
            className={'switch-container ' + (this.state.wrap ? 'wrapped' : '')}>
            <div className={'switch-option'} onClick={() => this.select_answer(0)}>
              <div className={'text switch-text ' + (this.state.selected === 0 ? 'text-sel' : '')}>
                {this.random_options[0]}
              </div>
              {this.state.selected === 0 ?
                (this.state.animate ?
                  // Switches between framer-motion div (when animating)
                  <motion.div layoutId={this.props.switch_num + this.props.question}
                    className={'switch-sel ' + (this.state.wrap ? 'wrap-sel' : '')}
                    animate={{ opacity: 0.75 }}
                    initial={false}
                    transition={{ duration: 0.25 }} // (250ms)
                  />
                  // And standard div based on 'animate' state
                  : <div className={'switch-sel ' + (this.state.wrap ? 'wrap-sel' : '')}></div>)
                : null}
            </div>
            <div
              className={'switch-option'} onClick={() => this.select_answer(1)}>
              <div className={'text switch-text ' + (this.state.selected === 1 ? 'text-sel' : '')}>
                {this.random_options[1]}
              </div>
              {this.state.selected === 1 ?
                (this.state.animate ?
                  <motion.div layoutId={this.props.switch_num + this.props.question}
                    className={'switch-sel ' + (this.state.wrap ? 'wrap-sel' : '')}
                    animate={{ opacity: 0.75 }}
                    initial={false}
                    transition={{ duration: 0.25 }}
                  />
                  : <div className={'switch-sel ' + (this.state.wrap ? 'wrap-sel' : '')}></div>)
                : null}
            </div>
            {this.props.options[2] ?
              <div className='switch-option' onClick={() => this.select_answer(2)}>
                <div className={'text switch-text ' + (this.state.selected === 2 ? 'text-sel' : '')}>
                  {this.random_options[2]}
                </div>
                {this.state.selected === 2 ?
                  (this.state.animate ?
                    <motion.div layoutId={this.props.switch_num + this.props.question}
                      className={'switch-sel ' + (this.state.wrap ? 'wrap-sel' : '')}
                      animate={{ opacity: 0.75 }}
                      initial={false}
                      transition={{ duration: 0.25 }}
                    />
                    : <div className={'switch-sel ' + (this.state.wrap ? 'wrap-sel' : '')}></div>)
                  : null}
              </div>
              : null}
          </div>
        </div>
      </>
    );
  }
}

export default Switch;