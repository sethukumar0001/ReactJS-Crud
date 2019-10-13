import React, { Component } from 'react';
import ProgressBar from './progressBar'


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

  render() {
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

        <form ref="myForm" className="myForm">
          <div><input
            type="text"
            value={this.state.searchString}
            ref="search"
            onChange={this.handleChange.bind(this)}
            placeholder="Search...."
          /></div>
          <input type="text" ref="name" placeholder="your name" className="formField" />&nbsp;
          <input type="date" ref="startDate" placeholder="Start Date" className="formField" />&nbsp;
          <input type="date" ref="releaseDate" placeholder="Release Date" className="formField" />&nbsp;
          <input type="text" ref="description" placeholder="description" className="formField" />&nbsp;
          <button onClick={(e) => this.fSubmit(e)} className="myButton">Add</button>
        </form>

        {_users.map((data, i) =>
          <li>
            {i + 1}
            {data.name}
            <ProgressBar percentage={this.state.percentage} />
            {this.state.progress}
            {data.startDate}
            {data.releaseDate}
            {data.description}


            <button onClick={() => this.fRemove(i)} className="myListButton">Delete</button>
            <button onClick={() => this.fEdit(i)} className="myListButton">Edit</button>
          </li>

        )}




      </div>
    );
  }
}

export default App;
