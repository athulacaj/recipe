const moment = require('moment-timezone');

const userLocalDateString = "2023-11-09"; // Replace this with the user's input
const userLocalDate = moment.tz(userLocalDateString, 'IST'); // Assuming India time zone

// Convert the user's local date to UTC
const userUTCDate = userLocalDate.utc();

// // Assuming you have a 'Post' model with a 'createdAt' field
// const posts = await prisma.post.findMany({
//   where: {
//     createdAt: {
//       gte: userUTCDate.toDate(),
//     },
//   },
// });

console.log(userUTCDate.toDate());
