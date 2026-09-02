import { test, expect } from '@playwright/test';

test('API - Crear y loguear usuario @api', async ({ request }) => {
  const randomUser = `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const password = 'Test123!';

  // 1. Crear
  const signupRes = await request.post('https://api.demoblaze.com/signup', {
    data: { username: randomUser, password: password },
  });
  expect(signupRes.ok()).toBeTruthy();
  //console.log('Signup:', await signupRes.text(), 'user:', randomUser);

  // 2. Login con el MISMO usuario
  const loginRes = await request.post('https://api.demoblaze.com/login', {
    data: { username: randomUser, password: password },
  });

  const text = await loginRes.text();
  //console.log('Login:', text);

  expect(loginRes.ok()).toBeTruthy();
  expect(text).toContain('Auth_token');
});
