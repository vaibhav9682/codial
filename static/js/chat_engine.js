class ChatEngine {
    constructor(chatBoxId, userEmail) {
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000')

        if (this.userEmail) {
            this.connectionHandler();
        }
    }


    connectionHandler() {

        let self = this;

        this.socket.on('connect', function () {
            console.log('connection established using socket')

            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            })

            self.socket.on('user_joined', function (data) {
                console.log('a user joined', data)
            })

        })


        // send a message on click

        $('#submit-btn').click(function () {

            let msg = $('#text-field').val();

            if (msg != '') {

                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                })
            }

        })

        self.socket.on('recieve_message', function (data) {
            console.log('message recieved', data.message)




            let newmessage = $('<li>');
            let messageType = 'other-message';

            if (data.user_email == self.userEmail) {
                messageType = 'self-message'
            }

            newmessage.append($('<span>').html(data.message))

            // newmessage.append($('<sub>').html(data.user_email))

            newmessage.addClass(messageType);
            console.log(newmessage)
            $('#chat-content').append(newmessage)
            $('#text-field').val('')
        })
    }

}