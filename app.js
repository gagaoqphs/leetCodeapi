const express = require('express');
const fetch = require("cross-fetch");
const app = express();

const port = process.env.PORT || 3000;

app.get('/:username',async (req,resp)=>{
        
        try{
            const LEETCODE_API_ENDPOINT = 'https://leetcode.com/graphql'
            const DAILY_CODING_CHALLENGE_QUERY = `
                {    
                    allQuestionsCount { difficulty count }
                        matchedUser(username: "${req.params.username}") {
                                    username
                                    contributions { points }
                                    profile { reputation ranking }
                                    submitStats  {
                                    acSubmissionNum { difficulty count submissions } 
                        }
                    }
                }
                `
        
                const init = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: DAILY_CODING_CHALLENGE_QUERY }),
                }
            
                const response = await fetch(LEETCODE_API_ENDPOINT, init)
                const data = await response.json()

            const obj = 
            {
                "status": "success",
                "totalSolved": data['data']['matchedUser']['submitStats']['acSubmissionNum'][0]['count'],
                "totalQuestions": data['data']['allQuestionsCount'][0]['count'],
                "easySolved": data['data']['matchedUser']['submitStats']['acSubmissionNum'][1]['count'],
                "totalEasy": data['data']['allQuestionsCount'][1]['count'],
                "mediumSolved": data['data']['matchedUser']['submitStats']['acSubmissionNum'][2]['count'],
                "totalMedium": data['data']['allQuestionsCount'][2]['count'],
                "hardSolved": data['data']['matchedUser']['submitStats']['acSubmissionNum'][3]['count'],
                "totalHard": data['data']['allQuestionsCount'][3]['count'],
                "ranking": data['data']['matchedUser']['profile']['ranking'],
                "contributionPoints": data['data']['matchedUser']['contributions']['points'],
                "reputation": data['data']['matchedUser']['profile']['reputation'],
            }
            resp.json(obj)
        }
        catch(e){
            console.log(e)
        }
        
    //    resp.status(200).json(obj);

    // const test = async () =>{
    //     console.log("test")
    //     const temp = await fetchDailyCodingChallenge()

    //     obj = {
    //         total : `${temp['data']['matchedUser']['submitStats']['acSubmissionNum'][0]['count']}`
    //     }
        
    //     console.log(`${temp['data']['matchedUser']['submitStats']['acSubmissionNum'][0]['count']}`);
    // }

    // await resp.status(200);
    //     fetchDailyCodingChallenge().then((e)=>{

    //     obj = 
    //     {
    //         "status": "success",
    //         "totalSolved": `${e['data']['matchedUser']['submitStats']['acSubmissionNum'][0]['count']}`,
    //         "totalQuestions": 1735,
    //         "easySolved": 146,
    //         "totalEasy": 458,
    //         "mediumSolved": 196,
    //         "totalMedium": 904,
    //         "hardSolved": 21,
    //         "totalHard": 368,
    //         "acceptanceRate": 50.92,
    //         "ranking": 47657,
    //         "contributionPoints": 2534,
    //         "reputation": 1,
    //     }
})

app.listen(port,()=>{
    console.log(`Working ${port}`);
})



