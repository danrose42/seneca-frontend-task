import React from 'react';
import Toggles from './Toggles';

interface QuizProps { }

interface QuizState {
  question_num: number;
}

class Quiz extends React.Component<QuizProps, QuizState> {
  state: QuizState = {
    question_num: 1,
  };
  total_questions: number = 3;

  render() {
    return (
      <>
        <div>
          <div hidden={this.state.question_num === 1 ? false : true}>
            <Toggles
              question='An animal cell contains:'
              options1={['Ribosomes', 'Cell wall']}
              options2={['Cytoplasm', 'Chloroplast']}
              options3={['Partially permeable membrane', 'Impermeable  membrane']}
              options4={['Mitochondria', 'Cellulose']}
            />
          </div>
          <div hidden={this.state.question_num === 2 ? false : true}>
            <Toggles
              question='What are the ideal conditions inside an office?'
              options1={['Good pay', 'Bad pay']}
              options2={['Less meetings', 'Lots of meetings']}
              options3={['Free coffee', 'Expensive coffee']}
              options4={['Dog in office', 'Bear in office']}
            />
          </div>
          <div hidden={this.state.question_num === this.total_questions ? false : true}>
            <Toggles
              question='Which are the best sports people & teams?'
              options1={['Liverpool', 'Chelsea', 'Manchester United']}
              options2={['Serena Williams', 'Naomi Osaka']}
            />
          </div>
        </div>
        <div>
          <button onClick={() => {
            // Switches active question
            this.setState({ question_num: this.state.question_num - 1 },
              // Manual window 'resize' event triggered as a callback to setState to ensure
              // correct formatting when switching question (event listener added in Switch.tsx)
              () => window.dispatchEvent(new Event('resize')))
          }}
            disabled={this.state.question_num === 1 ? true : false}
          >
            Previous question
          </button>
          <button onClick={() => {
            this.setState({ question_num: this.state.question_num + 1 },
              () => window.dispatchEvent(new Event('resize')))
          }}
            disabled={this.state.question_num === this.total_questions ? true : false}
          >
            Next question
          </button>
        </div>
      </>
    );
  }
}

export default Quiz;