import { useState, useEffect } from 'react';

interface Quote {
    id: string;
    content: string;
    author: string;
}

export const Search = () => {
    const [query, setQuery] = useState("");
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [isSearch, setIsSearch] = useState(false);
    useEffect(() => {
        fetch("https://api.quotable.io/random")
          .then(res => res.json())
          .then(quote => saveQuote('0', quote.content, quote.author))
      }, [])


    function saveResults(result: Array<Object>) {
        const newQuoteList: Array<Quote> = []
        for (let res of result) {
            console.log(res);
            const quote: Quote = {
                id: res._id,
                content: res.content,
                author: res.author
            };
            newQuoteList.push(quote);
        }
        setIsSearch(true);
        setQuotes(newQuoteList);
    }
    
    function saveQuote(id: string, content: string, author: string) {
        const quote: Quote = {
            id: id,
            content: content,
            author: author
        };
        setQuotes([...quotes, quote]);
    }

    return(
        <div className={isSearch ? 'postsearch' : 'container'}>
            <div className="topbar">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    fetch(`https://usu-quotes-mimic.vercel.app/api/search?query=${query}`)
                        .then(r => r.json())
                        .then(lst => saveResults(lst.results));
                }}>
                    <h1>Quote Search</h1>
                    <input
                        className='search'
                        type='search'
                        placeholder='Enter a name to search'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                </form>
            </div>
            <div>
                {
                    quotes.map((quote) => (
                        <div key={quote.id} className = {quote.id === '0' ? 'random' :'quote'}>
                            <p>{quote.content} -{quote.author}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}