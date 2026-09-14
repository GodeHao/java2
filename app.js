// 熊出没森林乐园 - 纯前端登录演示（数据存 localStorage）
const $ = (sel) => document.querySelector(sel);

// 主题切换（风格多样）
const THEME_MAP = { forest: "🌞 清晨森林", sunset: "🌇 黄昏", night: "🌙 星夜" };
function applyTheme(name) {
  if (name !== "forest") document.body.setAttribute("data-theme", name);
  else document.body.removeAttribute("data-theme");
  document.querySelectorAll(".theme-btn").forEach((b) =>
    b.classList.toggle("active", b.dataset.theme === name)
  );
  localStorage.setItem("forest_theme", name);
}
document.querySelectorAll(".theme-btn").forEach((btn) => {
  btn.addEventListener("click", () => applyTheme(btn.dataset.theme));
});
applyTheme(localStorage.getItem("forest_theme") || "forest");

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
  if (!account) return alert("请先取个森林昵称～");
  if (pwd.length < 6) return alert("密码至少 6 位哦");
  enterForest(account);
});

// 注册
$("#register-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const nick = e.target.nick.value.trim();
  const pwd = e.target.password.value;
  const confirm = e.target.confirm.value;
  if (!nick) return alert("请取个森林昵称");
  if (pwd.length < 6) return alert("密码至少 6 位");
  if (pwd !== confirm) return alert("两次密码不一致");
  enterForest(nick);
});

function enterForest(nick) {
  localStorage.setItem("forest_user", nick);
  showHome(nick);
}

function showHome(nick) {
  $("#auth-view").classList.add("hidden");
  $("#home-view").classList.remove("hidden");
  $("#welcome").textContent = "Hi, " + nick;

  const bears = ["熊大", "熊二", "光头强", "蹦蹦", "涂涂", "吉吉"];
  const pick = bears.includes(nick) ? nick : "小伙伴";
  if (pick === "光头强") {
    $("#home-title").textContent = "光头强！今天不许砍树 🪓❌";
  } else {
    $("#home-title").textContent = "欢迎来到狗熊岭，" + pick + "！";
  }
}

$("#logout").addEventListener("click", () => {
  localStorage.removeItem("forest_user");
  $("#home-view").classList.add("hidden");
  $("#auth-view").classList.remove("hidden");
});

// 首页趣味按钮
document.querySelectorAll(".fun-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const txt = btn.textContent.trim();
    const tips = {
      "🍯 采蜂蜜": "熊二：蜂蜜真甜！🐻",
      "🌰 捡松果": "蹦蹦：捡到一颗大松果！🌰",
      "🪓 阻止光头强": "熊大：光头强又在砍树，快拦住他！💪",
    };
    alert(tips[txt] || "出发啦！");
  });
});

// 已登录则直接进入
const saved = localStorage.getItem("forest_user");
if (saved) showHome(saved);
