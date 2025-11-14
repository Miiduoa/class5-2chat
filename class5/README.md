# WebSocket 聊天室

這是一個使用 Flask 和 Socket.IO 建立的即時 WebSocket 聊天室應用程式。

## 功能特色

- ✅ 即時訊息傳送與接收
- ✅ 線上使用者列表
- ✅ 輸入中提示
- ✅ 美觀的現代化 UI 設計
- ✅ 響應式設計，支援手機與桌面

## 本地開發

### 前置需求

- Python 3.7 或更高版本
- pip (Python 套件管理器)

### 步驟 1: 檢查 Python 版本

在終端機中執行以下命令確認 Python 版本：

```bash
python --version
# 或
python3 --version
```

### 步驟 2: 安裝依賴套件

在專案目錄下執行：

```bash
pip install -r requirements.txt
```

如果使用 Python 3，可能需要使用：

```bash
pip3 install -r requirements.txt
```

**建議**: 使用虛擬環境（Virtual Environment）來隔離專案依賴：

```bash
# 建立虛擬環境
python -m venv venv

# 啟動虛擬環境
# macOS/Linux:
source venv/bin/activate
# Windows:
# venv\Scripts\activate

# 安裝依賴
pip install -r requirements.txt
```

### 步驟 3: 執行應用程式

在專案目錄下執行：

```bash
python app.py
```

或使用 Python 3：

```bash
python3 app.py
```

### 步驟 4: 開啟瀏覽器

當看到類似以下的訊息時，表示伺服器已啟動：

```
 * Running on http://0.0.0.0:5001
```

在瀏覽器中開啟：

```
http://localhost:5001
```

或

```
http://127.0.0.1:5001
```

**注意**: 預設端口為 5001（而非 5000），因為 macOS 的 AirPlay Receiver 功能會佔用端口 5000。如果需要使用其他端口，可以設定環境變數：

```bash
PORT=8000 python app.py
```

### 步驟 5: 測試聊天室

1. 在瀏覽器中輸入您的名稱
2. 點選「加入聊天室」
3. 可以開啟多個瀏覽器分頁或視窗來測試多人聊天功能

### 停止伺服器

在終端機中按 `Ctrl + C` 即可停止伺服器。

## 部署到 Render

### 步驟 1: 準備 GitHub 儲存庫

1. 在 GitHub 建立新的儲存庫
2. 將專案推送到 GitHub：

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <你的 GitHub 儲存庫網址>
git push -u origin main
```

### 步驟 2: 在 Render 部署

1. 前往 [Render.com](https://render.com/) 註冊或登入帳號

2. 點選「New +」→「Web Service」

3. 連接你的 GitHub 儲存庫：
   - 選擇「Public Git repository」
   - 貼上你的 GitHub 儲存庫網址
   - 點選「Connect」

4. 配置部署設定：
   - **Name**: 輸入服務名稱（例如：websocket-chat）
   - **Environment**: 選擇 `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python app.py`
   - **Plan**: 選擇 `Free`（免費方案）

5. 點選「Create Web Service」開始部署

6. 等待部署完成後，Render 會提供一個網址（例如：`https://websocket-chat.onrender.com`）

7. 點選網址即可使用你的 WebSocket 聊天室！

## 注意事項

### Render 免費方案限制

- **自動休眠**: 免費方案在 15 分鐘無活動後會自動休眠，下次訪問時需要等待約 30-60 秒重新啟動
- **資源限制**: CPU 和記憶體資源有限，適合小型專案使用

### 環境變數（可選）

如果需要設定環境變數，可以在 Render 的「Environment」頁籤中新增：

- `SECRET_KEY`: Flask 的密鑰（用於生產環境）
- `PORT`: 應用程式端口（Render 會自動設定）

## 技術棧

- **後端**: Flask, Flask-SocketIO
- **前端**: HTML5, CSS3, JavaScript
- **即時通訊**: Socket.IO
- **部署平台**: Render

## 專案結構

```
class5/
├── app.py                 # Flask 應用程式主檔案
├── requirements.txt       # Python 依賴套件
├── README.md             # 專案說明文件
├── templates/
│   └── index.html        # 前端 HTML 模板
└── static/
    ├── style.css         # 樣式表
    └── script.js         # 前端 JavaScript
```

## 授權

此專案僅供教學使用。

