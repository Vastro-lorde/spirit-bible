import axios from "axios";

// const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
// const TELEGRAM_API_URL = import.meta.env.VITE_TELEGRAM_API_URL;
const BIBLE_API_KEY = import.meta.env.VITE_BIBLE_API_KEY;
// const BIBLE_API_KEY = '';
const BIBLE_API_URL = 'https://api.scripture.api.bible/v1';

export const getBibleVerse = async (bibleId: string, bookId: string, chapterId: string, verseId: string) => { 
    try { 
        const response = await axios.get(`${BIBLE_API_URL}/${bibleId}/verses/${bookId}.${chapterId}.${verseId}`, { 
            headers: { 'api-key': BIBLE_API_KEY, }, 
        }); 
        return response.data; 
    } catch (error) { 
        console.error('Error fetching Bible verse:', error); 
        throw error; 
    } 
};

export const getBibleBooks = async (bibleId: string) => { 
    try { 
        console.log('bibleId:', bibleId);
        
        const response = await axios.get(`${BIBLE_API_URL}/bibles/${bibleId}/books`, { 
            headers: { 'api-key': BIBLE_API_KEY, }, 
        }); 
        return response.data; 
    } catch (error) { 
        console.error('Error fetching Bible verse:', error); 
        throw error; 
    } 
};

export const getBibles = async () => {
    try { 
        const response = await axios.get(`${BIBLE_API_URL}/bibles?language=eng`, { 
            headers: { 'api-key': BIBLE_API_KEY, }, 
        }); 
        return response.data; 
    } catch (error) { 
        console.error('Error fetching Bible verse:', error); 
        throw error; 
    } 
}

export const getChapters = async (bibleId: string, bookId: string) => { 
    try { 
        const response = await axios.get(`${BIBLE_API_URL}/bibles/${bibleId}/books/${bookId}/chapters`, { 
            headers: { 'api-key': BIBLE_API_KEY, },
        });
        const chapters = response.data.data;
        
        return chapters;
    } catch (error) {
        console.error('Error fetching Bible Chapters:', error);
        throw error;
    }
}

export const getBookChaptersHelper = async (bibleId: string, bookIds: string[]) => {
    try {
        const chapters = await Promise.all(bookIds.map(async (bookId) => {
            const chapterData = await getChapters(bibleId, bookId);
            return { [bookId]: chapterData }; // Create an object with bookId as key
        }));
        // Reduce the array of objects into a single object
        return chapters.reduce((acc, curr) => {
            return { ...acc, ...curr }; // Merge each object into the accumulator
        }, {});
    } catch (error) {
        console.error('Error fetching Bible Chapters:', error);
        throw error;
    }
}