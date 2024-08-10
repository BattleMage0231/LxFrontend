import { FREntry } from "../../utilites/languages/fr-entry.ts";
import { BaseEntryService } from "../base-entry-service.ts";
import config from '../config.ts';

class FREntryService extends BaseEntryService<FREntry> {
    constructor(url: string) {
        super(url);
    }
}

export default new FREntryService(`${config.apiURL}/entry/fr`);
