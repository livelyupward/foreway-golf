<template>
  <section id="auth-view">
    <div class="auth-view_container">
      <h1>Login with your Google account</h1>
      <GoogleLogin :callback="googleAuthCallback" />
    </div>
  </section>
</template>

<script setup lang="ts">
import router from '../router';
import { mainStore } from '../store';
import { useMessage } from 'naive-ui';
const store = mainStore();
const { setUser } = store;
const message = useMessage();

const googleAuthCallback = async (response: GoogleResponse) => {
  // This callback will be triggered when the user selects or login to their Google account from the popup
  try {
    /**
     * send the credential that we saved to the server
     */
    const tokenSend = await fetch(`/api/auth?cred=${response.credential}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const tokenResponse = await tokenSend.json();

    // set the credential response to a localStorage value
    localStorage.setItem('gg_token', response.credential);

    /**
     * query db for the user that was sent by successful Google auth
     */
    const userDbFetch: Response = await fetch(`/api/users/${tokenResponse.email}`);
    let userDbResponse: object[];

    if (userDbFetch.status === 404) {
      const newUser = await fetch(`/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: tokenResponse.email,
          name: tokenResponse.name,
        }),
      });
      const newUserFromDB = await newUser.json();

      userDbResponse = [newUserFromDB];
      message.success('User created successfully');
    } else {
      userDbResponse = await userDbFetch.json();
      message.success('Logged in');
    }

    /**
     * set the user in the app state and push to the home route
     */
    await setUser(userDbResponse[0]);
    await router.push('/');
  } catch (error) {
    console.error('Google callback error: ', error);
    throw Error('Error during Google callback.');
  }
};

interface GoogleResponse {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
}
</script>

<style lang="scss" scoped>
#auth-view {
  @media screen and (max-width: 600px) {
    align-items: center;
    display: flex;
    height: 85%;
    text-align: center;
  }
}
</style>
