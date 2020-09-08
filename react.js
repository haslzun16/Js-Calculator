class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
      clickedNumber: false,
      clickedOperator: false,
      clickedDecimal: false,
      prevOperator: undefined
    };
    this.resetDisplay = this.resetDisplay.bind(this);
    this.doWriteNumber = this.doWriteNumber.bind(this);
    this.doWriteDecimal = this.doWriteDecimal.bind(this);
    this.doWriteEquals = this.doWriteEquals.bind(this);
    this.doOperation = this.doOperation.bind(this);
  }

  resetDisplay() {
    this.setState({
      display: "0",
      clickedNumber: false,
      clickedOperator: false,
      clickedDecimal: false,
      prevOperator: undefined
    });
  }

  doWriteNumber(event) {
    if (!this.state.clickedNumber && event.target.innerText !== "0") {
      this.setState({
        display: event.target.innerText,
        clickedNumber: true,
        clickedOperator: false
      });
    } else if (this.state.clickedNumber) {
      this.setState({
        display: this.state.display + event.target.innerText,
        clickedOperator: false,
        prevOperator: undefined
      });
    }
  }
  doWriteDecimal(event) {
    if (!this.state.clickedDecimal) {
      this.setState({
        display: this.state.display + event.target.innerText,
        clickedDecimal: true,
        clickedNumber: true
      });
    }
  }

  doWriteEquals() {
    let result = eval(this.state.display);
    console.log(result);
    this.setState({
      display: result.toString()
    });
  }
  doOperation(event) {
    
    function handleOperation(prevOperator, innerText, display) {
      let arr = display.split("");
      // console.log(arr);
       
        arr.splice(arr.length - 1,1, innerText);
        // console.log(arr);
       
    
       return arr;
    }
    
    if (!this.state.clickedOperator) {
      this.setState({
        display: this.state.display + event.target.innerText,
        clickedOperator: true,
        clickedDecimal: false,
        prevOperator: event.target.innerText
      });
    }
    // 2+ [2,*,+,2]
    //array.splice(index, howmany, event.target.innerText)
    /*if(prevOp != undefinded &&  event.target.innerText !== "-"){
        let arr = this.state.display.split("");
        arr.splice(arr.length-1, 1, event.target.innerText )
    } 5 * - + 5*/
    else {
      let arr =[];
      if (
       this.state.prevOperator !== undefined &&
        event.target.innerText !== "-"
      ){
         arr = handleOperation(this.state.prevOperator, event.target.innerText, this.state.display);
        this.setState({
        display: arr.join(""),
        clickedDecimal: false
      });
      }else{
        arr = this.state.display.split("");
        arr.splice(arr.length, 1, event.target.innerText);
      this.setState({
        display: arr.join(""),
        clickedDecimal: false
      });
      }
    }
  }

  render() {
    const arrNum = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine"
    ];
    const operators = [
      { id: "add", content: "+" },
      { id: "subtract", content: "-" },
      { id: "multiply", content: "*" },
      { id: "divide", content: "/" }
    ];

    return (
      <div id="app">
        <Display content={this.state.display} />

        {arrNum.map((number, idx) => (
          <Button
            className="operators"
            id={number}
            key={idx}
            name={idx}
            onClick={this.doWriteNumber}
          />
        ))}

        <Button id="decimal" name="." onClick={this.doWriteDecimal} />

        {operators.map((operator, idx) => (
          <Button
            id={operator.id}
            key={idx}
            name={operator.content}
            onClick={this.doOperation}
          />
        ))}
        <Button id="clear" name="AC" onClick={this.resetDisplay} />
        <Button id="equals" name="=" onClick={this.doWriteEquals} />
      </div>
    );
  }
}

const Button = (props) => (
  <button id={props.id} onClick={props.onClick}>
    {props.name}
  </button>
);
const Display = (props) => <div id="display">{props.content}</div>;

ReactDOM.render(<App />, document.getElementById("calculator"));
