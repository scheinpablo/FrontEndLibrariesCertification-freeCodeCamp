const AppWrapper = (props) =>
{
  return /*#__PURE__*/(
    React.createElement("div", { className: "app-wrapper" }, /*#__PURE__*/
    React.createElement(Calculator, null)));


};

const Calculator = props => {
  const [calculation, setCalculation] = React.useState('');
  const [result, setResult] = React.useState('0');
  const [showingResult, setShowingResult] = React.useState(true);

  const isAbsolutOperator = char => {
    if (char == '+' || char == '/' || char == '*') return true;
    return false;
  };

  const isOperator = char => {
    if (char == '+' || char == '/' || char == '*' || char == '-') return true;
    return false;
  };

  const addToCalculation = newChar => {

    if (isOperator(newChar)) {
      setResult(newChar);
      if (showingResult) {
        setCalculation(result + newChar);
      } else {

        if (isAbsolutOperator(newChar)) {
          var count = 0;
          while (isOperator(calculation.charAt(calculation.length - 1 - count)) && count <= calculation.length)
          {
            count += 1;
          }
          newCalc = calculation;
          if (count != 0) newCalc = calculation.slice(0, -count);

          setCalculation(newCalc + newChar);
        } else {
          setCalculation(calculation + newChar);
        }
      }
    } else if (newChar == '.') {
      if (!result.includes('.')) {
        if (calculation.slice(-1) == null || isOperator(calculation.slice(-1))) {
          setCalculation(calculation + '0' + newChar);
          setResult('0' + newChar);
        } else {
          setCalculation(calculation + newChar);
          setResult(result + newChar);
        }
      }
    } else {
      if (result.charAt(0) != null && result.charAt(0) == '0' && calculation.slice(-1) != '.') {
        setResult(newChar);
        if (newChar != '0') {
          setCalculation(calculation + newChar);
        }
      } else if (isOperator(result.charAt(0))) {
        setResult(newChar);
        setCalculation(calculation + newChar);
      } else {
        setResult(result + newChar);
        setCalculation(calculation + newChar);
      }
    }
    setShowingResult(false);
  };

  const clearCalculation = () => {
    setCalculation('');
    setResult('0');
    setShowingResult(false);
  };

  const getResult = () => {
    setResult(Number(math.evaluate(calculation).toFixed(4)).toString());
    setShowingResult(true);
  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "calculator" }, /*#__PURE__*/
    React.createElement("div", { id: "screen" }, /*#__PURE__*/
    React.createElement("div", { id: "partial-calc" }, calculation), /*#__PURE__*/
    React.createElement("div", { id: "display" }, result.toString())), /*#__PURE__*/


    React.createElement("button", { className: "calculator-button", id: "clear", onClick: () => {clearCalculation();} }, "AC"), /*#__PURE__*/
    React.createElement("button", { className: "calculator-button operation-button", id: "divide", onClick: () => {addToCalculation('/');} }, "/"), /*#__PURE__*/
    React.createElement("div", { className: "calculator-button operation-button", id: "multiply", onClick: () => {addToCalculation('*');} }, "x"), /*#__PURE__*/

    React.createElement("button", { className: "calculator-button", id: "seven", onClick: () => {addToCalculation('7');} }, "7"), /*#__PURE__*/
    React.createElement("button", { className: "calculator-button", id: "eight", onClick: () => {addToCalculation('8');} }, "8"), /*#__PURE__*/
    React.createElement("button", { className: "calculator-button", id: "nine", onClick: () => {addToCalculation('9');} }, "9"), /*#__PURE__*/
    React.createElement("button", { className: "calculator-button operation-button", id: "subtract", onClick: () => {addToCalculation('-');} }, "-"), /*#__PURE__*/

    React.createElement("button", { className: "calculator-button", id: "four", onClick: () => {addToCalculation('4');} }, "4"), /*#__PURE__*/
    React.createElement("button", { className: "calculator-button", id: "five", onClick: () => {addToCalculation('5');} }, "5"), /*#__PURE__*/
    React.createElement("button", { className: "calculator-button", id: "six", onClick: () => {addToCalculation('6');} }, "6"), /*#__PURE__*/
    React.createElement("button", { className: "calculator-button operation-button", id: "add", onClick: () => {addToCalculation('+');} }, "+"), /*#__PURE__*/

    React.createElement("button", { className: "calculator-button", id: "one", onClick: () => {addToCalculation('1');} }, "1"), /*#__PURE__*/
    React.createElement("button", { className: "calculator-button", id: "two", onClick: () => {addToCalculation('2');} }, "2"), /*#__PURE__*/
    React.createElement("button", { className: "calculator-button", id: "three", onClick: () => {addToCalculation('3');} }, "3"), /*#__PURE__*/
    React.createElement("button", { className: "calculator-button", id: "equals", onClick: () => {getResult();} }, "="), /*#__PURE__*/

    React.createElement("button", { className: "calculator-button", id: "zero", onClick: () => {addToCalculation('0');} }, "0"), /*#__PURE__*/
    React.createElement("button", { className: "calculator-button", id: "decimal", onClick: () => {addToCalculation('.');} }, ".")));



};

ReactDOM.render( /*#__PURE__*/React.createElement(AppWrapper, null), document.getElementById('app'));