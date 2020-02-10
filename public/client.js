$( document ).ready(function() {

  /*global io*/
  var socket = io();

  // Form submittion with new message in field with id 'm'
  $('form').submit(function(){
    var messageToSend = $('#m').val();
    //send message to server here?
    socket.emit('chat message', messageToSend);
    $('#m').val('');
    return false; // prevent form submit from refreshing page
  });

  socket.on('user', (data) => {
    $('#num-users').text(data.currentUsers+' user online');
    var message = data.name;
    if (data.connected) {
      message += ' has joined the chat.';
    } else {
      message += ' has left the chat.';
    }
    $('#messages').append($('<li>').html(message));
    console.log('update',  data);
  });

  socket.on('chat message', (data) => {
    let mes = data.name + ': ' + data.message;
    $('#messages').append($('<li>').html(mes));
  });


});
