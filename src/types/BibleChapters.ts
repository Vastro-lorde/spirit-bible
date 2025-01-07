import type { BibleVerse } from "./BibleVerse";

export interface BibleChapters {
    id: string;
    bibleId: string;
    bookId: string;
    number: string;
    reference: string;
    verses?: BibleVerse[]; 
}