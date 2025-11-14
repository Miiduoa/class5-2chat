# Render 雲端部署指南

## 部署步驟

### 1. 建立新服務
- 登入 [Render](https://render.com)
- 點擊「New +」按鈕
- 選擇「Web Service」

### 2. 連接儲存庫
- 複製您的專案網址（GitHub/GitLab/Bitbucket）
- 在 Render 中選擇「Public repository」
- 貼上儲存庫網址並連接

### 3. 配置服務設定

#### 基本設定
- **Name**: chatapp（或您喜歡的名稱）
- **Region**: 選擇最接近您的地區
- **Branch**: main（或您的主要分支）
- **Root Directory**: 留空（如果專案在根目錄）

#### 構建和啟動命令
- **Build Command**: `uv sync`（或留空，Render 會自動偵測）
- **Start Command**: `uv run python ch6-3_chat_mongoDB_atlas/app.py`

#### 環境變數
1. 從本地的 `.env` 檔案複製所有環境變數
2. 在 Render 的「Environment Variables」區塊中：
   - 點擊「Add Environment Variable」
   - 貼上變數名稱和值
   - 重複此步驟直到所有變數都添加完成

#### Python 版本
- 在「Environment Variables」中添加：
  - **Key**: `PYTHON_VERSION`
  - **Value**: `3.12.6`

### 4. 選擇方案
- 選擇「Free」免費方案

### 5. 部署
- 點擊「Create Web Service」
- 等待部署完成（通常需要 5-10 分鐘）
- 部署成功後，您會看到一個 `.onrender.com` 的網址

### 6. 驗證部署
- 打開部署後的網址
- 測試聊天功能
- 即使重啟伺服器，聊天歷史紀錄都會保存在 MongoDB Atlas 中

### 7. 查看聊天記錄
1. 登入 [MongoDB Atlas](https://cloud.mongodb.com)
2. 進入您的資料庫叢集
3. 點擊「Browse Collections」
4. 選擇 `chatapp` 資料庫
5. 查看 `messages` 集合中的資料

## 注意事項

- 免費方案在 15 分鐘無活動後會進入休眠狀態
- 首次喚醒可能需要 30-60 秒
- 環境變數中的敏感資訊（如 MongoDB URI）請妥善保管
- 建議使用 `.env.example` 作為範本，不要將實際的 `.env` 檔案提交到版本控制

## 故障排除

### 部署失敗
- 檢查 Build Command 和 Start Command 是否正確
- 確認所有環境變數都已正確設置
- 查看 Render 的日誌以了解錯誤詳情

### 應用程式無法連接資料庫
- 確認 MongoDB Atlas 的 IP 白名單已包含 Render 的 IP（或設為 0.0.0.0/0）
- 檢查環境變數中的 MongoDB URI 是否正確

### Python 版本問題
- 確認 `PYTHON_VERSION` 環境變數設為 `3.12.6`
- 或使用 `runtime.txt` 檔案指定版本

