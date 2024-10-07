import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import './datadisplay.css';

// searchFilters  props recived from navigationbar in app.jsx
const DataDisplay = ({ searchFilters }) => {
  const { searchTerm, contentType } = searchFilters; 
  const [videos, setVideos] = useState([]);
  const [articles, setArticles] = useState([]);
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);


// Fetching apis using axios
  const fetchData = async () => {
    setLoading(true);
    try {
      if (contentType === 'youtube' || contentType === 'all') {
        const youtubeResponse = await axios.get(
          `http://localhost:5000/youtube?query=${searchTerm}`
        );
        setVideos(youtubeResponse.data);
      }

      if (contentType === 'articles' || contentType === 'all') {
        const articlesResponse = await axios.get(
          `http://localhost:5000/articles?query=${searchTerm}`
        );
        setArticles(articlesResponse.data);
      }

      if (contentType === 'papers' || contentType === 'all') {
        const papersResponse = await axios.get(
          `http://localhost:5000/papers?query=${searchTerm}`
        );
        setPapers(papersResponse.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchData();
    }
  }, [searchTerm, contentType]);


  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <Spinner animation="grow" />
        </div>
      ) : (
        <>
          {contentType === 'youtube' || contentType === 'all' ? (
            <>
              <h2>YouTube Videos</h2>
              <div className="youtube-style">
                {videos.map((video, index) => (
                  <Card key={index} style={{ width: '18rem', margin: '1rem' }}>
                    <Card.Img variant="top" src={video.image} />
                    <Card.Body>
                      <Card.Text>{video.title}</Card.Text>
                      <Button
                        variant="primary"
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Watch Video
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </>
          ) : null}

          {contentType === 'articles' || contentType === 'all' ? (
            <>
              <h2>Articles</h2>
              <div className="articles-list">
                <ul>
                  {articles.map((article, index) => (
                    <li key={index}>
                      <a href={article.link} target="_blank" rel="noopener noreferrer">
                        {article.title}
                      </a>
                      <p>{article.snippet}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : null}

          {contentType === 'papers' || contentType === 'all' ? (
            <>
              <h2>Academic Papers</h2>
              <div className="academic-papers">
                <ul>
                  {papers.map((paper, index) => (
                    <li key={index}>
                      <a href={paper.url} target="_blank" rel="noopener noreferrer">
                        {paper.title}
                      </a>
                      <p>Published: {paper.published}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default DataDisplay;
