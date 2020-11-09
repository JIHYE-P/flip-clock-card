const sleep = ms => new Promise(res => setTimeout(res, ms))
const pipe = (...fs) => props => fs.reduce((acc, f) => f(acc),props);
