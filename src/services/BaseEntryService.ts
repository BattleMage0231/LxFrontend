import axios, { AxiosError, AxiosInstance } from 'axios';
import { BaseEntry } from '../utilites/BaseEntry';

export abstract class BaseEntryService<T extends BaseEntry> {
    protected readonly instance: AxiosInstance;

    constructor(url: string) {
        this.instance = axios.create({
            baseURL: url,
            timeout: 30000
        });
    }

    getAllEntries = async() => this.instance.get<T[]>("/")
        .then((res) => res.data).catch(console.log)

    getEntryById = async(id: string) => this.instance.get<T>(`/${id}`)
        .then((res) => res.data)
        .catch((err: AxiosError) => {
            if(err.response!.status === 404) {
                return null;
            }
            console.log(err);
        });

    createEntry = async(entry: T) => this.instance.post<T>("/", entry)
        .then((res) => res.data).catch(console.log)
    
    updateEntry = async(id: string, entry: T) => this.instance.put(`/${id}`, entry)
        .catch(console.log)

    deleteEntry = async(id: string) => this.instance.delete(`/${id}`)
        .catch(console.log)

    suggestSearch = async(searchString: string) => this.instance.get<string[]>(`/suggest?searchString=${searchString}`)
        .then((res) => res.data)
        .catch(console.log)
    
    search = async(searchString: string) => this.instance.get<T[]>(`/search?searchString=${searchString}`)
        .then((res) => res.data)
        .catch(console.log)
}
