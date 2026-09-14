// 熊出没森林乐园 - 纯前端登录演示（数据存 localStorage / sessionStorage）
const $ = (sel) => document.querySelector(sel);

/* ---------------- 主题切换（多风格 + 装饰随主题变化） ---------------- */
const LEAF_MAP = {
  forest:  ["🌿", "🍃", "🌰", "🍂", "🌲"],
  sunset:  ["🍂", "🌅", "🌻", "🍁", "✨"],
  night:   ["⭐", "🌟", "💫", "🌙", "✨"],
  cherry:  ["🌸", "🌸", "🌸", "🌸", "🍃"],
  snow:    ["❄️", "❄️", "⛄", "🌨️", "✨"],
};
function applyTheme(name) {
  if (name && name !== "forest") document.body.setAttribute("data-theme", name);
  else document.body.removeAttribute("data-theme");
  document.querySelectorAll(".theme-btn").forEach((b) =>
    b.classList.toggle("active", b.dataset.theme === name)
  );
  const emojis = LEAF_MAP[name] || LEAF_MAP.forest;
  document.querySelectorAll(".leaves span").forEach((s, i) => (s.textContent = emojis[i]));
  localStorage.setItem("forest_theme", name);
}
document.querySelectorAll(".theme-btn").forEach((btn) => {
  btn.addEventListener("click", () => applyTheme(btn.dataset.theme));
});
applyTheme(localStorage.getItem("forest_theme") || "forest");

/* ---------------- Tab 切换 ---------------- */
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    const target = tab.dataset.tab;
    $("#login-form").classList.toggle("active", target === "login");
    $("#register-form").classList.toggle("active", target === "register");
  });
});

/* ---------------- 实时表单校验 ---------------- */
function setMsg(formId, msg, ok = false) {
  const el = $("#" + formId + "-msg");
  el.textContent = msg || "";
  el.classList.toggle("ok", !!ok);
}
function markError(input, bad) {
  input.classList.toggle("input-error", bad);
}

const loginForm = $("#login-form");
const regForm = $("#register-form");

function validateLogin() {
  const acc = loginForm.account.value.trim();
  const pwd = loginForm.password.value;
  if (!acc) return { ok: false, msg: "请先取个森林昵称～", field: "account" };
  if (pwd.length < 6) return { ok: false, msg: "密码至少 6 位哦", field: "password" };
  return { ok: true, msg: "可以进入森林啦！", field: "" };
}
function validateRegister() {
  const nick = regForm.nick.value.trim();
  const pwd = regForm.password.value;
  const confirm = regForm.confirm.value;
  if (!nick) return { ok: false, msg: "请取个森林昵称", field: "nick" };
  if (pwd.length < 6) return { ok: false, msg: "密码至少 6 位", field: "password" };
  if (pwd !== confirm) return { ok: false, msg: "两次密码不一致", field: "confirm" };
  return { ok: true, msg: "可以加入狗熊岭啦！", field: "" };
}

// 登录：实时校验
loginForm.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", () => {
    const r = validateLogin();
    markError(input, !r.ok && r.field === input.name);
    if (input.name === r.field || r.ok) setMsg("login", r.ok ? r.msg : (r.field === input.name ? r.msg : ""), r.ok);
  });
});
// 注册：实时校验
regForm.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", () => {
    const r = validateRegister();
    markError(input, !r.ok && r.field === input.name);
    if (input.name === r.field || r.ok) setMsg("register", r.ok ? r.msg : (r.field === input.name ? r.msg : ""), r.ok);
  });
});

/* ---------------- 登录 / 注册 提交 ---------------- */
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const r = validateLogin();
  if (!r.ok) {
    if (r.field) markError(loginForm[r.field], true);
    setMsg("login", r.msg);
    return;
  }
  setMsg("login", r.msg, true);
  const remember = loginForm.remember.checked;
  enterForest(loginForm.account.value.trim(), remember);
});

regForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const r = validateRegister();
  if (!r.ok) {
    if (r.field) markError(regForm[r.field], true);
    setMsg("register", r.msg);
    return;
  }
  setMsg("register", r.msg, true);
  enterForest(regForm.nick.value.trim(), true); // 注册默认记住
});

/* ---------------- 进入森林 / 记住登录态 ---------------- */
function enterForest(nick, remember) {
  try {
    sessionStorage.removeItem("forest_user");
    localStorage.removeItem("forest_user");
    if (remember) localStorage.setItem("forest_user", nick);
    else sessionStorage.setItem("forest_user", nick);
  } catch (_) {}
  showHome(nick);
}

function showHome(nick) {
  $("#auth-view").classList.add("hidden");
  $("#home-view").classList.remove("hidden");
  $("#welcome").textContent = "Hi, " + nick;

  const bears = ["熊大", "熊二", "光头强", "蹦蹦", "涂涂", "吉吉"];
  const pick = bears.includes(nick) ? nick : "小伙伴";
  const title = $("#home-title");
  if (pick === "光头强") {
    title.textContent = "光头强！今天不许砍树 🪓❌";
  } else {
    title.textContent = "欢迎来到狗熊岭，" + pick + "！";
  }
  title.style.animation = "none";
  void title.offsetWidth; // 触发重绘
  title.style.animation = "pop .5s ease";
}

/* ---------------- 退出 ---------------- */
$("#logout").addEventListener("click", () => {
  try { localStorage.removeItem("forest_user"); sessionStorage.removeItem("forest_user"); } catch (_) {}
  $("#home-view").classList.add("hidden");
  $("#auth-view").classList.remove("hidden");
});

/* ---------------- 首页趣味按钮 ---------------- */
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

/* ---------------- 启动时恢复登录态 ---------------- */
let saved = null;
try { saved = localStorage.getItem("forest_user") || sessionStorage.getItem("forest_user"); } catch (_) {}
if (saved) showHome(saved);

/* 入场弹跳动画 keyframes（注入一次） */
const style = document.createElement("style");
style.textContent = "@keyframes pop{0%{transform:scale(.6);opacity:0}60%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}";
document.head.appendChild(style);
