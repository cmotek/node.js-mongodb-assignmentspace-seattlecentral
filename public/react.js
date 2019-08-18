"use strict";

class CheezForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '',
                  chump: [],
                  name: '',
                  rest: '',
                  price: '',
                  };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.allcheez = this.allcheez.bind(this);
    this.didgeridoo = this.didgeridoo.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  
  componentDidMount() {
  fetch("http://localhost:3000/routes/allcheez/").then((response) => {
    return response.json();
  }).then((results) => {
    this.allcheez(results);
    console.log(results);
    // any steps that need to happen after receiving server response
  })};

  didgeridoo(Name, Rest, Price){
    this.setState({ name: Name, 
                    rest: Rest,
                    price: Price});
  }

  allcheez(results) {
    results.forEach(function(v){ delete v._id; delete v.__v });
    this.setState({chump: results});
  }

  render() {
    return (
      <div>
      <div>
      <ul>
      { 
        this.state.chump.map((burg, index) => {

        return <li><a onClick={() => this.didgeridoo(burg.name, burg.restaurant, burg.price)} href="#" key={index}>{JSON.stringify(burg.name)}</a></li>
      })}
    </ul>
      </div>  
      <div>
       <h1> {JSON.stringify(this.state.chump)} </h1>
      </div>
      <form onSubmit={this.handleSubmit}>
        <p>
        <label>
          Name:
          <input type="text" value={this.state.name} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        </p>
        <p>
        <label>
          Restaurant:
          <input type="text" value={this.state.rest} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        </p>
        <p>
        <label>
          Price:
          <input type="number" value={this.state.price} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        </p>
      </form>
      </div>
    )}
  }

//for (var i = 0; i < cheezes.length; i++) {
//    const tingle = [];
//    tingle.push(React.createElement("a", {
//    href:'http://localhost:3000/routes/cheez/' + cheezes[i], 
//    key:i, 
//    className: "cheezlist",
//  }, cheezes[i]));
//};

//const ringle = React.createElement("div", {className: "ringle"}, tingle);


ReactDOM.render(<CheezForm />, document.getElementById('root'));
