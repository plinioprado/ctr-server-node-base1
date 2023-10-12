const request =  require('supertest');

const { app } = require('../app');

beforeAll( async () => {

  const response = await request(app)
    .get('/api/install/resetdb')
    .set({ 'Authorization': '1:123321' });

  console.log(`did reset before all and got ${response.status}`);
});

describe('login', () => {
  it('should login', async () => {
    const response = await request(app)
        .post('/api/login')
        .send({
          email: 'admin@example.com',
          pass: '12345'
        });

    expect(response.status).toEqual(200);
    expect(response.body.data.user_id).toEqual(2);
    expect(response.body.data.user_name).toEqual('Admin User');
    expect(response.body.data.user_role).toEqual('admin');
    expect(response.body.data.auth_access).toEqual('{\"role\":\"crud\",\"tenant\":\"r\",\"setting\":\"crud\",\"user\":\"crud\",\"session\":\"r\",\"country\":\"crud\",\"install\":\"crud\",\"currency\":\"crud\"}',);
    expect(response.body.data.auth_token).toEqual('123321');
  });
});

describe('role', () => {

  it('should get role list', async () => {
    const response = await request(app)
      .get('/api/role')
      .set({ 'Authorization': '1:123321'});

      expect(response.status).toEqual(200);
      expect(response.body.data[0].cod).toEqual('admin');
      expect(response.body.data[0].name).toEqual('admin');
      expect(response.body.data[0].active).toEqual(true);
  })

  it('should create (post)', async  () => {
    const response = await request(app)
      .post('/api/role')
      .set({ 'Authorization': '1:123321'})
      .send({
        cod: 'tstcod',
        name: 'testname'
      });

    expect(response.status).toEqual(200);
    expect(response.body.data.cod).toEqual('tstcod');
    expect(response.body.data.name).toEqual('testname');
  });

  it('should not create (post) duplicated cod', async  () => {
    const response = await request(app)
      .post('/api/role')
      .set({ 'Authorization': '1:123321'})
      .send({
        cod: 'tstcod',
        name: 'testname'
      });

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('server failed to create: duplicated primary key');
  });

  it('should update (put)', async () => {
    const response = await request(app)
      .put('/api/role')
      .set({ 'Authorization': '1:123321'})
      .send({
        cod: 'tstcod',
        name: 'testname2',
      });

    expect(response.status).toEqual(200);
    expect(response.body.data.cod).toEqual('tstcod');
    expect(response.body.data.name).toEqual('testname2');
  });

  it('should get item', async () => {

    const response = await request(app)
      .get('/api/role/tstcod')
      .set({ 'Authorization': '1:123321'});

      expect(response.status).toEqual(200);
      expect(response.body.data.name).toEqual('testname2');
  });

  it('should delete', async () => {
    const response = await request(app)
      .delete('/api/role/tstcod')
      .set({ 'Authorization': '1:123321'});

    expect(response.status).toEqual(200);
  });
});

describe('setting', () => {

  it('should get list', async () => {

    const response = await request(app)
      .get('/api/setting')
      .set({ 'Authorization': '1:123321'});

      expect(response.status).toEqual(200);
      expect(response.body.data[0].key).toEqual('lang');
      expect(response.body.data[0].value).toEqual('en');
      expect(response.body.data[0].grp).toEqual('');
  });

  it('should create (post)', async  () => {
    const response = await request(app)
      .post('/api/setting')
      .set({ 'Authorization': '1:123321'})
      .send({
        key: 'test',
        value: 'testName',
        grp: 'testGroup'
      });
    expect(response.status).toEqual(200);
  });

  it('should update (put)', async () => {
    const response = await request(app)
      .put('/api/setting')
      .set({ 'Authorization': '1:123321'})
      .send({
        key: 'test',
        value: 'testName2',
        grp: 'testGroup2'
      });

    expect(response.status).toEqual(200);
  });

  it('should get item', async () => {
    const response = await request(app)
      .get('/api/setting/test')
      .set({ 'Authorization': '1:123321'});

      expect(response.status).toEqual(200);
      expect(response.body.data.value).toEqual('testName2');
      expect(response.body.data.grp).toEqual('testGroup2');
  });

  it('should delete', async () => {
    const response = await request(app)
      .delete('/api/setting/test')
      .set({ 'Authorization': '1:123321'});

    expect(response.status).toEqual(200);
  });
})

describe('tenant', () => {

  it('should get list', async () => {
    const response = await request(app)
      .get('/api/tenant')
      .set({ 'Authorization': '1:123321'});

    expect(response.status).toEqual(200);
    expect(response.body.data[0].name).toEqual('Example Ltd.');
  });

  it('should create (post)', async  () => {
    const response = await request(app)
      .post('/api/tenant')
      .set({ 'Authorization': '1:123321'})
      .send({
        cod: 'test',
        name: 'Test Ltd.',
        descr: 'test tenant'
      });

    expect(response.status).toEqual(200);
    expect(response.body.data.name).toEqual('Test Ltd.');
  });

  it('should update (put)', async () => {
    const response = await request(app)
      .put('/api/tenant')
      .set({ 'Authorization': '1:123321'})
      .send({
        cod: 'test',
        name: 'Test Ltd2.',
        descr: 'test tenant2',
        active: false
      });

    expect(response.status).toEqual(200);
    expect(response.body.data.name).toEqual('Test Ltd2.');
  });

  it('should get item', async () => {

    const response = await request(app)
      .get('/api/tenant/test')
      .set({ 'Authorization': '1:123321'});

      expect(response.status).toEqual(200);
      expect(response.body.data.name).toEqual('Test Ltd2.');
  })

  it('should delete', async () => {
    const response = await request(app)
      .delete('/api/tenant/test')
      .set({ 'Authorization': '1:123321'});

    expect(response.status).toEqual(200);
  });
});

