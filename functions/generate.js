const fetch = require("node-fetch");
require('dotenv').config();

exports.handler = async function(event, context) {
    API_TOKEN = process.env.API_TOKEN;
    API_URL = process.env.API_URL;

    let input = JSON.parse(event.body).context;
    
    let data = {
        inputs: {
            text: input,
            generated_responses: [],
            past_user_inputs: []
        }, 
        options: {
            use_cache: false
        }
    }

    res = await fetch(API_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {"Authorization": "Bearer " + API_TOKEN},
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data == null) return {};

        return d.generated_text;
    })
    .catch( err => {
        return [];
    });

    if (res.length != 0) {
        return {
            statusCode: 200,
            body: JSON.stringify({res: res})
        };
    } else {
        return {
            statusCode: 500,
            body: JSON.stringify({error: res})
        }
    }
}