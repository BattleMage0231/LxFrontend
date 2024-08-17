import { FREntry } from "../../utilites/languages/FREntry.ts";
import { BaseEntryService } from "../BaseEntryService.ts";
import config from '../config.ts';

class FREntryService extends BaseEntryService<FREntry> {
    constructor(url: string) {
        super(url);
    }
}

export default new FREntryService(`${config.apiURL}/entry/fr`)
