const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

// 빌드 디렉토리 생성
const buildDir = path.join(__dirname, "dist");
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// EJS 템플릿 파일 읽기
const templatePath = path.join(__dirname, "views", "index.ejs");
const template = fs.readFileSync(templatePath, "utf8");

// EJS를 HTML로 렌더링
const html = ejs.render(template, {
  // 필요한 데이터가 있다면 여기에 추가
});

// GitHub Pages용 상대 경로로 수정
const modifiedHtml = html
  .replace(/\/node_modules\//g, './node_modules/')
  .replace(/href="\/node_modules\//g, 'href="./node_modules/')
  .replace(/src="\/node_modules\//g, 'src="./node_modules/');

// HTML 파일로 저장
const outputPath = path.join(buildDir, "index.html");
fs.writeFileSync(outputPath, modifiedHtml);

// node_modules 복사 (frappe-gantt 라이브러리용)
const nodeModulesSrc = path.join(__dirname, "node_modules");
const nodeModulesDest = path.join(buildDir, "node_modules");

if (fs.existsSync(nodeModulesSrc)) {
  // node_modules 디렉토리 복사
  copyDir(nodeModulesSrc, nodeModulesDest);
}

console.log("빌드 완료: dist/index.html");

// 디렉토리 복사 함수
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
