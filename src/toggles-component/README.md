### Comments

**Quiz.tsx - for demonstration purposes, showing example questions and switching between them**
- In reality question and answer data would be loaded from eg. a separate file and handled to fit component props.
- No formatting on prev/next question buttons.

**Toggles.tsx - component contains overall logic for a single question**
- Can accomodate any question and up to four answer toggles, with either two or three toggle positions for each (all passed to the component as props). Does currently require correct answer to be zeroth element for each array of options when passed to component (positions are later randomised before being displayed).
- Randomises the order of toggles.
- Background colour changes in proportion to how correct the answer is.
- Also forces a random toggle to start in unsolved state - ensures question doesn't accidentally start already solved.

**Switch.tsx - component containing logic for each individual toggle**
- Randomises the order of answer options for each toggle.
- Also picks an option at random to start as selected (for each toggle).
- Toggles animate between selected options.
- And toggles lock and cannot be switched once the correct answer is reached.

**Toggles.css - contains responsive styling down to 320px**