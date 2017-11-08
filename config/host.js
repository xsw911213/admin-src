const isDugger = process.env.NODE_ENV !== 'production';
var development = {
  baseUrl: 'http://127.0.0.1:3008',
};
var production = {
  baseUrl: '',
};
export default isDugger ? development : production;
