export default async function ({ $auth, redirect }) {
  const loggedIn = await $auth.loggedIn
  if (!loggedIn) {
    redirect('/login')
  }
}
