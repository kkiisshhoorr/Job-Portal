import comments from '../data/comments.js';

export const getComments = (req, res) => {
  res.json(comments);
};