import React, { Component } from 'react';
import './App.css';
import School from "./School";

class App extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        appView: true,
        schools: [],
        selectedSchoolIndex: "" 
      };
  }

  componentDidMount() {
    fetch("http://localhost:9000/api/v1/schools")
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then(json => {
        this.setState ({
          schools: json
        });
      })
      .catch(error => {
        console.log(error)
      })
  }

  changeView(i) {
    if (this.state.appView === true) { 
      this.setState ({
        appView: false,
        selectedSchoolIndex: i 
      });
    } else {
        this.setState ({
          appView: true
      });
    }
  }  
  
  render() {
    return (
      <div className ="body">
        <img className = "hero-image" src="https://images.unsplash.com/photo-1470004914212-05527e49370b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1526&q=80" alt ="Taipei"></img>
    
          <div className="hero-text">
              <h1>HUAYU <br /> Reviews</h1>
              <p>Explore Taiwanese universities related to the HUAYU Enrichment Scholarship. Help others and leave a review of your experience!</p>
          </div>

          <div>  
            <div className="checklist">
              <div id="Location">
                  <h3>Location</h3>
                    <input type="checkbox" />
                    <label className="container">Northern</label> <br />
                    <input type="checkbox" />
                    <label className="container">Western</label> <br />
                    <input type="checkbox" />
                    <label className="container">Southern</label> <br />
                    <input type="checkbox" />
                    <label className="container">Eastern</label> <br />
              </div>

              <div id="Population">
                <h3>Population</h3>
                  <input type="checkbox" />
                  <label className="container"> &lt; 500,000 </label><br />
                  <input type="checkbox" />
                  <label className="container">500,000 - 2 million</label><br />
                  <input type="checkbox" />
                  <label className="container"> &gt; 2 million</label><br />
              </div>

              <div id="City">
                <h3>City</h3>
                  <input type="checkbox" />
                  <label className="container">Taipei</label> <br />
                  <input type="checkbox"  />
                  <label className="container">Taichung</label><br />
                  <input type="checkbox" />
                  <label className="container">Kaohsiung</label><br />
                  <input type="checkbox" />
                  <label className  ="container">Taoyuan</label><br />
              </div>    
              <iframe id="fullmap" src="https://www.google.com/maps/d/embed?mid=1H2WUKmQ8z5mXt6oaqKKXFFEvvH-6lybo&hl=en" width="200" height="300" className = "bigmap" title="Map of all school locations"></iframe>

            </div>

            <div className = "App">

              {this.state.appView ? 
                <div id = "gallery">
                  <h3>Find your school</h3>
                  {this.state.schools.map((obj, i) => 
                  <div key={i}>
                    <div className = "UniName" onClick={() => this.changeView(i) }>{obj.university}</div>
                    <div>{obj.center}</div>    
                  </div>     
                )}  
                </div>
                : 
                <School backToList={(i) => this.changeView(i)} school={this.state.schools[this.state.selectedSchoolIndex]}/>
              }
            </div>  

          </div>
      </div>  
    );
  }
}

export default App;
