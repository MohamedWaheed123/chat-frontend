import React, { Component } from 'react';
import './App.css';
import Message from './components/Msg/msg';
import Input from './components/Input/input';
import UpperDiv from './components/UpperDiv/upperdiv';
import Register from './components/Register/register';
import SignIn from './components/SignIn/signin';
import Cookies from 'js-cookie';



class App extends Component {

  constructor() {
    super()
    this.state = {
     
      index: 0,
      repliedMsgIndex:undefined,
      edit: false,
      reply:false,
      route: 'signin',
      isSignedIn: false,
      msgs:[],
      signedUser:{}

    }
  }

  componentDidMount() {
   
    fetch('http://localhost:3000/getMessages',{
      method:'get',
      headers:{'Content-Type':'application/json'},
      
    }).then(response=>response.json()).then(msgs=>{
     
        this.setState({msgs:msgs})
      
     
        console.log('afaashtak')
     
    })
    const loggedUserCookies = Cookies.getJSON('loggedUser');
    console.log(loggedUserCookies);
    if ('logged user',loggedUserCookies) {
      this.setState({ route: 'home', signedUser: loggedUserCookies,isSignedIn: true  })
    }
    else{
      console.log('cookies fail');
      
    }
  }

  componentDidUpdate(prevState, prevProps) {

    console.log("did update", this.state)

    
  }

  loadUser=(user)=>{
    this.setState({signedUser:user})

  }
  deleteMsg(index, e) {

    const id = this.state.msgs[index].msgid;



    fetch('http://localhost:3000/deleteMessage',{
      method:'delete',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        id:id
      })
    }).then(response=>response.json()).then(res=>{
      if(res==='deleted succefully'){
      
        const msgs = Object.assign([], this.state.msgs);
        msgs.splice(index, 1);
        this.setState({ msgs: msgs });

      }
    }).catch(err=>console.log(err))
    
    


  }
  async setIndex(msg, Index) {

    const editTextBox = document.getElementById('editMsg')
    editTextBox.value = msg

    await this.setState({ index: Index, edit: true })
    console.log('set index', this.state.index)


  }
  onRouteChange =(route)=>{
    if (route === 'signout') {
      this.setState({isSignedIn:false})
    }
    else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({route:route})
  }
  
  updateMsg = (newMsg) => {


    

    const index = this.state.index;
   
    const msg = Object.assign({}, this.state.msgs[index]);

   const editedMsg = newMsg;
   const id=msg.msgid;


    fetch('http://localhost:3000/editMessage',{
          method:'put',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
           id:id ,
           editedMsg:editedMsg
        
          })
        }).then(response=>response.json()).then(res=>{
          if(res==='edited succefully'){
           
            msg.msg = newMsg;
            const msgs = Object.assign([], this.state.msgs);
            msgs[index] = msg;
        
           
            const editTextBox = document.getElementById('editMsg')
            editTextBox.value = ""
        
            this.setState({ msgs: msgs, edit: false});

          }
        }).catch(err=>console.log(err))
        

    

  }
  addNewMsg = (msg) => {


   
    if(msg!=='')
    {

      const msgid = new Date()+this.state.signedUser.id;
      const date=new Date();
      const userid = this.state.signedUser.id;
      const message = msg;
      const repliedMsgText=null;
      const repliedMsgUser=null;
      const repliedUserColor=null;
   
       fetch('http://localhost:3000/addMessage',{
         method:'post',
         headers:{'Content-Type':'application/json'},
         body:JSON.stringify({
           msgid:msgid,
           date:date,
           userid:userid,
           msg:message,
           repliedMsgText:repliedMsgText,
           repliedMsgUser:repliedMsgUser,
           repliedUserColor:repliedUserColor
   
   
         })
       }).then(response=>response.json()).then(res=>{
         if(res==='inserted succefully'){
          
           let msgs = Object.assign([], this.state.msgs);
           
           let obj = { 'id':userid,'name':this.state.signedUser.name,'color':this.state.signedUser.color,
            'msgid':msgid,'msg':message,'date':date,'userid':userid,'repliedMsgText':repliedMsgText,'repliedMsgUser':repliedMsgUser};
           msgs.push(obj);
           const editTextBox = document.getElementById('editMsg')
           editTextBox.value = ""
       
           this.setState({ msgs: msgs });
   
         
         }
         else {
           console.log('error el add')
         }
       }).catch(err => console.log(err));
    }






   

  }
  async setRepliedMsgIndex(userId,index)
  {
    const editTextBox = document.getElementById('editMsg')
    editTextBox.value = `@${userId}`

    await this.setState({ repliedMsgIndex: index,reply:true})
    
  }
   
   cancelReply=()=>
  {
   

     this.setState({reply:false})
    
  }
  addReply=(reply)=>
  {

    
   
    const msgid = new Date()+this.state.signedUser.id;
   const date=new Date();
   const userid = this.state.signedUser.id;
   const message = reply;
   const repliedMsg = Object.assign({}, this.state.msgs[this.state.repliedMsgIndex]);
   const repliedMsgText=repliedMsg.msg;
    const repliedMsgUser=repliedMsg.name;
    const repliedUserColor=repliedMsg.color;

    console.log('reply',reply);
   
    
    

    if(reply!=='')
    {

    
    fetch('http://localhost:3000/addMessage',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        msgid:msgid,
        date:date,
        userid:userid,
        msg:message,
        repliedMsgText:repliedMsgText,
        repliedMsgUser:repliedMsgUser,
        repliedUserColor:repliedUserColor


      })
    }).then(response=>response.json()).then(res=>{
      if(res==='inserted succefully'){
       
        let msgs = Object.assign([], this.state.msgs);
        
        let obj = { 'id':userid,'name':this.state.signedUser.name,'color':this.state.signedUser.color,
         'msgid':msgid,'msg':message,'date':date,'userid':userid,'repliedMsgText':repliedMsgText,'repliedMsgUser':repliedMsgUser,'repliedUserColor':repliedUserColor};
        msgs.push(obj);
        const editTextBox = document.getElementById('editMsg')
        editTextBox.value = ""
    
        this.setState({ msgs: msgs,reply:false });

      
      }
      else {
        console.log('error el repy')
      }
    }).catch(err => console.log(err));


    }

    



  }

  render() {
    return (

      
       
       

       <div className='mainDiv'>
             <UpperDiv onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
            { this.state.route ==='home'?

          <div>
       
        <div className="msgs-position" >
        {this.state.msgs.map((msg, index) =>

          <Message 

            setRepliedMsgIndex={this.setRepliedMsgIndex.bind(this,msg.name,index)}
           
            userId={this.state.signedUser.id}
            setIndex={this.setIndex.bind(this, msg.msg, index)}
            
            key={msg.msgid}
            delEvent={this.deleteMsg.bind(this, index)}
            msg={msg.msg}
            msgUserId={msg.userid}
            msgUserName={msg.name}
            msgUserColor={msg.color}
            repliedMsgText={msg.repliedMsgText}
            repliedMsgUser={msg.repliedMsgUser}
            repliedUserColor={msg.repliedUserColor}
            />)}
         </div>
             
        <Input cancelReply={this.cancelReply} addNewMsg={this.addNewMsg} updateMsg={this.updateMsg} addReply={this.addReply} edit={this.state.edit} reply={this.state.reply} />
        </div>:
        (this.state.route === 'signin' ?  <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>)
       
        }

      </div>

    );
  }

}

export default App;
