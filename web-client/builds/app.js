(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;
var NavDropdown = ReactBootstrap.NavDropdown;
var Button = ReactBootstrap.Button;
var Jumbotron = ReactBootstrap.Jumbotron;
var PageHeader = ReactBootstrap.PageHeader;
var Table = ReactBootstrap.Table;

var NavBox = React.createClass({
  displayName: "NavBox",

  render: function () {
    return React.createElement(
      "div",
      null,
      React.createElement(
        Nav,
        { bsStyle: "pills", activeKey: 1 },
        React.createElement(
          NavItem,
          { eventKey: 1, href: "#" },
          "Home"
        )
      ),
      React.createElement(SummaryBox, null)
    );
  }
});

var SummaryBox = React.createClass({
  displayName: "SummaryBox",

  render: function () {
    return React.createElement(
      "div",
      null,
      React.createElement(
        PageHeader,
        null,
        "Cookie Monster",
        React.createElement("br", null),
        React.createElement(
          "small",
          null,
          " website cookie analysis"
        )
      ),
      React.createElement(
        Jumbotron,
        null,
        React.createElement(
          "h3",
          null,
          "Basic Reporting"
        ),
        React.createElement(
          "p",
          null,
          React.createElement(MostCommonButton, { url: "http://127.0.0.1:8081/reporting/most-common-url-host" })
        ),
        React.createElement(RandomCookieKeysWithValuesButton, { url: "http://127.0.0.1:8081/reporting/cookie-keys-with-values?samplesize=5" })
      )
    );
  }
});

var RandomCookieKeysWithValuesButton = React.createClass({
  displayName: "RandomCookieKeysWithValuesButton",

  getInitialState: function () {
    return { values: [] };
  },
  getRandomKeysAndValues: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ values: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function () {

    var tableItems = this.state.values.map(function (value) {
      //display the first value of the key-value pair
      return React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          null,
          value[0]
        ),
        React.createElement(
          "td",
          null,
          value[1][0]
        )
      );
    });

    console.log(this.state.values);
    return React.createElement(
      "div",
      null,
      React.createElement(
        Button,
        { Style: "primary", onClick: this.getRandomKeysAndValues },
        "Random Keys and Values"
      ),
      React.createElement(
        Table,
        { striped: true, bordered: true, condensed: true, hover: true },
        React.createElement(
          "thead",
          null,
          React.createElement(
            "tr",
            null,
            React.createElement(
              "th",
              null,
              "Key"
            ),
            React.createElement(
              "th",
              null,
              "Values"
            )
          )
        ),
        React.createElement(
          "tbody",
          null,
          tableItems
        )
      )
    );
  }

});

var MostCommonButton = React.createClass({
  displayName: "MostCommonButton",

  getInitialState: function () {
    return { topurl: "" };
  },
  getTopUrl: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ topurl: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function () {
    console.log(this.state.topurl);
    return React.createElement(
      "p",
      null,
      React.createElement(
        Button,
        { Style: "primary", onClick: this.getTopUrl },
        "Most Common Cookie Host"
      ),
      " ",
      this.state.topurl
    );
  }

});

