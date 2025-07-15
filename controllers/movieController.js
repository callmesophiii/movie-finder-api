const axios = require('axios');

const OMDB_BASE_URL = 'http://www.omdbapi.com/';
const API_KEY = process.env.OMDB_API_KEY;

const searchMovies = async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ error: 'Title query parameter is required' });
  }

  try {
    const response = await axios.get(OMDB_BASE_URL, {
      params: {
        s: title,
        apikey: API_KEY
      }
    });

    const data = response.data;

    if (data.Response === 'False') {
      return res.status(404).json({ error: data.Error });
    }

    res.json(data.Search);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
};

const getMovieDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(OMDB_BASE_URL, {
      params: {
        i: id,
        apikey: API_KEY
      }
    });

    const data = response.data;

    if (data.Response === 'False') {
      return res.status(404).json({ error: data.Error });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
};

module.exports = {
  searchMovies,
  getMovieDetails
};
