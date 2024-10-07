require('dotenv').config();
const cors = require('cors'); 
const axios = require('axios');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// YouTube Search API
app.get('/youtube', async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&maxResults=8&key=AIzaSyDAHRBpaW6YZWgJLR--nkaUlPc3-27YGfs`
    );
    const videos = response.data.items.map((item) => ({
      title: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      channel: item.snippet.channelTitle,
      image: item.snippet.thumbnails.high.url,
    }));
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching YouTube videos' });
  }
});

// CrossRef API for Academic Papers
app.get('/papers', async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(
      `https://api.crossref.org/works?query=${query}&rows=5`
    );
    const papers = response.data.message.items.map((item) => ({
      title: item.title[0],
      url: item.URL,
      published: item['published-print']
        ? item['published-print']['date-parts'][0][0]
        : 'N/A',
    }));
    res.json(papers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching academic papers' });
  }
});

// Google Custom Search API for Articles
app.get('/articles', async (req, res) => {
  const { query } = req.query;
  console.log(`Received query: ${query}`);

  try {
    const response = await axios.get(
      `https://www.googleapis.com/customsearch/v1?q=${query}&cx=b4151eca3c91c44b3&key=AIzaSyBI4jpTEoaiJN3-oH8si45Fo9K5C_GXM5E&num=5`
    );

    if (!response.data.items || response.data.items.length === 0) {
      return res.status(404).json({ error: 'No articles found' });
    }

    const articles = response.data.items.map((item) => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
    }));

    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Error fetching articles' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
