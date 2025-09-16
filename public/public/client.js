// Intentar wss:// si está en HTTPS (Render). En local usar ws://
const proto = location.protocol === "https:" ? "wss:" : "ws:";
const wsUrl = `${proto}//${location.host}`;
const ws = new WebSocket(wsUrl);

const messagesEl = document.getElementById("messages");
const form = document.getElementById("chatForm");
const input = document.getElementById("text");

// Mostrar mensajes
function addMsg(text, mine = false) {
  const div = document.createElement("div");
  div.className = "msg" + (mine ? " me" : "");
  div.textContent = text;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

ws.addEventListener("open", () => addMsg("Conectado ✅"));
ws.addEventListener("message", (ev) => addMsg(ev.data));
ws.addEventListener("close", () => addMsg("Desconectado ❌"));
ws.addEventListener("error", () => addMsg("Error de conexión ⚠️"));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  ws.send(text);
  addMsg(text, true);
  input.value = "";
  input.focus();
});