describe('user', () => {
  let id;

  it('should get user item', async () => {
    const response = await request(app)
      .get('/api/user/1')
      .set({ 'Authorization': '1:123321'});

      expect(response.status).toEqual(200);
      expect(response.body.data.name).toEqual('Super User');
  })

  it('should create (post)', async  () => {
    const response = await request(app)
      .post('/api/user')
      .set({ 'Authorization': '1:123321'})
      .send({
        name: 'tst',
        email: 'tst@example.com',
        pass: '12345'
      });

    expect(response.status).toEqual(200);
    expect(response.body.data.name).toEqual('tst');
    id = response.body.data.id;
  });

  it('should get item', async () => {

    const response = await request(app)
      .get(`/api/user/${id}`)
      .set({ 'Authorization': '1:123321'});

      expect(response.status).toEqual(200);
      expect(response.body.data.id).toEqual(id);
      expect(response.body.data.name).toEqual('tst');
  });

  it('should delete', async () => {
    const response = await request(app)
      .delete(`/api/user/${id}`)
      .set({ 'Authorization': '1:123321'});

    expect(response.status).toEqual(200);
  });


  it('should get new item', async () => {

    const response = await request(app)
      .get('/api/user/0')
      .set({ 'Authorization': '1:123321'});

      expect(response.status).toEqual(200);
      expect(response.body.data.id).toEqual(0);
      expect(response.body.data.name).toEqual('');
      expect(response.body.data.email).toEqual('');
      expect(response.body.data.pass).toEqual('');
      expect(response.body.data.active).toEqual(true);
      expect(response.body.data.role_cod).toEqual('user');
      expect(response.body.data.tenant_cod).toEqual('default');
  });
});

describe('country', () => {

  it('should get list', async () => {

    const response = await request(app)
      .get('/api/country')
      .set({ 'Authorization': '1:123321'});

    expect(response.status).toEqual(200);
    expect(response.body.data[0].name).toEqual('Aruba');
  })

  it('should create (post)', async  () => {
    const response = await request(app)
      .post('/api/country')
      .set({ 'Authorization': '1:123321'})
      .send({
        cod: 'ZZZ',
        cod_alpha2: 'ZZ',
        cod_numeric: 999,
        name: 'zzz',
        name_iso: 'zzzz',
        name_official: 'zzzzz'
      });

    expect(response.status).toEqual(200);
    expect(response.body.data.cod).toEqual('ZZZ');
    expect(response.body.data.name).toEqual('zzz');
  });

  it('should update (put)', async () => {
    const response = await request(app)
      .put('/api/country')
      .set({ 'Authorization': '1:123321'})
      .send({
        cod: 'ZZZ',
        cod_alpha2: 'ZZ',
        cod_numeric: 999,
        name: 'zz2',
        name_iso: 'zzzz',
        name_official: 'zzzzz'
      });

    expect(response.status).toEqual(200);
  });

  it('should get item', async () => {

    const response = await request(app)
      .get('/api/country/ZZZ')
      .set({ 'Authorization': '1:123321'});

      expect(response.status).toEqual(200);
      expect(response.body.data.cod).toEqual('ZZZ');
      expect(response.body.data.name).toEqual('zz2');
  });

  it('should delete', async () => {
    const response = await request(app)
      .delete('/api/country/ZZZ')
      .set({ 'Authorization': '1:123321'});

    expect(response.status).toEqual(200);
  });

  it('should get options', async () => {
    const response = await request(app)
      .get('/api/country/option')
      .set({ 'Authorization': '1:123321'});

      expect(response.status).toEqual(200);
      expect(response.body.data[0].value).toEqual('ABW');
      expect(response.body.data[0].text).toEqual('Aruba');
      expect(response.body.data[0].active).toEqual(false);
  });
})


describe('currency', () => {

  it('should get list', async () => {

    const response = await request(app)
      .get('/api/currency')
      .set({ 'Authorization': '1:123321'});

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual(undefined);
    expect(response.body.data[0].cod).toEqual('AED');
    expect(response.body.data[0].name).toEqual('United Arab Emirates dirham');
    expect(response.body.data[0].active).toEqual(false);
    expect(response.body.data[0].cod_numeric).toEqual(784);
    expect(response.body.data[0].minorunit).toEqual(2);

  })

  it('should create (post)', async  () => {
    const response = await request(app)
      .post('/api/currency')
      .set({ 'Authorization': '1:123321'})
      .send({
        cod: 'AAA',
        cod_numeric: 987,
        name: 'AAA Dollar',
        source: 'Test'
      });

    expect(response.status).toEqual(200);
    expect(response.body.data.cod).toEqual('AAA');
    expect(response.body.data.name).toEqual('AAA Dollar');
    expect(response.body.data.source).toEqual('Test');
  });

  it('should update (put)', async () => {
    const response = await request(app)
      .put('/api/currency')
      .set({ 'Authorization': '1:123321'})
      .send({
        cod: 'AAA',
        cod_numeric: 9870,
        name: 'AAA Dollar2'
      });

    expect(response.status).toEqual(200);
    expect(response.body.data.cod).toEqual('AAA');
    expect(response.body.data.name).toEqual('AAA Dollar2');
  });

  it('should get item', async () => {
    const response = await request(app)
      .get('/api/currency/AAA')
      .set({ 'Authorization': '1:123321'});

      expect(response.status).toEqual(200);
      expect(response.body.data.cod).toEqual('AAA');
      expect(response.body.data.name).toEqual('AAA Dollar2');
  });

  it('should delete', async () => {
    const response = await request(app)
      .delete('/api/currency/AAA')
      .set({ 'Authorization': '1:123321'});

    expect(response.status).toEqual(200);
  });

})
