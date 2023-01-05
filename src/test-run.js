const { generateHash, checkHash } = require('./helpers/auth-helper');

generateHash('123').then((res) => {
  console.log(res, 'res');
});

checkHash(
  '123',
  '$2b$10$hmWvXort8LtxgGLpz9gi1O4W6t769k7LaBI/g7wXocQ1CfWgLRwrC'
).then((res) => {
  console.log(res, 'res');
});
