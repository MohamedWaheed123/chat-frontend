import React, { Component } from 'react';
import './input.css';

class Input extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            editedMsg:"",
            newMsg:"",
            replyMsg:""
           
        }
    }
    seteditedMsg=(event)=> {

        this.props.edit ?
        this.setState({editedMsg:event.target.value}):
        this.setState({newMsg:event.target.value})

    }
    updateMsg=()=> {
        if(this.props.edit)
        {
            const msg = this.state.editedMsg
            this.props.updateMsg(msg);
        }
        else{
            const msg = this.state.newMsg
            this.props.addNewMsg(msg);
        }
    
    }
    setRepliedMsg=(event)=>{
        this.setState({replyMsg:event.target.value})

    }
    sendRepliedMsg=()=>{
        const repliedMsg=this.state.replyMsg
        this.props.addReply(repliedMsg)
    }
    


    render(){

        return(
           <div  className='inputDiv'>



              
              <button className='cancelButton' onClick={this.props.cancelReply}>cancel reply</button>

               <input placeholder="Type a message"   className='input' onChange={ this.props.reply? this.setRepliedMsg: this.seteditedMsg} name="editMsg" id="editMsg"  type="text" defaultValue="" /> 
               {<button className='sendButton' onClick={this.props.reply?this.sendRepliedMsg: this.updateMsg}> </button>}
               {/* {this.props.edit?"edit":"send"} */}
           </div>
        );
    }
   

}
export default Input;