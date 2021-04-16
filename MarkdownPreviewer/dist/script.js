const Button = ReactBootstrap.Button;
const Card = ReactBootstrap.Card;
const Form = ReactBootstrap.Form;
class AppWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      editorFull: false,
      previewerFull: false };


    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false });

    this.updateText = this.updateText.bind(this);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
  }

  updateText(markdown) {
    console.log('a');
    this.setState(oldState => ({
      ...oldState,
      text: marked(markdown) }));

  }

  toggleFullScreen(type) {
    this.setState(oldState => ({
      ...oldState,
      editorFull: type == "editor" ? !oldState.editorFull : false,
      previewerFull: type == "previewer" ? !oldState.previewerFull : false }));

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "app-wrapper" },
      !this.state.previewerFull ? /*#__PURE__*/React.createElement(CardSection, { full: this.state.editorFull, type: "editor", onFull: type => {this.toggleFullScreen(type);}, title: "Editor", onChanged: markdown => {this.updateText(markdown);} }) : /*#__PURE__*/React.createElement("div", null),
      !this.state.editorFull ? /*#__PURE__*/React.createElement(CardSection, { full: this.state.previewerFull, type: "previewer", onFull: type => {this.toggleFullScreen(type);}, title: "Previewer", text: this.state.text }) : /*#__PURE__*/React.createElement("div", null)));



  }}


class CardSection extends React.Component {
  render() {
    let fullS = this.props.full ? " full" : "";
    return /*#__PURE__*/(
      React.createElement(Card, { className: "card-section card-" + this.props.type + fullS }, /*#__PURE__*/
      React.createElement(Card.Header, { className: "card-header" }, /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("i", { id: "freecodecamp-icon", className: "fab fa-free-code-camp" }), /*#__PURE__*/
      React.createElement("b", null, "  ", this.props.title)), /*#__PURE__*/

      React.createElement(Button, { onClick: () => {this.props.onFull(this.props.type);}, id: "expand-icon" }, /*#__PURE__*/
      React.createElement("i", { className: "fas fa-expand-arrows-alt" }))), /*#__PURE__*/


      React.createElement(Card.Body, { className: "card-body" },
      this.props.type == 'editor' ? /*#__PURE__*/React.createElement(Editor, { markdown: this.props.markdown, onChanged: markdown => {this.props.onChanged(markdown);} }) : /*#__PURE__*/React.createElement(Previewer, { text: this.props.text }))));



  }}


class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      markdown: "# Welcome to my React Markdown Previewer!\r\n\r\n## This is a sub-heading...\r\n### And here\'s some other cool stuff:\r\n\r\nHeres some code, `<div><\/div>`, between 2 backticks.\r\n\r\n```\r\n\/\/ this is multi-line code:\r\n\r\nfunction anotherExample(firstLine, lastLine) {\r\n  if (firstLine == \'```\' && lastLine == \'```\') {\r\n    return multiLineCode;\r\n  }\r\n}\r\n```\r\n\r\nYou can also make text **bold**... whoa!\r\nOr _italic_.\r\nOr... wait for it... **_both!_**\r\nAnd feel free to go crazy ~~crossing stuff out~~.\r\n\r\nThere\'s also [links](https:\/\/www.freecodecamp.com)\r\nAnd if you want to get really crazy, even tables:\r\n\r\nWild Header | Crazy Header | Another Header?\r\n------------ | ------------- | -------------\r\nYour content can | be here, and it | can be here....\r\nAnd here. | Okay. | I think we get it.\r\n\r\n- And of course there are lists.\r\n  - Some are bulleted.\r\n- That look like this.\r\n\r\n\r\n1. And there are numbererd lists too.\r\n1. Use just 1s if you want!\r\n1. And last but not least, let\'s not forget embedded images:\r\n\r\n![Markdown Logo](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png)\r\n" };

  }

  componentDidMount() {
    this.props.onChanged(this.state.markdown);
  }

  handleChange(event) {
    this.setState({ markdown: event.target.value });
    this.props.onChanged(event.target.value);
  }

  render() {
    return /*#__PURE__*/(
      React.createElement(Form, { className: "form" }, /*#__PURE__*/
      React.createElement(Form.Group, { controlId: "exampleForm.ControlTextarea1" }, /*#__PURE__*/
      React.createElement(Form.Control, { as: "textarea", value: this.state.markdown, onChange: this.handleChange, id: "editor", rows: 3 }))));



  }}


class Previewer extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "preview", dangerouslySetInnerHTML: { __html: this.props.text } }));


  }}


ReactDOM.render( /*#__PURE__*/React.createElement(AppWrapper, null), document.getElementById('app'));