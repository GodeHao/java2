// 悦购商城 - 纯前端登录演示（无后端，数据存 localStorage）
const $ = (sel) => document.querySelector(sel);

const products = [
  { name: "无线蓝牙耳机", price: 199, old: 299, emoji: "🎧", bg: "#fff0f0" },
  { name: "智能手表", price: 599, old: 799, emoji: "⌚", bg: "#eef6ff" },
  { name: "机械键盘", price: 329, old: 429, emoji: "⌨️", bg: "#f0fff4" },
  { name: "便携咖啡杯", price: 89, old: 129, emoji: "☕", bg: "#fff8e6" },
  { name: "运动跑鞋", price: 459, old: 599, emoji: "👟", bg: "#f3f0ff" },
  { name: "护眼台灯", price: 159, old: 219, emoji: "💡", bg: "#fff0f6" },
  { name: "双肩背包", price: 269, old: 359, emoji: "🎒", bg: "#e6fffb" },
  { name: "香薰蜡烛", price: 69, old: 99, emoji: "🕯️", bg: "#fff5e6" },
];

// 切换登录 / 注册
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    const target = tab.dataset.tab;
    $("#login-form").classList.toggle("active", target === "login");
    $("#register-form").classList.toggle("active", target === "register");
  });
});

// 登录
$("#login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const account = e.target.account.value.trim();
  const pwd = e.target.password.value;
  if (!account || pwd.length < 6) {
    alert("请输入正确的账号，密码至少 6 位");
    return;
  }
  loginSuccess(account);
});

// 注册
$("#register-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const phone = e.target.phone.value.trim();
  const code = e.target.code.value.trim();
  const pwd = e.target.password.value;
  if (!/^\d{11}$/.test(phone)) return alert("请输入 11 位手机号");
  if (code.length !== 6) return alert("请输入 6 位验证码");
  if (pwd.length < 6) return alert("密码至少 6 位");
  loginSuccess(phone);
});

// 获取验证码（演示：随机6位）
$("#send-code").addEventListener("click", (e) => {
  const btn = e.target;
  const code = String(Math.floor(100000 + Math.random() * 900000));
  alert("演示验证码：" + code);
  btn.disabled = true;
  let n = 60;
  btn.textContent = n + "s";
  const t = setInterval(() => {
    n--;
    btn.textContent = n + "s";
    if (n <= 0) { clearInterval(t); btn.disabled = false; btn.textContent = "获取验证码"; }
  }, 1000);
});

function loginSuccess(account) {
  localStorage.setItem("shop_user", account);
  showShop(account);
}

function showShop(account) {
  $("#auth-view").classList.add("hidden");
  $("#shop-view").classList.remove("hidden");
  $("#welcome").textContent = "Hi, " + account;
  const grid = $("#product-grid");
  grid.innerHTML = products
    .map(
      (p) => `
    <div class="product">
      <div class="pic" style="background:${p.bg}">${p.emoji}</div>
      <div class="info">
        <div class="name">${p.name}</div>
        <div class="price">¥${p.price}<small>¥${p.old}</small></div>
      </div>
    </div>`
    )
    .join("");
}

$("#logout").addEventListener("click", () => {
  localStorage.removeItem("shop_user");
  $("#shop-view").classList.add("hidden");
  $("#auth-view").classList.remove("hidden");
});

// 已登录则直接进入商城
const saved = localStorage.getItem("shop_user");
if (saved) showShop(saved);
