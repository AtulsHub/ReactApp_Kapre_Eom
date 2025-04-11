export class UserService {
  url = "http://localhost:8000/api/v1/users";

  async signup(formData) {
    try {
      const response = await fetch(`${this.url}/register`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("Posted:", data);
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async login(email, password) {
    try {
      const response = await fetch(`${this.url}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      console.log("Posted:", data);
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getUser(userId) {
    try {
      const response = await fetch(`${this.url}/get-user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("Posted:", data);
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

const userService = new UserService();
export default userService;
