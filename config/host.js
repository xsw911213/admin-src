const isDugger = process.env.NODE_ENV !== 'production';
var development = {
  baseUrl: 'http://10.168.34.85:3008',
};
var production = {
  baseUrl: '',
};
export default isDugger ? development : production;
