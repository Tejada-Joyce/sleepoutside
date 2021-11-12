import ExternalServices from "./externalServices.js";
import { alertMessage, qs } from "./utils.js";

export default class Admin {
  constructor(outputSelector) {
    this.mainElement = qs(outputSelector);
    this.token = null;
    this.orders = null;
    this.services = new ExternalServices();
  }

  init() {
    this.mainElement.append(this.showLogin());
    qs("#login").addEventListener("click", (e) => {
      e.preventDefault();
      const email = qs("#email").value;
      const password = qs("#password").value;
      const creds = {
        email: email,
        password: password,
      };
      this.login(creds, this.showOrders.bind(this));
    });
  }

  async login(creds, next) {
    // I built the login method with a callback: next.
    // This makes it much more flexible...
    // there could be many different things the user wants to do after logging in...
    // this allows us that flexibility without having to write a bunch of login methods
    try {
      this.token = await this.services.loginRequest(creds);
      console.log(this.token);
      next();
    } catch (err) {
      // remember this from before?
      alertMessage(err.message.message);
    }
  }

  showLogin() {
    const form = document.createElement("form");
    form.innerHTML = `
            <label for="email">Email:</label>
            <input type="email" id="email" name="email">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password">  
            <button id="login">Login</button>         
        `;
    return form;
  }

  async showOrders() {
    try {
      this.orders = await this.services.getOrders(this.token);
      console.log(this.orders);
      let list = "";
      const newOrders = this.orders
        .map((order) => {
          if ("items" in order) {
            const items = order.items
              .map((item) => `<li>${item.name}</li>`)
              .join("");
            list = `
              <ul>
                  <li>${order.fname}</li>
                  <li>${order.street}, ${order.city}, ${order.state} ${order.zip}</li>
                  <li>
                    <ul>
                      ${items}
                    </ul>
                  </li>
              </ul>
            `;
          } else {
            list = `
          <ul>
              <li>${order.fname}</li>
              <li>${order.street}, ${order.city}, ${order.state} ${order.zip}</li>
          </ul>
          `;
          }
          return list;
        })
        .join("");
      this.mainElement.innerHTML = newOrders;
    } catch (err) {
      // remember this from before?
      alertMessage(err.message.message);
    }
  }
}

const myAdmin = new Admin("main");
myAdmin.init();
