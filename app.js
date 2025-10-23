const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// EJS 템플릿 엔진 설정
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 정적 파일 서빙 (CSS, JS 등)
app.use(express.static(path.join(__dirname, "public")));
// node_modules 디렉토리를 정적 파일로 서빙 (frappe-gantt 사용을 위해)
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

// 메인 라우트
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
