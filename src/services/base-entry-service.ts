import axios, { AxiosError, AxiosInstance } from 'axios';
import { BaseEntry } from '../utilites/base-entry';

export abstract class BaseEntryService<T extends BaseEntry> {
    protected readonly instance: AxiosInstance;

    constructor(url: string) {
        this.instance = axios.create({
            baseURL: url,
            timeout: 30000
        });
    }

    getAllEntries = async() => this.instance.get<T[]>("/")
        .then((res) => res.data).catch((err) => console.log(err))

    getEntryById = async(id: string) => this.instance.get<T>(`/${id}`)
        .then((res) => res.data)
        .catch((err: AxiosError) => {
            if(err.response!.status === 404) {
                return null;
            }
            console.log(err);
        });

    createEntry = async(entry: T) => this.instance.post<T>("/", entry)
        .then((res) => res.data).catch((err) => console.log(err))
    
    updateEntry = async(id: string, entry: T) => this.instance.put(`/${id}`, entry)
        .catch((err) => console.log(err))

    deleteEntry = async(id: string) => this.instance.delete(`/${id}`)
        .catch((err) => console.log(err))
}
