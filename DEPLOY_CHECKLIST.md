# Render 部署檢查清單

## ✅ 部署前準備

- [ ] 確保專案已推送到公開的 Git 儲存庫（GitHub/GitLab/Bitbucket）
- [ ] 確認 `ch6-3_chat_mongoDB_atlas/app.py` 檔案存在
- [ ] 準備好 `.env` 檔案中的環境變數

## 📋 Render 部署步驟

### 步驟 1: 建立新服務
- [ ] 登入 [Render](https://render.com)
- [ ] 點擊「New +」→ 選擇「Web Service」

### 步驟 2: 連接儲存庫
- [ ] 複製專案網址
- [ ] 選擇「Public repository」
- [ ] 貼上儲存庫網址並連接

### 步驟 3: 配置服務
- [ ] **Start Command**: `uv run python ch6-3_chat_mongoDB_atlas/app.py`
- [ ] 選擇「Free」免費方案

### 步驟 4: 設置環境變數
- [ ] 從 `.env` 檔案複製所有變數
- [ ] 在「Environment Variables」中逐一添加：
  - 點擊「Add Environment Variable」
  - 貼上變數名稱和值
  - 點擊「Add」

### 步驟 5: 指定 Python 版本
- [ ] 在「Environment Variables」中添加：
  - **Key**: `PYTHON_VERSION`
  - **Value**: `3.12.6`

### 步驟 6: 部署
- [ ] 點擊「Create Web Service」
- [ ] 等待部署完成（約 5-10 分鐘）
- [ ] 記錄部署後的網址（`.onrender.com`）

### 步驟 7: 驗證
- [ ] 打開部署後的網址
- [ ] 測試聊天功能
- [ ] 確認聊天記錄會保存

### 步驟 8: 查看資料庫記錄
- [ ] 登入 [MongoDB Atlas](https://cloud.mongodb.com)
- [ ] 點擊「Browse Collections」
- [ ] 選擇 `chatapp` → `messages`
- [ ] 確認可以看到聊天記錄

## 🔍 重要提醒

- 免費方案會在 15 分鐘無活動後休眠
- 首次喚醒需要 30-60 秒
- 確保 MongoDB Atlas 的 IP 白名單允許 Render 的 IP 訪問

