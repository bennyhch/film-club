const user_movielistcontrollers = require('./user_movielistcontroller');
const request = require('supertest');
const router = require('./../router');
jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');
// import router from './../router';

describe('duplicateCheck function', () => {
  test('Should not return duplicate number in the same array ', () => {
    expect(user_movielistcontrollers.duplicateCheck(1, [1,2,3,4])).toBe(false);
    expect(user_movielistcontrollers.duplicateCheck(1, [2, 3, 4])).toBe(true);
    expect(user_movielistcontrollers.duplicateCheck(3, [2, 3, 4, 5, 8, 23])).toBe(false);
  });
} )

describe('onLoadArray function', () => {
  let arr = user_movielistcontrollers.onLoadArray();
  test('Should create an array with 10 different numbers with the first 3 numbers as 1, 2, and 3', () => {
    function hasDuplicates(array) {return array.some(x => array.indexOf(x) !== array.lastIndexOf(x));}
    expect(arr.length).toBe(10);
    expect(arr[0]).toBe(1); // the first num has to be 1, 2, 3
    expect(arr[1]).toBe(2);
    expect(arr[2]).toBe(3);
    expect(hasDuplicates(arr)).toBe(false);
  });
  test('Should create an array with the correct combination', () => {
    expect(arr[3]).toBeGreaterThanOrEqual(4);
    expect(arr[3]).toBeLessThanOrEqual(10);
    expect(arr[9]).toBeGreaterThanOrEqual(101);
    expect(arr[9]).toBeLessThanOrEqual(1000);
  })
})




describe('Testing REST API', () => {
  test('Should respond with a 200 status code', async () => {
    jest.setTimeout(async() => {
        const response = await request(router).post('/home').send({
             
      })
      console.log('CODE!', response.statusCode);
      expect(response.statusCode).toBe(400);
    }, 6000);
    jest.runAllTimers();
  })
})