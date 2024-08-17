import axios, { AxiosError, AxiosInstance } from 'axios';
import { BaseEntry } from '../../utilites/entries/BaseEntry';

export interface EntryService {
    getAllEntries: () => Promise<BaseEntry[] | void>,
    getEntryById: (id: string) => Promise<BaseEntry | null | undefined>,
    createEntry: (entry: BaseEntry) => Promise<BaseEntry | void>,
    updateEntry: (id: string, entry: BaseEntry) => Promise<null | void>,
    deleteEntry: (id: string) => Promise<null | void>,
    suggestSearch: (searchString: string) => Promise<string[] | void>,
    search: (searchString: string) => Promise<BaseEntry[] | void>
}

export abstract class BaseEntryService<T extends BaseEntry> implements EntryService {
    protected readonly instance: AxiosInstance;

    constructor(url: string) {
        this.instance = axios.create({
            baseURL: url,
            timeout: 30000
        });
    }

    getAllEntries = async() => this.instance.get<T[]>("/")
        .then(res => res.data as BaseEntry[]).catch(console.log)

    getEntryById = async(id: string) => this.instance.get<T>(`/${id}`)
        .then(res => res.data)
        .catch((err: AxiosError) => {
            if(err.response!.status === 404) {
                return null;
            }
            console.log(err);
        });

    createEntry = async(entry: BaseEntry) => this.instance.post<T>("/", entry)
        .then(res => res.data as BaseEntry).catch(console.log)

    updateEntry = async(id: string, entry: BaseEntry) => this.instance.put<T>(`/${id}`, entry)
        .then(() => null).catch(console.log)

    deleteEntry = async(id: string) => this.instance.delete(`/${id}`)
        .then(() => null).catch(console.log)

    suggestSearch = async(searchString: string) => this.instance.get<string[]>(`/suggest?searchString=${searchString}`)
        .then((res) => res.data)
        .catch(console.log)

    search = async(searchString: string) => this.instance.get<T[]>(`/search?searchString=${searchString}`)
        .then((res) => res.data)
        .catch(console.log)
}
