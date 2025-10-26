"use client";

// Lightweight Socket.IO client manager to avoid multiple connections
// Uses dynamic import to prevent SSR issues

let ioImportPromise = null;

class SocketManager {
  constructor() {
    this.socket = null;
    this.connectedUserId = null;
    this.boundHandlers = new Map();
  }

  setCurrentUser(userId) {
    if (!userId) return;
    this.connectedUserId = userId;
    try {
      localStorage.setItem("socket_user_id", userId);
    } catch (_) {}
  }

  async connect() {
    if (this.socket && this.socket.connected) {
      console.log("[socket] already connected", {
        id: this.socket.id,
        url: this.socket.io?.uri,
      });
      return this.socket;
    }
    if (!ioImportPromise) ioImportPromise = import("socket.io-client");
    const { io } = await ioImportPromise;

    // const url = process.env.NEXT_PUBLIC_SOCKET_URL || window.location.origin;
    // const path = process.env.NEXT_PUBLIC_SOCKET_PATH || "/socket.io";

    const url = "http://localhost:3000";
    const path = "/socket.io";

    console.log("[socket] connecting", { url });
    this.socket = io(url, {
      withCredentials: true,
      path,
      // Start with polling to survive proxies, then upgrade to websocket
      transports: ["polling", "websocket"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
    });

    return new Promise((resolve) => {
      const onConnect = () => {
        console.log("[socket] connected", { id: this.socket?.id });
        // Re-join previously joined user room after reconnect/page refresh
        try {
          if (!this.connectedUserId) {
            const stored = localStorage.getItem("socket_user_id");
            if (stored) this.connectedUserId = stored;
          }
        } catch (_) {}
        if (this.connectedUserId) {
          try {
            this.socket?.emit("join_user", { userId: this.connectedUserId });
            console.log("[socket] re-join_user", {
              userId: this.connectedUserId,
            });
          } catch (_) {}
        }
        this.socket?.off("connect", onConnect);
        resolve(this.socket);
      };
      this.socket?.on("connect", onConnect);
      this.socket?.on("connect_error", (err) => {
        console.warn("[socket] connect_error", err?.message || err);
      });
      this.socket?.on("reconnect_attempt", (n) => {
        console.log("[socket] reconnect_attempt", n);
      });
      this.socket?.on("reconnect", (n) => {
        console.log("[socket] reconnected", {
          attempts: n,
          id: this.socket?.id,
        });
      });
      this.socket?.on("disconnect", (reason) => {
        console.log("[socket] disconnected", { reason });
      });
    });
  }

  async joinUser(userId) {
    if (!userId) return;
    await this.connect();
    if (this.connectedUserId === userId) return;
    console.log("[socket] join_user", { userId });
    this.socket?.emit("join_user", { userId });
    this.connectedUserId = userId;
  }

  async leaveUser(userId) {
    if (!userId) return;
    await this.connect();
    console.log("[socket] leave_user", { userId });
    this.socket?.emit("leave_user", { userId });
    if (this.connectedUserId === userId) this.connectedUserId = null;
  }

  on(event, handler) {
    if (!this.socket) return () => {};
    this.socket.on(event, handler);
    const id = `${event}:${handler?.name || Math.random().toString(36)}`;
    this.boundHandlers.set(id, { event, handler });
    return () => this.off(event, handler);
  }

  off(event, handler) {
    if (!this.socket) return;
    this.socket.off(event, handler);
  }
}

export const socketManager = new SocketManager();
