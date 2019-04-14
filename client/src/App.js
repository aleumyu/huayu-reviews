import React, { Component } from 'react';
import './App.css';
import School from "./School";
import 'bootstrap/dist/css/bootstrap.css';
import { futimes } from 'fs';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        checkBox: [
          {name: "location", value: "Northern", isChecked: false},
          {name: "location", value: "Eastern" , isChecked: false},
          {name: "location", value: "Southern" , isChecked: false},
          {name: "location", value: "Central" , isChecked: false},
          {name: "population", value: "_5" , isChecked: false},
          {name: "population", value: "5_20", isChecked: false},
          {name: "population", value: "20_", isChecked: false},
          {name: "city", value: "Taipei", isChecked: false},
          {name: "city", value: "Taichung", isChecked: false},
          {name: "city", value: "Kaohsiung", isChecked: false},
          {name: "city", value: "Taoyuan", isChecked: false},
        ],
        appView: true,
        schools: [],
        selectedSchoolIndex: "", 
        
      };
  }

  componentDidMount() {
    fetch("http://localhost:9000/api/v1/schools/")
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

  updateFilter(event) {
    let checkBox = this.state.checkBox;
    checkBox.forEach(e => {
      if (e.value === event.target.value) {
        e.isChecked = event.target.checked;
      }
    })

    this.setState ({
      checkBox: checkBox
    });

    /*
    let locParam = "location=";
    let popParam = "population=";
    let cityParam = "city=";
    checkBox.forEach( e => {
      if (e.name === "location" && e.isChecked) {
        locParam += `${e.value}`;
      } else if (e.name === "population" && e.isChecked) {
        popParam += `${e.value}`;
      } else if (e.name === "city" && e.isChecked) {
        cityParam += `${e.value}`
        console.log(cityParam);
      }
    })
    */

    let loc = [];
    let locParam = "";
    let pop = [];
    let popParam = "";
    let city = [];
    let cityParam = ""
  
    checkBox.forEach( e => {
      if (e.name === "location" && e.isChecked) {
        loc.push(`${e.value}`);
        locParam = loc.join(',');    
      } else if (e.name === "population" && e.isChecked) {
        pop.push(`${e.value}`);
        popParam = pop.join(','); 
      } else if (e.name === "city" && e.isChecked) {
        city.push(`${e.value}`);
        cityParam = city.join(',');
      }
    })

    fetch(`http://localhost:9000/api/v1/schools?location=${locParam}&population=${popParam}&city=${cityParam}`)
      .then(results => {
        if (!results.ok) {
          throw Error(results.statusText);
        }
        return results.json();
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
      <div>
        {console.log(this.state.schools)}
        <header>
          <div className="jumbotron" id="hero"> 
           
              <div className="container align-items-center align-content-center" id="hero-text">
                <div className="row align-items-center">
                  <div className="col-md-3 col-sm-3 col-xs-3 font-weight-bold text-right align-self-center">
                    <h1>HUAYU <br /> Reviews</h1>
                  </div>
                  <div className="col-md-9 col-sm-9 col-xs-9 font-weight-bold text-left border-left border-white align-self-center">
                    <p className="">Explore Taiwanese universities related to the HUAYU Enrichment Scholarship. Help others and <br /> leave a review of your experience!</p>
                  </div>
                </div>
              </div>
           
          </div>
        </header>

        <main>
          <div className="container">  
            <div className="row" id="checklist">
              <div className="col-md-3 col-sm-3 col-xs-3">
                <div id="Location">
                    <h4 className="font-weight-bold mt-3">Location</h4>
                      <input type="checkbox" value="Northern" onChange = {(e) => this.updateFilter(e)}/>
                      <label className="checkbox-inline pl-2">Northern</label> <br />
                      <input type="checkbox" value="Southern" onChange = {(e) => this.updateFilter(e)}/>
                      <label className="checkbox-inline pl-2">Southern</label> <br />
                      <input type="checkbox" value="Eastern" onChange = {(e) => this.updateFilter(e)}/>
                      <label className="checkbox-inline pl-2">Eastern</label> <br />
                      <input type="checkbox" value="Central" onChange = {(e) => this.updateFilter(e)}/>
                      <label className="checkbox-inline pl-2">Central</label> <br />
                </div>
                <div id="Population">
                  <h4 className="font-weight-bold mt-4">Population</h4>
                    <input type="checkbox" value="_5" onChange = {(e) => this.updateFilter(e)} />
                    <label className="checkbox-inline pl-2"> &lt; 500,000 </label><br />
                    <input type="checkbox" value="5_20" onChange = {(e) => this.updateFilter(e)}/>
                    <label className="checkbox-inline pl-2">500,000 - 2 million</label><br />
                    <input type="checkbox" value="20_" onChange = {(e) => this.updateFilter(e)}/>
                    <label className="checkbox-inline pl-2"> &gt; 2 million</label><br />
                </div>
                <div id="City">
                  <h4 className="font-weight-bold mt-4">City</h4>
                    <input type="checkbox" value="Taipei" onChange = {(e) => this.updateFilter(e)}/>
                    <label className="checkbox-inline pl-2">Taipei</label> <br />
                    <input type="checkbox" value="Taichung" onChange = {(e) => this.updateFilter(e)}  />
                    <label className="checkbox-inline pl-2">Taichung</label><br />
                    <input type="checkbox" value="Kaohsiung" onChange = {(e) => this.updateFilter(e)}/>
                    <label className="checkbox-inline pl-2">Kaohsiung</label><br />
                    <input type="checkbox" value="Taoyuan" onChange = {(e) => this.updateFilter(e)}/>
                    <label className  ="checkbox-inline pl-2">Taoyuan</label><br />
                </div>    
                <iframe id="fullmap" src="https://www.google.com/maps/d/embed?mid=1H2WUKmQ8z5mXt6oaqKKXFFEvvH-6lybo&hl=en" width="200" height="300" className = "bigmap" title="Map of all school locations"></iframe>
              </div>
            

              <div id="App" className="col-md-9 col-sm-9 col-xs-9 ">
                  <h2 className="font-weight-bold text-center mt-3 mb-4 ml-3 bg-dark text-white rounded">Find Your School</h2>
                  {this.state.appView ? 
                    <div className="container ">
                      <div className="row">
                        {this.state.schools.map((obj, i) => 
                          <div className="col-md-4" key={i}>
                            <img className="rounded" src="http://www.unesco.vg/iau/wp-content/uploads/2017/10/44.jpg"></img>
                            <div className = "UniName" onClick={() => this.changeView(i) }>{obj.university}</div>
                            <div>{obj.center}</div>    
                          </div>     
                        )}  
                      </div>
                    </div>
                    : 
                    <School backToList={(i) => this.changeView(i)} school={this.state.schools[this.state.selectedSchoolIndex]}/>
                  }
              </div>  
              
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
