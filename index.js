import express from 'express';

const express = require('express');
const app = express();
const tf = require('@tensorflow/tfjs-node');

app.get('/', (req, res) => {
  res.send('Home Page');
});

const port = 3001;
app.listen(port, () => {
  console.log('Successful, running on port %d', port);
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
// add image
app.post('/images', express.json(), (req, res) => {
  // const {url, title} = req.body;
  // if(!url || !title)
  //   return res.status(400).json({ error: 'Please fill in both URL and title'})
  const new_img = { id: images.length+1, url: req.body.url, title: req.body.title };
  images.push(new_img);
  res.status(201).json(new_img);
});
// update image
app.put('/images/:id', express.json(), (req, res) => {
  const { id } = req.params;
  const { url, title } = req.body;
  const image = images.find(i => i.id === parseInt(id));
  if (!image) {
    return res.status(404).json({ error: 'Image not found' });
  }
  image.url = url || image.url;
  image.title = title || image.title;
  res.json(image);
});
// delete image
app.delete('/images/:id', (req, res) => {
  const { id } = req.params;
  const index = images.findIndex(i => i.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: 'Image not found' });
  }
  // const deletedImage = images.splice(index, 1)[0];
  // res.json(deletedImage);
  images.splice(index, 1);
  res.status(204).send();
});
