const isDugger = process.env.NODE_ENV !== 'production';
var development = {
  baseUrl: 'http://127.0.0.1:3008',
  imgBaseUrl:'http://oz4rno8dv.bkt.clouddn.com/'
};
var production = {
  baseUrl: '',
  imgBaseUrl:'http://oz4rno8dv.bkt.clouddn.com/'
};
export default isDugger ? development : production;
