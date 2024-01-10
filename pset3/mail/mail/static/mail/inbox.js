document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // Add event listener for when the user submits the email form
  document.querySelector("#compose-form").addEventListener('submission', send_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#email-detail-view').style.display = 'none';
  

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}
function view_email(id){
  fetch(`/emails/${id}`)
.then(response => response.json())
.then(email => {
    // Print email
    console.log(email);

    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#email-detail-view').style.display = 'block';
    
    //Displaying the details of the email 
    document.querySelector('#email-detail-view').innerHTML = 
    <ul class="list-group">
       <li class="list-group-item"><strong>From:</strong> ${email.sender} </li>
       <li class="list-group-item"><strong>To:</strong> ${email.recipients} </li>
       <li class="list-group-item"><strong>Subject:</strong> ${email.subject} </li>
       <li class="list-group-item"><strong>Time-Stamp:</strong> ${email.timestamp} </li>
       <li class="list-group-item">${email.body}</li>
    </ul>
    
    // Change the email to read 
    if(email.read){
      fetch(`/emails/${email.id}`,{
        method:'PUT',
        body: JSON.stringify({
          read:true
        })
      })
    }
    //Archived/Unarchived logic
    const button_archived = document.createElement('button');
    button_archived.innerHTML = email.archived ? "Unarchived" : "Archive";
    // Setting different color buttons for archived/unarchived emails
    button_archived.className = email.archived ? "btn btn-success" : "btn btn-danger";
    button_archived.addEventListener('click', function() {
       fetch(`emails/${email.id}`,{
        method:'PUT',
        body: JSON.stringify({
          archived: !email.archived
        })
       })
      //  Redirect to load mailbox
       .then(() => {load_mailbox(`archive`)})
});
document.querySelector('#container').append(element);

// Reply Button
const button_reply = document.createElement(`button`);
button_reply.innerHTML = "Reply"
button_reply.className = "btn btn-info";
button_reply.addEventListener(`click`, function(){
  compose_email();

  document.querySelector('#compose-recipients').value = email_sender;
  //Overwriting the subject line to add "RE: "
  let subject = email.subject;
  if(subject.split('',1)[0] != "Re: "){
     subject = "Re: " + email.subject;
  }
  document.querySelector('#compose-subject').value = subject;
  document.querySelector('#compose-body').value = `On ${email.timestamp} ${email.sendor} wrote: ${email.body}`;
})
});

}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-detail-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // Get the emails for that mailbox and user 
  fetch(`/emails/${mailbox}`)
.then(response => response.json())
.then(emails => {
    // Loop through emails and create a div for each so it can show as a seperate box on the website (like in GMAIL)
    emails.forEach(singleEmail => {

      // Create a div for each email
      const newEmail = document.createElement('div');
      // Adding some bootstrap
      newEmail.className = "list-group-item";
      newEmail.innerHTML = `

        //  We are adding some HTML code to display in the sent inbox the emails we have received with time stamps,subject lines, and the senders
          <h6>Sender: ${singleEmail.sender}</h6>
          <h5>Subject: ${singleEmail.subject}</h5>
          <p>${singleEmail.timestamp}</p>

      // Changing the background color of the email if it is read/unread (if statement)
          newEmail.className = singleEmail.read ? 'read': 'unread';

      // Add a click event to view email 
      `
      newEmail.addEventListener('click', function(){
        view_email.email(singleEmail.id)
      });
});
document.querySelector('#emails-view').append(newEmail);
    });



function send_the_email(event){
  // The preventDefault method is used so you don't get redirected to another page 
  event.preventDefault();

  // Access the user's recipients, subject, and body of the email they have composed 
  const recipient = document.querySelector('#compose-recipients').value;
  const subject = document.querySelector('#compose-subject').value;
  const body = document.querySelector('#compose-body').value;

  // Send the data to our back-end 
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        recipients: recipients,
        subject: subject,
        body: body
    })
  })
  // This response will let us know if we were successful or not
  .then(response => response.json())
  .then(result => {
      // Print result
      console.log(result);
      load_mailbox('sent');
  });

}}
