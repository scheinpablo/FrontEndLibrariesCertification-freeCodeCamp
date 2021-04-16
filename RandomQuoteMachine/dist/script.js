const Button = ReactBootstrap.Button;

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.colors = ["red", "blue", "green", "purple", "pink"];
    this.state = {
      color: this.colors[0] };

    this.updateColor = this.updateColor.bind(this);
  }

  updateColor() {
    var color = this.state.color;
    while (color === this.state.color) {
      color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }
    this.setState(oldState => ({
      color: color }));

  }


  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "app-wrapper", style: { backgroundColor: this.state.color } }, /*#__PURE__*/
      React.createElement(QuoteBox, { color: this.state.color, updateColor: this.updateColor })));


  }}



class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: '' };

    this.updateText = this.updateText.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }



  updateContent() {
    this.updateText().then(() => {
      this.props.updateColor();
    });
  }



  async updateText() {
    const apiUrl = 'https://goquotes-api.herokuapp.com/api/v1/random?count=1';
    await fetch(apiUrl).
    then(response => response.json()).
    then(data => {
      var quote = data['quotes'][0];
      this.setState(oldState => ({
        quote: quote["text"],
        author: quote["author"] }));


    });
  }
  componentDidMount() {
    this.updateContent();
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "quote-box" }, /*#__PURE__*/

      React.createElement("div", { class: "quote-text" }, /*#__PURE__*/
      React.createElement("i", { id: "quote-icon", style: { color: this.props.color }, class: "fa fa-quote-left fa-fw" }), /*#__PURE__*/
      React.createElement("span", { id: "text", style: { color: this.props.color } },
      this.state.quote)), /*#__PURE__*/


      React.createElement("div", { class: "quote-author" }, "- ", /*#__PURE__*/
      React.createElement("span", { style: { color: this.props.color }, id: "author" }, this.state.author)), /*#__PURE__*/

      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("a", { href: "twitter.com/intent/tweet", title: "Tweet this quote", target: "_blank", id: "tweet-quote", className: "btn btn-primary short-col fab fa-twitter", style: { backgroundColor: this.props.color, borderColor: this.props.color } }), /*#__PURE__*/

      React.createElement("a", { href: "#", target: "_blank", id: "tumblr-quote", className: "btn btn-primary fab fa-tumblr short-col", style: { backgroundColor: this.props.color, borderColor: this.props.color } }), /*#__PURE__*/

      React.createElement("div", { className: "spacer" }), /*#__PURE__*/
      React.createElement(Button, { className: "large-col", id: "new-quote", onClick: this.updateContent, style: { backgroundColor: this.props.color, borderColor: this.props.color } }, "New Quote"))));





  }}

ReactDOM.render( /*#__PURE__*/React.createElement(AppWrapper, null), document.querySelector('#app'));