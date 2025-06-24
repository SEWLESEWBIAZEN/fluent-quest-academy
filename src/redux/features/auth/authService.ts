import axios from 'axios'
export const BAKEND_URL = process.env.REACT_APP_API_URL


export const create_update_user = async()=>{
    return(
        await axios.post(`${BAKEND_URL}/create-user`,null, {
            headers:{
                authtoken:"eyJhbGciOiJSUzI1NiIsImtpZCI6IjNiZjA1MzkxMzk2OTEzYTc4ZWM4MGY0MjcwMzM4NjM2NDA2MTBhZGMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmx1ZW50LXF1ZXN0LWFjYWRlbXkiLCJhdWQiOiJmbHVlbnQtcXVlc3QtYWNhZGVteSIsImF1dGhfdGltZSI6MTc1MDY4MzM5NCwidXNlcl9pZCI6IjI1dzV2UXcwZjhmaDhHZFVROFhJb1RuS3c1TzIiLCJzdWIiOiIyNXc1dlF3MGY4Zmg4R2RVUThYSW9Ubkt3NU8yIiwiaWF0IjoxNzUwNjgzMzk0LCJleHAiOjE3NTA2ODY5OTQsImVtYWlsIjoic2V3bGVzZXdiaWF6ZW42NUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsic2V3bGVzZXdiaWF6ZW42NUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.kak8HuxVjgtYcSoH5F98hG5Q9OGhrvISXnRQdmkuJCRm6uJn5E1pQP7mEtnbQzxTE6IKW2RCOFVTUEyvXgl6421jHsw9qOXH4BJucPE7UfRLabZFhLGF50sjLMtdh_4bxneRvelHbnOOAkMfu3xDWhFuNr_T1YSwRzLpRA7KWPmx-4W7AkJg6vxlp6i9_gg0ozbNMJnISr-Y6RD6GAIV-RgXwJUGI_ErrmgQGeWjF94DtKaVj9PQ-UDnNWL1wfKiDuStRiFCvqXxSHJ4ngR8ewwlvqF-4v1eB3IzjN_QJemtPrE-Gh-ojOYQy4fvUrcOTMbwDYWpJ6gSQAuloc4FjA"
            }
        })
    )
}
