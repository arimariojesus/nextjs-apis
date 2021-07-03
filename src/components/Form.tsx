import axios from "axios";

export const Form = () => {
  const registerUser = async event => {
    event.preventDefault();

    const res = await axios.post('/api/users', JSON.stringify({
      name: event.target.name.value,
    }), { headers: {
      'Content-Type': 'application/json'
    } });

    console.log(res);
  };

  return (
    <form onSubmit={registerUser}>
      <label htmlFor="name">Name:</label>
      <input id="name" name="name" type="text" autoComplete="name" required />
      <button type="submit">Register</button>
    </form>
  );
};