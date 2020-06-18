

export default async function activateUser(req, res) {
  const hash = req.query.hash;
  if (!hash) {
    return res.status(401).json({message: 'Cannot Validate an User!'})
  }

  const response = await fetch(`http://localhost:3001/api/activate/user/${hash}`);
  if (response.status >= 400) {
    return res.status(401).json({message: 'Cannot Validate an User!'})
  } else {
    res.writeHead(307, { Location: '/users/activated' });
    res.end();
  }
}
