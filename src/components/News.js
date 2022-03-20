import React, {useEffect, useState} from 'react'
import Newsitem from './Newsitem'
import NewsLoader from './Loader'
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types'

const News = (props) => {

    const [newsList, setnewsList] = useState([])
    const [loading, setloading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalNews, setTotalNews] = useState(0)

    const loadNewsList = async () => {
        setloading(true);
        props.setProgress(10);
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&pageSize=${props.pageSize}&page=${page}`;
        let data = await fetch(apiUrl);
        props.setProgress(50);
        let newsResponse = await data.json();
        props.setProgress(100);
        setnewsList(newsResponse.articles)
        setTotalNews(newsResponse.totalResults)
        setPage(1);
        setloading(false);
    }

    useEffect(() => {
        loadNewsList();
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [])
    

    const fetchMoreData = async () => {
        setloading(true);
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&pageSize=${props.pageSize}&page=${page+1}`;
        setPage(page + 1);
        let data = await fetch(apiUrl);
        let newsResponse = await data.json();
        setnewsList(newsResponse.articles)
        setnewsList(newsList.concat(newsResponse.articles))
        setTotalNews(newsResponse.totalResults)
        setloading(false);
    };

    return (
        <div className='container my-3'>
            <h2 className='text-heading text-center'>Top Breaking News</h2>
            {loading && <NewsLoader />}
            <div className="container">
                <InfiniteScroll
                    dataLength={newsList.length}
                    next={fetchMoreData}
                    hasMore={newsList.length !== totalNews}
                    loader={<NewsLoader />}
                >
                    <div className='row'>
                        {newsList.map((news) => {
                            return <Newsitem key={news.url} title={news.title ? news.title.slice(0, 50) : ""} description={news.description ? news.description.slice(0, 80) : ""} imageUrl={news.urlToImage} publishedAt={news.publishedAt} newslink={news.url} />
                        })}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 20,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string.isRequired,
    pageSize: PropTypes.number
}

export default News