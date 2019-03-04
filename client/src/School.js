import React, { Component } from 'react';
import './School.css';
import 'bootstrap/dist/css/bootstrap.css';


const URL = "https://api.openweathermap.org/data/2.5";
const KEY = "7a0d513132cd8c781cca0a8440eb61bb";



class School extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user_id: "",
        created_at: "",
        title: "",
        start_date: "",
        end_date: "",
        likes: "",
        dislikes: "",
        city_impression: "",
        general_review: "",
        school: "",
        weather: null,
        location: "",
        reviews: []
      }
    } 

    componentDidMount() {
      this.setState ({
        school: this.props.school, // no puedes definirlo en state? o no puedes hacer sin esto?
      });
      fetch(`http://localhost:9000/api/v1/schools/${this.props.school.id}/reviews`)
        .then(res => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          return res.json();
        })
        .then(json => {
          this.setState ({
            reviews: json
          });
        })
        .catch(error => {
          console.log(error)
        })
    }

    getWeather() {
      // console.log("weathersuccess")
      let url = `${URL}/weather?q=${this.state.school.city}&APPID=${KEY}`;
      fetch (url)
      .then(response => {
        if (!response.ok) {
          this.setState({
            weather: "Sorry, cannot find city name"
          })
          throw Error(response.statusText);

        }
        return response.json();
      })
      .then(json => {
        console.log(json);
        this.setState({
          weather: (json.main.temp - 273.15).toFixed(0) +"℃, " + json.weather[0].main,
        });
      })
      .catch(error => {
          console.log(error);
          return ("Sorry, cannot find city name");
      })
    }

  
  updateInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      time_input: event.timeStamp 
    });
  }


  addReview(e) {
    e.preventDefault();
    let newReview = {
      user_id: this.state.user_id,
      school_id: this.state.school.id,
      created_at: this.state.time_input,
      title: this.state.title,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      likes: this.state.likes,
      dislikes: this.state.dislikes,
      city_impression: this.state.city_impression,
      general_review: this.state.general_review
    }
    fetch("http://localhost:9000/api/v1/schools/reviews", {
      method: "POST", 
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview) 
    })
    .then (res => { 
      if (!res.ok) {
        throw Error(res.statusText);
      }
      this.setState ({
        reviews: [...this.state.reviews, newReview],
      });
    })
    .catch(error => {
      console.log(error)
    });
  }
  
  render() {
    return (
      <div id="School">
        <div className="container">
          <button className= "back" onClick={this.props.backToList}> Back to all schools</button>   

          <div className="school-info">
            <h2>{this.state.school.university}</h2>
            <p>{this.state.school.center}</p>
            <h3>{this.state.school.city}</h3>
            <div className="weather">
              <p>The current weather in {this.state.school.city} is: {this.state.weather}.</p>
              <button onClick={() => this.getWeather()}>Go!</button>
          </div>
          </div>
          <div className="map">
            <iframe title = "School Location" src= {this.state.school.map} ></iframe>
          </div>
        </div>

        <div className="container">
          <div id = "reviews">
              {this.state.reviews.map((obj, i) => 
                <div key={i}>    
                  <h5>{obj.title}</h5>
                  <p className="small">User: {this.state.reviews.user_id}</p>
                  <p className ="small"> Post date:{obj.created_at}</p>
                  <p className="small">Program start date:{obj.start_date}</p> 
                  <p className ="small">End date: {obj.end_date}</p>
                  <p>Overall Review: {obj.general_review}</p> 
                  <p>Likes: {obj.likes}</p> 
                  <p>Dislikes: {obj.dislikes}</p> 
                  <p>Impression of the city: {obj.city_impression}</p>
                </div>     
              )}  
            </div>
          </div>

          <div className="container" id="reviewform">
            <div className ="formheading">Please leave a review of your experience</div>
              <form>
                <label>Name</label>
                <input name="user_id" type="text" value= {this.state.user_id} placeholder="Your name.." onChange={this.updateInput}></input><br />

              {/*}
              *** how to attach school ID to this review?? <br/>
                
                *** how to create timestamp to this review?? <br/>
              */}

                <label>Headline</label> <br/>
                <input name="title" type="text" value={this.state.title} placeholder = "The time of my life!" onChange={this.updateInput}></input><br />
                
                <label>Program Start</label>
                <input name="start_date" type="date" value={this.state.start_date} onChange={this.updateInput}></input> 

                <label>Program End</label>
                <input name="end_date" type="date" value={this.state.end_date} onChange={this.updateInput}></input><br />

                <label>Likes</label> <br />
                <input name="likes" type="text" value={this.state.likes} onChange={this.updateInput}></input><br />
                
                <label>Dislikes</label> <br />
                <input name="dislikes" type="text" value={this.state.dislikes} onChange={this.updateInput}></input><br />
          
                <label>Overall impression of the city</label> <br />
                <input name="city_impression" type="text" value={this.state.city_impression} onChange={this.updateInput}></input><br />
                          
                <label>Overall review</label> <br />
                <input name="general_review" type="text" value={this.state.general_review} onChange={this.updateInput}></input><br />
                
                <input type="submit" value="Submit" onClick={(e) => this.addReview(e)}></input>
              </form>
            
          </div>    

      </div>
    );
  }
}

export default School;
