const { CognitoIdentityProviderClient, AdminConfirmSignUpCommand } = require('@aws-sdk/client-cognito-identity-provider');
const apiVersion = '2016-04-18';


exports.redirect = async (request, context, callback) => {
    try {

        const client = new CognitoIdentityProviderClient({
            region: "eu-west-2",
            apiVersion
        });

        const confirmationCode = request.queryStringParameters.code;
        const username = request.queryStringParameters.username;
        const clientId = request.queryStringParameters.clientId;

        const params = {
            ClientId: clientId,
            ConfirmationCode: confirmationCode,
            Username: username
        };

        const command = new AdminConfirmSignUpCommand(params);
        await client.send(command);

        return redirectResponse('Redirect succesfully');
    } catch (err) {
        return err;
    }
};


const redirectResponse = (message) => ({
    statusCode: 302,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Expose-Headers': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
        Location: "https://uncloak.io"
    },
    body: JSON.stringify(message),
});