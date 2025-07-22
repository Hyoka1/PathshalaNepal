import * as signalR from "@microsoft/signalr";
import { store } from "../store";
import { toast } from "react-toastify";

class SignalRService {
  constructor() {
    this.connection = null;
    this.isConnected = false;
  }

  startConnection = async () => {
    try {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl("/api/orderbroadcast")
        .withAutomaticReconnect()
        .build();

      this.connection.on("ReceiveOrderUpdate", (order) => {
        // Update the order in the Redux store
        store.dispatch({
          type: "orders/updateOrderStatus/fulfilled",
          payload: order,
        });

        // Show notification
        toast.info(`Order #${order.id} status updated to ${order.status}`);
      });

      this.connection.on("ReceiveNewOrder", (order) => {
        // Add the new order to the Redux store
        store.dispatch({
          type: "orders/createOrder/fulfilled",
          payload: order,
        });

        // Show notification
        toast.success(`New order #${order.id} received`);
      });

      await this.connection.start();
      this.isConnected = true;
      console.log("SignalR Connected");
    } catch (error) {
      console.error("SignalR Connection Error:", error);
      this.isConnected = false;
    }
  };

  stopConnection = async () => {
    if (this.connection) {
      try {
        await this.connection.stop();
        this.isConnected = false;
        console.log("SignalR Disconnected");
      } catch (error) {
        console.error("SignalR Disconnection Error:", error);
      }
    }
  };

  isConnected = () => {
    return this.isConnected;
  };
}

export const signalRService = new SignalRService();
