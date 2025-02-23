import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types/types";
const baseUrl = "http://localhost:3000/api/diaries";

const getAll = () => {
    const request = axios.get<DiaryEntry[]>(baseUrl);
    return request.then(response => response.data);
};

const addEntry = async (newEntry: NewDiaryEntry) => {
    const request = axios.post<DiaryEntry>(baseUrl, newEntry);
    return request.then(response => response.data);
};

export default { getAll, addEntry };