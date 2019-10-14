import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ProgressBar from './progressBar';
import './progressbar.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      act: 0,
      index: '',
      datas: [],
      percentage: 1,
      progress: '',
      searchString: ''
    }

  }

  componentDidMount() {
    this.refs.search.focus();
    this.refs.name.focus();
    this.refs.startDate.focus();
    this.refs.releaseDate.focus();
    this.refs.description.focus();
  }

  handleChange() {
    this.setState({
      searchString: this.refs.search.value
    });
  }
  fSubmit = (e) => {


    e.preventDefault();

    let datas = this.state.datas;
    let name = this.refs.name.value;
    let startDate = this.refs.startDate.value;
    let releaseDate = this.refs.releaseDate.value;
    let description = this.refs.description.value;

    console.log(datas);

    if (this.state.act === 0) { //new
      let data = {
        name, startDate, releaseDate, description
      }

      datas.push(data);
    } else {                    //update
      let index = this.state.index;
      datas[index].name = name;
      datas[index].startDate = startDate;
      datas[index].releaseDate = releaseDate;
      datas[index].description = description;
    }

    this.setState({
      datas: datas
    });
    this.setState({
      progress: ((this.state.percentage === 0 ? 'UnRelease' : (this.state.percentage === 100 ? 'Released' : 'InProgress')))
    })
    this.refs.myForm.reset();
    this.refs.name.focus();
    this.refs.startDate.focus();
    this.refs.releaseDate.focus();
    this.refs.description.focus();
  }

  fRemove = (i) => {
    let datas = this.state.datas;
    datas.splice(i, 1);
    this.setState({
      datas: datas
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
    this.refs.startDate.focus();
    this.refs.releaseDate.focus();
    this.refs.description.focus();
  }

  fEdit = (i) => {
    let data = this.state.datas[i];
    this.refs.name.value = data.name;
    this.refs.startDate.value = data.startDate;
    this.refs.releaseDate.value = data.releaseDate;
    this.refs.description.value = data.description;

    this.setState({
      act: 1,
      index: i
    })

    this.refs.name.focus();
    this.refs.startDate.focus();
    this.refs.releaseDate.focus();
    this.refs.description.focus();
  }

render(){
  let datas = this.state.datas;
    console.log(datas)
    let _users = this.state.datas;
    let search = this.state.searchString.trim().toLowerCase();

    if (search.length > 0) {
      _users = _users.filter(function (user) {
        console.log(search)
        return (user.name.toLowerCase().match(search) || (user.description.toLowerCase().match(search))) ?
          user : null

        // if(user.project_title.toLowerCase().match(search)){
        //     return user}
      });
    }
    return (
      <div className="App">

  <div class="row">
            <div className="col-lg-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title"></h4>
                  <div className="table-responsive">
                   <h2>Releases</h2>
          <div className="search"><input style={{borderRadius:10}}
            type="text"
            value={this.state.searchString}
            ref="search"
            onChange={this.handleChange.bind(this)}
            placeholder="Search...."
          /></div><br></br>
                    <table className="table table-bordered">

  
                      <thead>
                        <tr>
                          <th>
                            Sno
                          </th>
                          <th>
                            Version Name
                          </th>
                          <th>
                            Stauts
                          </th>
                          <th>
                          Progress
                          </th>
                          <th>
                            Start Date
                          </th>
                          <th>
                           Release Date
                          </th>
                          <th>
                           Description
                          </th>
                          <th>
                          Action
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                      {_users.map((data, i) =>
                        <tr>
                          <td class="font-weight-medium">
                           {i+1}
                          </td>
                          <td>
                            {data.name}
                          </td>
                          <td>
                          <label class="badge badge-warning">{this.state.progress}</label>
                           
                          </td>
                          <td>
                          <div className="progress">
                            <ProgressBar/>
                            </div>
                          </td>
                          <td className="text-danger">
                            {data.startDate}
                          </td>
                          <td className="text-danger"> 
                          {data.releaseDate}
                          </td>
                          <td>
                          {data.description}
                          </td>
                          <td>
                          <button onClick={() => this.fRemove(i)} class="btn btn-danger btn-rounded btn-fw">Delete</button>
                            </td>
                            <td>
                            <button onClick={() => this.fEdit(i)} class="btn btn-primary btn-rounded btn-fw">Edit</button>
                            </td>
                        </tr>
                      )}
                      </tbody>
                    </table>
                    <form ref="myForm" className="myForm">    
          <input type="text" ref="name" placeholder="Version Name" className="input" />&nbsp;
          <input type="date" ref="startDate" placeholder="Start Date" className="input1" />&nbsp;
          <input type="date" ref="releaseDate" placeholder="Release Date" className="input1" />&nbsp;
          <input type="text" ref="description" placeholder="description" className="input1" />&nbsp;
          <Button onClick={(e) => this.fSubmit(e)} className="myButton">Add</Button>
        </form>
                  </div>
                </div>
              </div>
            </div>
          </div>




      </div>
    );
  }
}

export default App;
