const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/wongnai-menu', async (req, res) => {
  try {
    const response = await axios.get('https://www.wongnai.com/_api/businesses/2176782fx/menu?includeUnavailableItems=true', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
      }
    });

    const menuItems = response.data.menu.sections.flatMap(section => section.items).map(item => ({
      name: item.name,
      price: item.price,
      description: item.description || 'ไม่มี',
      isAvailable: item.isAvailable,
      photo: item.photo ? item.photo.url : 'ไม่มีรูป'
    }));

    res.json(menuItems);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching Wongnai menu');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
