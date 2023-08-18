import { useEffect, useState,useCallback } from 'react'
import './Mail.css'
import { Route ,Routes,Link } from 'react-router-dom'
import Viewmail from './Viewmail'
import { CopyToClipboard } from 'react-copy-to-clipboard';
const Mail = (props) => {
    const [newmailreq , SetNewmailreq] = useState(false)
    const [mailcopied ,setCopied ] = useState(false)
    const [mailname , Setmailname] = useState('')
    const [Domainname , SetDomainname] = useState('')
    const [Nameofemail , SetNameofEmail] = useState('')
    const [mailmessags , Setmailmessage] = useState([])
    const newmail= useCallback(() => {
        fetch("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
        .then(response => response.text())
        .then(msg => {
            localStorage.setItem('mailname',msg.replace(/[\[\]"]/g,''))
            localStorage.setItem('Domainname',String(localStorage.getItem('mailname')).split('@')[1])
            localStorage.setItem('Nameofemail',String(localStorage.getItem('mailname')).split('@')[0])
            /* Setmailname(msg.replace(/[\[\]"]/g,''))
            SetDomainname(mailname.split('@')[1])
            SetNameofEmail(mailname.split('@')[0]) */
        })
        .catch(Setmailname("Sorry some error occuried"),err => console.log(err))
    })
    const Emailmessages = (Nameofemail,Domainname) => {
        fetch(`https://www.1secmail.com/api/v1/?action=getMessages&login=${Nameofemail}&domain=${Domainname}`)
        .then(responce2 => responce2.json())
        .then(msg => {
            Setmailmessage(msg)
        })
        .catch('error => console.log(error.message)')
    }
    const handleCopy = (e) => {
        e.preventDefault()
        setCopied(true);
        setTimeout(() => setCopied(false), 1500); // Reset the copied state after 1.5 seconds
      }
      
    const handlenemail = (e) => {
        e.preventDefault()
        SetNewmailreq(true)
        setTimeout(() => SetNewmailreq(false), 1500)};
    console.log(newmailreq)
    useEffect(() => {
            (newmailreq)&&(newmail())
        
        {
            Setmailname(String(localStorage.getItem('mailname')))
            SetDomainname(localStorage.getItem('Domainname'))
            SetNameofEmail(localStorage.getItem('Nameofemail')) 
        }
      },[newmailreq]);
useEffect(() => {Emailmessages(Nameofemail,Domainname)})
    return(
        <>
        
        <div className='Mailgen'>
            <form className='form-details'>
                <label> Email 
                </label>
                
                <input type='text' value={mailname} disabled/>
                <CopyToClipboard text={mailname}>
        <button onClick={(e)=>handleCopy(e)}>{(mailcopied)?'Copied':'Copy'}</button>
      </CopyToClipboard>
                <button>Refress</button>
                <button onClick={(e) => handlenemail(e)}>New Email</button>

            </form>
            <div className='table-view'>
                {
    (true)?<table border="1">
    <thead>
        <tr>
        <th>Mail ID</th>
        <th>From</th>
        <th>Subject</th>
        <th>Date</th>
        <th>Options</th>
        </tr>
    </thead>
    <tbody>
        {
            mailmessags.map((ele , index) => {
                return(
                    <tr key={index} className='heee'>
            <td>{ele.id}</td>
            <td>{ele.from}</td>
            <td>{ele.subject}</td>
            <td>{ele.date}</td>
            <td><Link to='mailview'><button value={ele.id}onClick={(e) => props.mailid(e.target.value,Domainname,Nameofemail)}>View</button></Link></td>
        </tr>
                )
            })
        }
    </tbody>
</table>:
<h1>No Messages</h1>
                }
            </div>
        </div>
        </>
    )

}

export default Mail