ReactDOM.render(React.createElement(
  "div",
  null,
  React.createElement(NavBox, null)
), document.getElementById('content'));

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBSSxNQUFNLGVBQWUsR0FBekI7QUFDQSxJQUFJLFVBQVUsZUFBZSxPQUE3QjtBQUNBLElBQUksY0FBYyxlQUFlLFdBQWpDO0FBQ0EsSUFBSSxTQUFTLGVBQWUsTUFBNUI7QUFDQSxJQUFJLFlBQVksZUFBZSxTQUEvQjtBQUNBLElBQUksYUFBYSxlQUFlLFVBQWhDO0FBQ0EsSUFBSSxRQUFRLGVBQWUsS0FBM0I7O0FBRUEsSUFBSSxTQUFTLE1BQU0sV0FBTixDQUFrQjtBQUFBOztBQUM5QixVQUFRLFlBQVc7QUFDbEIsV0FDSTtBQUFBO0FBQUE7QUFDQztBQUFDLFdBQUQ7QUFBQSxVQUFLLFNBQVEsT0FBYixFQUFxQixXQUFXLENBQWhDO0FBQ0c7QUFBQyxpQkFBRDtBQUFBLFlBQVMsVUFBVSxDQUFuQixFQUFzQixNQUFLLEdBQTNCO0FBQUE7QUFBQTtBQURILE9BREQ7QUFJRSwwQkFBQyxVQUFEO0FBSkYsS0FESjtBQVFBO0FBVjZCLENBQWxCLENBQWI7O0FBYUEsSUFBSSxhQUFhLE1BQU0sV0FBTixDQUFrQjtBQUFBOztBQUNqQyxVQUFRLFlBQVc7QUFDakIsV0FDRTtBQUFBO0FBQUE7QUFDRTtBQUFDLGtCQUFEO0FBQUE7QUFBQTtBQUEwQix1Q0FBMUI7QUFBZ0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFoQyxPQURGO0FBRUU7QUFBQyxpQkFBRDtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQURGO0FBRUU7QUFBQTtBQUFBO0FBQUcsOEJBQUMsZ0JBQUQsSUFBa0IsS0FBSSxzREFBdEI7QUFBSCxTQUZGO0FBR0UsNEJBQUMsZ0NBQUQsSUFBa0MsS0FBSSxzRUFBdEM7QUFIRjtBQUZGLEtBREY7QUFVRDtBQVpnQyxDQUFsQixDQUFqQjs7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QUMsTUFBRDtBQURELENBREQsRUFJRSxTQUFTLGNBQVQsQ0FBd0IsU0FBeEIsQ0FKRiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgTmF2ID0gUmVhY3RCb290c3RyYXAuTmF2O1xudmFyIE5hdkl0ZW0gPSBSZWFjdEJvb3RzdHJhcC5OYXZJdGVtO1xudmFyIE5hdkRyb3Bkb3duID0gUmVhY3RCb290c3RyYXAuTmF2RHJvcGRvd247XG52YXIgQnV0dG9uID0gUmVhY3RCb290c3RyYXAuQnV0dG9uO1xudmFyIEp1bWJvdHJvbiA9IFJlYWN0Qm9vdHN0cmFwLkp1bWJvdHJvbjtcbnZhciBQYWdlSGVhZGVyID0gUmVhY3RCb290c3RyYXAuUGFnZUhlYWRlcjtcbnZhciBUYWJsZSA9IFJlYWN0Qm9vdHN0cmFwLlRhYmxlO1xuXG52YXIgTmF2Qm94ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgIFx0ICA8TmF2IGJzU3R5bGU9XCJwaWxsc1wiIGFjdGl2ZUtleT17MX0+XG4gICAgICAgICAgPE5hdkl0ZW0gZXZlbnRLZXk9ezF9IGhyZWY9XCIjXCI+SG9tZTwvTmF2SXRlbT5cbiAgICAgICAgPC9OYXY+XG4gICAgICAgIDxTdW1tYXJ5Qm94IC8+XG4gICAgICA8L2Rpdj5cblx0XHQpXG5cdH1cbn0pO1xuXG52YXIgU3VtbWFyeUJveCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPFBhZ2VIZWFkZXI+Q29va2llIE1vbnN0ZXI8YnIgLz48c21hbGw+IHdlYnNpdGUgY29va2llIGFuYWx5c2lzPC9zbWFsbD48L1BhZ2VIZWFkZXI+XG4gICAgICAgIDxKdW1ib3Ryb24+XG4gICAgICAgICAgPGgzPkJhc2ljIFJlcG9ydGluZzwvaDM+XG4gICAgICAgICAgPHA+PE1vc3RDb21tb25CdXR0b24gdXJsPVwiaHR0cDovLzEyNy4wLjAuMTo4MDgxL3JlcG9ydGluZy9tb3N0LWNvbW1vbi11cmwtaG9zdFwiIC8+PC9wPlxuICAgICAgICAgIDxSYW5kb21Db29raWVLZXlzV2l0aFZhbHVlc0J1dHRvbiB1cmw9XCJodHRwOi8vMTI3LjAuMC4xOjgwODEvcmVwb3J0aW5nL2Nvb2tpZS1rZXlzLXdpdGgtdmFsdWVzP3NhbXBsZXNpemU9NVwiIC8+XG4gICAgICAgIDwvSnVtYm90cm9uPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59KTtcblxudmFyIFJhbmRvbUNvb2tpZUtleXNXaXRoVmFsdWVzQnV0dG9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7dmFsdWVzOiBbXX07XG4gIH0sXG4gIGdldFJhbmRvbUtleXNBbmRWYWx1ZXM6IGZ1bmN0aW9uKCkge1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6IHRoaXMucHJvcHMudXJsLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWVzOiBkYXRhfSk7XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCBzdGF0dXMsIGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMucHJvcHMudXJsLCBzdGF0dXMsIGVyci50b1N0cmluZygpKTtcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgIH0pO1xuXG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgdGFibGVJdGVtcyA9ICh0aGlzLnN0YXRlLnZhbHVlcykubWFwKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAvL2Rpc3BsYXkgdGhlIGZpcnN0IHZhbHVlIG9mIHRoZSBrZXktdmFsdWUgcGFpclxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPHRyPlxuICAgICAgICAgIDx0ZD57dmFsdWVbMF19PC90ZD5cbiAgICAgICAgICA8dGQ+e3ZhbHVlWzFdWzBdfTwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICApXG5cbiAgICB9KTtcblxuICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUudmFsdWVzKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgIDxCdXR0b24gU3R5bGU9XCJwcmltYXJ5XCIgb25DbGljaz17dGhpcy5nZXRSYW5kb21LZXlzQW5kVmFsdWVzfT5SYW5kb20gS2V5cyBhbmQgVmFsdWVzPC9CdXR0b24+XG4gICAgICA8VGFibGUgc3RyaXBlZCBib3JkZXJlZCBjb25kZW5zZWQgaG92ZXI+XG4gICAgICAgIDx0aGVhZD5cbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGg+S2V5PC90aD5cbiAgICAgICAgICAgIDx0aD5WYWx1ZXM8L3RoPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgIDwvdGhlYWQ+XG4gICAgICAgIDx0Ym9keT5cbiAgICAgICAgICB7dGFibGVJdGVtc31cbiAgICAgICAgPC90Ym9keT5cbiAgICAgIDwvVGFibGU+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxufSk7XG5cbnZhciBNb3N0Q29tbW9uQnV0dG9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7dG9wdXJsOiBcIlwifTtcbiAgfSxcbiAgZ2V0VG9wVXJsOiBmdW5jdGlvbigpIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiB0aGlzLnByb3BzLnVybCxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3RvcHVybDogZGF0YX0pO1xuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgc3RhdHVzLCBlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLnByb3BzLnVybCwgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICB9KTtcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlLnRvcHVybCk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxwPjxCdXR0b24gU3R5bGU9XCJwcmltYXJ5XCIgb25DbGljaz17dGhpcy5nZXRUb3BVcmx9Pk1vc3QgQ29tbW9uIENvb2tpZSBIb3N0PC9CdXR0b24+IHt0aGlzLnN0YXRlLnRvcHVybH08L3A+XG4gICAgKVxuICB9XG5cbn0pO1xuXG5cblJlYWN0RE9NLnJlbmRlcihcblx0PGRpdj5cblx0XHQ8TmF2Qm94IC8+XG4gIDwvZGl2PixcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKVxuKTsiXX0=
