import { FREntry } from "../../utilites/entries/FREntry.ts";
import { BaseEntryService } from "./BaseEntryService.ts";

export default class FREntryService extends BaseEntryService<FREntry> {
    constructor(url: string) {
        super(url);
    }
}
