import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.listen(3000, () => {
  console.log('Successful');
});

const images = [
  {id: 1, url: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', title: 'Image 1'},
  {id: 2, url: 'https://imgur.com/gallery/image2', title: 'Image 2'},
  {id: 3, url: 'https://imgur.com/gallery/image3', title: 'Image 3'}
];

app.get('/images', (req, res) => {
  res.json(images);
});

app.get('/images/:id', (req, res) => {
  const image = images.find(i => i.id === parseInt(req.params.id));
  if (!image) {
    return res.status(404).json({error: 'Image not found'});
  }
  res.json(image);
});

// app.post('/images', express.json(), (req, res) => {
//   const new_img = { id: images.length+1, url: req.body.url, title: req.body.title };
//   images.push(new_img);
//   res.status(201).json(new_img);
// });
