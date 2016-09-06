var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;
var NavDropdown = ReactBootstrap.NavDropdown;
var Button = ReactBootstrap.Button;
var Jumbotron = ReactBootstrap.Jumbotron;
var PageHeader = ReactBootstrap.PageHeader;
var Table = ReactBootstrap.Table;

var NavBox = React.createClass({
	render: function() {
		return (
      <div>
    	  <Nav bsStyle="pills" activeKey={1}>
          <NavItem eventKey={1} href="#">Home</NavItem>
        </Nav>
        <SummaryBox />
      </div>
		)
	}
});

var SummaryBox = React.createClass({
  render: function() {
    return (
      <div>
        <PageHeader>Cookie Monster<br /><small> website cookie analysis</small></PageHeader>
        <Jumbotron>
          <h3>Basic Reporting</h3>
          <p><MostCommonButton url="http://127.0.0.1:8081/reporting/most-common-url-host" /></p>
          <RandomCookieKeysWithValuesButton url="http://127.0.0.1:8081/reporting/cookie-keys-with-values?samplesize=5" />
        </Jumbotron>
      </div>
    )
  }
});

var RandomCookieKeysWithValuesButton = React.createClass({
  getInitialState: function() {
    return {values: []};
  },
  getRandomKeysAndValues: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({values: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

  },
  render: function() {

    var tableItems = (this.state.values).map(function(value) {
      //display the first value of the key-value pair
      return (
        <tr>
          <td>{value[0]}</td>
          <td>{value[1][0]}</td>
        </tr>
      )

    });

    console.log(this.state.values);
    return (
      <div>
      <Button Style="primary" onClick={this.getRandomKeysAndValues}>Random Keys and Values</Button>
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Key</th>
            <th>Values</th>
          </tr>
        </thead>
        <tbody>
          {tableItems}
        </tbody>
      </Table>
      </div>
    )
  }

});

var MostCommonButton = React.createClass({
  getInitialState: function() {
    return {topurl: ""};
  },
  getTopUrl: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({topurl: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    console.log(this.state.topurl);
    return (
      <p><Button Style="primary" onClick={this.getTopUrl}>Most Common Cookie Host</Button> {this.state.topurl}</p>
    )
  }

});


ReactDOM.render(
	<div>
		<NavBox />
  </div>,
  document.getElementById('content')
);