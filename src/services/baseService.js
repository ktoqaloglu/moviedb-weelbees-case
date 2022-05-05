import { API_URL } from "./config"

export const baseService = {
    get: async (url) => {
        let response = [];
        await fetch(API_URL+url, {

        })
            .then((res) => res.json())
            .then((data) => {
                response = data
            })
        return response;
    }
  }
