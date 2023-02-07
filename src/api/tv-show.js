import axios from "axios";
import { API_KEY, BASE_URL } from "../config";

export class TVShowAPI {
  static async fetchPopularShows() {
    const response = await axios.get(`${BASE_URL}tv/popular${API_KEY}`);
    return response.data.results;
  }
}
