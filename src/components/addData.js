import React, { Component } from 'react';


class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      act: 0,
      index: '',
      datas: []
    }
  }

  componentDidMount(){
    this.refs.name.focus();
    this.refs.startDate.focus();
    this.refs.releaseDate.focus();
    this.refs.description.focus();
  }

  fSubmit = (e) =>{
    e.preventDefault();

    let datas = this.state.datas;
    let name = this.refs.name.value;
    let startDate = this.refs.startDate.value;
    let releaseDate = this.refs.releaseDate.value;
    let description = this.refs.description.value;

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

    this.refs.myForm.reset();
    this.refs.name.focus();
    this.refs.startDate.focus();
    this.refs.releaseDate.focus();
    this.refs.description.focus();
  }

  fRemove = (i) => {
    let datas  = this.state.datas;
    datas.splice(i,1);
    this.setState({
      datas:datas
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
    return (
      <div className="App">
        <form ref="myForm" className="myForm">
          <input type="text" ref="name" placeholder="your name" className="formField" />&nbsp;
          <input type="date" ref="startDate" placeholder="Start Date" className="formField" />&nbsp;
          <input type="date" ref="releaseDate" placeholder="Release Date" className="formField" />&nbsp;
          <input type="text" ref="description" placeholder="description" className="formField" />&nbsp;
          <button onClick={(e)=>this.fSubmit(e)} className="myButton">Add</button>
        </form>
        
              <table>
                <th>
                  <td>sno</td>
                  <td>Versionname</td>
                  <td>Status</td>
                  <td>Progress</td>
                  <td>Startdate</td>
                  <td>Releasedate</td>
                  <td>Description</td>
                  <td>Action</td>
                </th>
                {datas.map((data, i) =>
            
                <tbody>
                  <td>{i+1}</td>
                  <td>{data.name}</td>
                  <td></td>
                  <td></td>
                  <td>{data.startDate}</td>
                  <td>{data.releaseDate}</td>
                  <td>{data.description}</td>

             
              <button onClick={()=>this.fRemove(i)} className="myListButton">Delete</button>
              <button onClick={()=>this.fEdit(i)} className="myListButton">Edit</button>

              </tbody>
             
              )}
              </table>
         
       
 
      </div>
    );
  }
}

export default App;
