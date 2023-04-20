exports.customMessage = async (event, context, callback) => {
    if (event.triggerSource === 'CustomMessage_SignUp') {
        const { codeParameter } = event.request;
        const { userName, region } = event;
        const { clientId } = event.callerContext;
        const { email } = event.request.userAttributes;
        const link = `https://uncloak.io/redirect?code=${codeParameter}&username=${userName}&clientId=${clientId}&region=${region}&email=${email}`;
        event.response.emailSubject = 'Almost there! Confirm your account!';
        event.response.emailMessage = `<p style="text-align: center;">
        <a>
            You may style your message with some HTML 
        </a>
        </p>
        <div style="you may put styles also">
            Click the confirmation link below to confirm your account =)
            <a href=${link} style="any style you want">Click here!</a>
        </div>`
    }
    callback(null, event);
};