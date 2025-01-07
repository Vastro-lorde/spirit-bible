export interface BibleVerseObject {
    id: string;
    orgId: string;
    bookId: string;
    chapterId: string;
    bibleId: string;
    reference: string;
}

export interface BibleVerse {
    id: string;
    orgId: string;
    bookId: string;
    chapterId: string;
    bibleId: string;
    reference: string;
    content: string;
    verseCount: number;
    next: {
        id: string;
        number: string;
    };
    previous: {
        id: string;
        number: string;
    };
}