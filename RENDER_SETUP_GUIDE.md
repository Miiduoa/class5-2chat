# Render 部署詳細步驟指南

## 📍 Start Command 設定位置

在 Render 建立 Web Service 時，Start Command 的設定位置如下：

### 方法一：在建立服務時設定

1. **建立新服務**
   - 登入 Render 後，點擊右上角的「New +」按鈕
   - 選擇「Web Service」

2. **連接儲存庫**
   - 貼上您的 GitHub 儲存庫網址：`https://github.com/Miiduoa/class5-2chat.git`
   - 點擊「Connect」

3. **基本設定頁面**
   - 在「Name」欄位輸入服務名稱（例如：`chatapp`）
   - 選擇「Region」（建議選擇最接近您的地區）
   - 選擇「Branch」（通常是 `main`）

4. **找到 Start Command 設定**
   - 向下滾動頁面
   - 找到「Build & Deploy」區塊
   - 在「Build Command」下方，您會看到「Start Command」欄位
   - 如果沒有看到，點擊「Advanced」或「Show more options」展開更多選項

5. **輸入 Start Command**
   ```
   uv run python ch6-3_chat_mongoDB_atlas/app.py
   ```

### 方法二：如果找不到 Start Command 欄位

如果建立時沒有看到 Start Command 欄位，可以：

1. **先建立服務**（使用預設設定）
2. **進入服務設定頁面**
   - 點擊您剛建立的服務
   - 進入「Settings」標籤頁
3. **在 Settings 中尋找**
   - 找到「Build & Deploy」區塊
   - 點擊「Edit」或「Configure」
   - 在展開的選項中找到「Start Command」
   - 輸入：`uv run python ch6-3_chat_mongoDB_atlas/app.py`
   - 點擊「Save Changes」

### 方法三：使用 render.yaml（自動配置）

如果您已經有 `render.yaml` 檔案（已包含在專案中），Render 會自動讀取配置：

1. 建立服務時，Render 會自動偵測 `render.yaml`
2. Start Command 會自動從 `render.yaml` 中讀取
3. 您可能不需要手動輸入

## 🔍 詳細步驟截圖說明

### 步驟 1：建立服務
```
Render Dashboard
  └─> 點擊 "New +" (右上角)
      └─> 選擇 "Web Service"
```

### 步驟 2：連接儲存庫
```
Connect Repository 頁面
  ├─> Repository URL: https://github.com/Miiduoa/class5-2chat.git
  ├─> 選擇 "Public repository"
  └─> 點擊 "Connect"
```

### 步驟 3：配置服務
```
Configure Service 頁面
  ├─> Name: chatapp
  ├─> Region: 選擇地區
  ├─> Branch: main
  │
  ├─> Build & Deploy 區塊
  │   ├─> Build Command: (可留空或填 uv sync)
  │   ├─> Start Command: ← 在這裡輸入！
  │   │   └─> uv run python ch6-3_chat_mongoDB_atlas/app.py
  │   │
  │   └─> 如果沒看到，點擊 "Advanced" 或 "Show more options"
  │
  ├─> Environment Variables 區塊
  │   └─> 點擊 "Add Environment Variable"
  │
  └─> Plan: 選擇 "Free"
```

### 步驟 4：環境變數設定
```
Environment Variables
  ├─> 點擊 "Add Environment Variable"
  │   ├─> Key: PYTHON_VERSION
  │   └─> Value: 3.12.6
  │
  └─> 繼續添加其他變數（從 .env 複製）
```

## 🎯 快速檢查清單

- [ ] 已連接 GitHub 儲存庫
- [ ] 在「Build & Deploy」區塊找到「Start Command」
- [ ] 已輸入：`uv run python ch6-3_chat_mongoDB_atlas/app.py`
- [ ] 已添加 `PYTHON_VERSION=3.12.6` 環境變數
- [ ] 已從 `.env` 複製所有其他環境變數
- [ ] 已選擇「Free」方案
- [ ] 已點擊「Create Web Service」

## ❓ 常見問題

### Q: 找不到 Start Command 欄位？
**A:** 
1. 確認您選擇的是「Web Service」而不是「Static Site」
2. 向下滾動頁面，查看是否有「Advanced」或「Show more options」按鈕
3. 如果使用 `render.yaml`，Start Command 會自動從檔案中讀取

### Q: Start Command 欄位是灰色的無法編輯？
**A:** 
- 這可能是因為 Render 自動偵測到了 `render.yaml`
- 檢查您的 `render.yaml` 檔案中的 `startCommand` 設定是否正確
- 或者刪除 `render.yaml` 後手動設定

### Q: 建立服務後如何修改 Start Command？
**A:**
1. 進入服務頁面
2. 點擊「Settings」標籤
3. 找到「Build & Deploy」區塊
4. 點擊「Edit」或「Configure」
5. 修改「Start Command」
6. 點擊「Save Changes」

## 📝 注意事項

- Start Command 必須指向實際存在的檔案路徑
- 確保 `ch6-3_chat_mongoDB_atlas/app.py` 檔案存在於儲存庫中
- 如果路徑不同，請相應調整 Start Command

